import { AnyAction } from "redux";
import { GithubUser } from "./githubApi";
import {
  GET_USER_INFO_INIT,
  GET_USER_INFO_SUCCESS,
  GET_USER_INFO_ERROR
} from "./githubActions";

export interface GithubReducer {
  loading: boolean;
  searchResults: GithubUser | null;
  hasError: boolean;
}

const initialState: GithubReducer = {
  loading: false,
  searchResults: null,
  hasError: false
};

const githubReducer = (
  state: GithubReducer = initialState,
  action: AnyAction
): GithubReducer => {
  switch (action.type) {
    case GET_USER_INFO_INIT:
      return {
        ...state,
        loading: true,
        searchResults: null
      };
    case GET_USER_INFO_SUCCESS:
      return {
        ...state,
        loading: false,
        searchResults: action.payload,
        hasError: false
      };
    case GET_USER_INFO_ERROR:
      return {
        ...state,
        loading: false,
        hasError: true
      };
    default:
      return state;
  }
};

export default githubReducer;
