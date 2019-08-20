import { Action, AnyAction } from "redux";
import { GithubUser } from "./githubApi";

export const GET_USER_INFO_INIT = "GET_USER_INFO_INIT";
export const GET_USER_INFO_SUCCESS = "GET_USER_INFO_SUCCESS";
export const GET_USER_INFO_ERROR = "GET_USER_INFO_ERROR";

/**
 * Action to begin getting the user info
 */
export const initGetUserInfo = (userName: string): AnyAction => ({ type: GET_USER_INFO_INIT, payload: userName });

/**
 * Action to handle success getting the user info
 * 
 * @param user 
 */
export const handleGetUserInfoSuccess = (user: GithubUser): AnyAction => ({
  type: GET_USER_INFO_SUCCESS,
  payload: user
});

/**
 * Action to handle errors getting the user info
 * 
 */
export const handleGetUserInfoError = (): Action => ({
  type: GET_USER_INFO_ERROR
});
