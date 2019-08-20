import { createStore, applyMiddleware } from "redux";
import githubReducer from "./githubReducer";
import createSagaMiddleware from "redux-saga";
import githubSaga from "./githubSaga";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(githubReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(githubSaga);

export default store;
