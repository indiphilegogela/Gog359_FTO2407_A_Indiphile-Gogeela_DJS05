// store.js

// Reducer function
function reducer(state, action) {
  switch (action.type) {
    case "ADD":
      return { count: state.count + 1 };
    case "SUBTRACT":
      return { count: state.count - 1 };
    case "RESET":
      return { count: 0 };
    default:
      return state;
  }
}

// Redux-inspired store factory
function createStore(reducer, initialState) {
  let state = initialState;
  const listeners = [];

  return {
    getState: () => state,
    dispatch: (action) => {
      state = reducer(state, action);
      listeners.forEach((listener) => listener());
    },
    subscribe: (listener) => {
      listeners.push(listener);
    }
  };
}

// Initialize store
const store = createStore(reducer, { count: 0 });

// Subscribe to changes
store.subscribe(() => {
  console.log("State changed:", store.getState());
});

// Test Scenarios
console.log("Initial State:", store.getState()); // Should log { count: 0 }

store.dispatch({ type: "ADD" });      // { count: 1 }
store.dispatch({ type: "ADD" });      // { count: 2 }
store.dispatch({ type: "SUBTRACT" }); // { count: 1 }
store.dispatch({ type: "RESET" });    // { count: 0 }
