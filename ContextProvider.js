// https://codesandbox.io/s/ynn88nx9x?from-embed=&file=/src/count-context.js

const CountStateContext = React.createContext()
CountStateContext.displayName = 'CountStateContext'
const CountUpdaterContext = React.createContext()
CountUpdaterContext.displayName = 'CountUpdaterContext'

function CountProvider(props) {
  const [count, setCount] = React.useState(0)
  return (
    <CountStateContext.Provider value={count}>
      <CountUpdaterContext.Provider value={setCount}>
        {props.children}
      </CountUpdaterContext.Provider>
    </CountStateContext.Provider>
  )
}

function useCountState() {
  const countState = React.useContext(CountStateContext)
  if (typeof countState === 'undefined') {
    throw new Error('useCountState must be used within a CountProvider')
  }
  return countState
}

function useCountUpdater() {
  const setCount = React.useContext(CountUpdaterContext)
  if (typeof setCount === 'undefined') {
    throw new Error('useCountUpdater must be used within a CountProvider')
  }
  // return setCount // user has to call setCount((c) => c + 1) instead of just increment() 
  const increment = React.useCallback(() => setCount((c) => c + 1), [setCount])
  return increment
}

export {CountProvider, useCountState, useCountUpdater}

// check "Context Module Functions"
// Passing down dispatch 
// - users have to create setter functions and should have knowledge of action types

// Provider
// return <CounterContext.Provider value={{state, dispatch} {...props} />
// Consumer
// const increment = () => dispatch({type: 'increment'})


// passing down setter functions
// - have to wrap helper functions in React.useCallback
// - Helper methods are object junk that we need to recreate and compare for no purpose other than superficially nicer looking syntax.

// Provider
// const increment = React.useCallback(() => dispatch({type: 'increment'}), [
//   dispatch,
// ])
// return <CounterContext.Provider value={state, increment, decrement} {...props} />
// Consumer

// passing down dispatch and importable helpers/setter functions that accepts "dispatch"

// Provider
// return <CounterContext.Provider value={{state, dispatch} {...props} />
// const increment = dispatch => dispatch({type: 'increment'})

// export {CounterProvider, useCounter, increment, decrement}

// Consumer 
// <button onClick={() => decrement(dispatch)}>-</button>
