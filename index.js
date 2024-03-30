const { createStore, applyMiddleware } = require("redux");
const { delayActionMiddleware, fetchTodosMiddlewares } = require("./middlewares");

// initial state
const initialState = {
  todos: []
}

// reducer
const todoReducer = ( state = initialState, action ) => {
  switch (action.type) {
    case "todos/todoAdded":
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            title: action.payload,
          }
        ]
      }
    case "todos/todoLoaded":
      return {
        ...state,
        todos: [ ...state.todos, ...action.payload]
      }
  
    default:
      break;
  }
};

// store
const store = createStore(todoReducer, applyMiddleware(delayActionMiddleware, fetchTodosMiddlewares));

// subscribe to state change
store.subscribe(() => {
  console.log(store.getState());
})

// dispatch actions 
// store.dispatch({
//   type: "todos/todoAdded",
//   payload: "Learn Redux From Rakibul"
// })

store.dispatch({
  type: "todos/fetchTodos",
})