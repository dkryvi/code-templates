import React from 'react'
import type {Dispatch} from 'react'

enum STATUSES {
  IDLE = 'idle',
  PENDING = 'pending',
  REJECTED = 'rejected',
  RESOLVED = 'resolved'
}
type Status = typeof STATUSES[keyof typeof STATUSES]

interface State {
  status: Status
  data: any | null
  error: Error | null
}

type Action = (data: Partial<State>) => void

interface ReturnValue {
  isIdle: boolean
  isLoading: boolean
  isError: boolean
  isSuccess: boolean
  setData: (data: any) => void
  setError: (error: Error) => void
  error: Error | null
  status: Status
  data: any | null
  run: (promise: Promise<any>) => void
  reset: () => void
}

function useSafeDispatch(dispatch: Dispatch<Action>) {
  const mounted = React.useRef(false)
  React.useEffect(() => {
    mounted.current = true
    return () => {
      mounted.current = false
    }
  }, [])
  return React.useCallback(
    (args) => {
      if (mounted.current) {
        dispatch(args)
      }
    },
    [dispatch]
  )
}

const defaultInitialState = {status: STATUSES.IDLE, data: null, error: null}

function useAsync(initialState?: State): ReturnValue {
  const initialStateRef = React.useRef<State>({
    ...defaultInitialState,
    ...initialState
  })
  const [{status, data, error}, setState] = React.useReducer(
    (state: State, action: Action) => ({...state, ...action}),
    initialStateRef.current
  )

  const safeSetState = useSafeDispatch(setState)

  const setData = React.useCallback(
    (data) => safeSetState({data, status: STATUSES.RESOLVED}),
    [safeSetState]
  )
  const setError = React.useCallback(
    (error) => safeSetState({error, status: STATUSES.REJECTED}),
    [safeSetState]
  )
  const reset = React.useCallback(
    () => safeSetState(initialStateRef.current),
    [safeSetState]
  )

  const run = React.useCallback(
    (promise) => {
      if (!promise || !promise.then) {
        throw new Error(
          `The argument passed to useAsync().run must be a promise. Maybe a function that's passed isn't returning anything?`
        )
      }
      safeSetState({status: STATUSES.PENDING})
      return promise.then(
        (data: any) => {
          setData(data)
          return data
        },
        (error: Error) => {
          setError(error)
          return Promise.reject(error)
        }
      )
    },
    [safeSetState, setData, setError]
  )

  return {
    isIdle: status === STATUSES.IDLE,
    isLoading: status === STATUSES.PENDING,
    isError: status === STATUSES.REJECTED,
    isSuccess: status === STATUSES.RESOLVED,

    setData,
    setError,
    error,
    status,
    data,
    run,
    reset
  }
}

export default useAsync
