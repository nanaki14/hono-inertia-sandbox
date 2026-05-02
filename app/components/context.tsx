import { useRef, useSyncExternalStore, createContext, useContext } from 'react'
import type { ReactNode } from 'react'

export type ContextType<T> = {
  state: T
  storeChanges: Set<() => void>
  dispatch: (callback: (state: T) => T) => void
  subscribe: (onStoreChange: () => void) => () => void
}

const createStoreContext = <T,>(s: T): ContextType<T> => {
  const context = useRef<ContextType<T>>({
    state: s,
    storeChanges: new Set(),
    dispatch(callback) {
      context.state = callback(context.state)
      context.storeChanges.forEach((fn) => fn())
      globalState = context.state as never
    },
    subscribe(onStoreChange) {
      context.storeChanges.add(onStoreChange)
      return () => { context.storeChanges.delete(onStoreChange) }
    },
  }).current
  return context
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const StoreContext = createContext<ContextType<any>>(undefined as never)

// Module-level variable persists across Inertia page navigations
// (Layout re-mounts but this variable is not reset)
let globalState: Record<string, unknown> | undefined

export type AppState = { count: number }

export const StoreProvider = ({
  children,
  initState,
}: {
  children: ReactNode
  initState: () => AppState
}) => {
  if (!globalState) {
    globalState = { ...initState() }
  }
  const context = createStoreContext(globalState as AppState)
  return <StoreContext.Provider value={context}>{children}</StoreContext.Provider>
}

export const useSelector = <T, R>(getSnapshot: (state: T) => R): R => {
  const context = useContext<ContextType<T>>(StoreContext)
  return useSyncExternalStore(
    context.subscribe,
    () => getSnapshot(context.state),
    () => getSnapshot(context.state),
  )
}

export const useDispatch = <T,>(): ContextType<T>['dispatch'] => {
  const context = useContext<ContextType<T>>(StoreContext)
  return context.dispatch
}
