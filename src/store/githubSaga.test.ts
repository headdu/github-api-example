import { put, SimpleEffect } from "redux-saga/effects";
import {
  GET_USER_INFO_INIT,
  handleGetUserInfoSuccess,
  handleGetUserInfoError
} from "./githubActions";
import { fetchUserInfo } from "./githubSaga";
import { GithubUser } from "./githubApi";

const mockUser: GithubUser = {
  login: "alixeb",
  id: 382022,
  node_id: "MDQ6VXNlcjM4MjAyMg==",
  avatar_url: "https://avatars2.githubusercontent.com/u/382022?v=4",
  gravatar_id: "",
  url: "https://api.github.com/users/alixeb",
  html_url: "https://github.com/alixeb",
  followers_url: "https://api.github.com/users/alixeb/followers",
  following_url: "https://api.github.com/users/alixeb/following{/other_user}",
  gists_url: "https://api.github.com/users/alixeb/gists{/gist_id}",
  starred_url: "https://api.github.com/users/alixeb/starred{/owner}{/repo}",
  subscriptions_url: "https://api.github.com/users/alixeb/subscriptions",
  organizations_url: "https://api.github.com/users/alixeb/orgs",
  repos_url: "https://api.github.com/users/alixeb/repos",
  events_url: "https://api.github.com/users/alixeb/events{/privacy}",
  received_events_url: "https://api.github.com/users/alixeb/received_events",
  type: "User",
  site_admin: false,
  name: "Alixe Bhagooa",
  company: null,
  blog: "http://webgear.pro",
  location: "London",
  email: null,
  hireable: null,
  bio: null,
  public_repos: 4,
  public_gists: 1,
  followers: 5,
  following: 4,
  created_at: "2010-08-31T13:34:57Z",
  updated_at: "2019-04-02T13:15:19Z"
};

test("Tries getting the user info for the correct user name", () => {
  const asyncMock = jest.fn().mockImplementation(() =>
    Promise.resolve({
      ok: false,
      json: () => mockUser
    })
  );
  const userName = "testUser";
  window.fetch = asyncMock;
  const saga = fetchUserInfo({ type: GET_USER_INFO_INIT, payload: userName });

  saga.next(); // delay call
  saga.next(); // api call

  expect(asyncMock).toHaveBeenCalledWith(
    `https://api.github.com/users/${userName}`
  );
});

test("Handles success case correctly", () => {
  const userName = "test";
  const asyncMock = jest.fn().mockImplementation(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockUser)
    })
  );

  window.fetch = asyncMock;

  const saga = fetchUserInfo({
    type: GET_USER_INFO_INIT,
    payload: userName
  });

  saga.next(); // delay call
  saga.next().value; // api call

  expect(saga.next(mockUser).value).toStrictEqual(
    put(handleGetUserInfoSuccess(mockUser))
  );
  expect(saga.next().done).toBe(true);
});

test("Handles error case correctly", () => {
  const userName = "test";
  const asyncMock = jest.fn().mockImplementation(() =>
    Promise.reject({
      ok: false
    })
  );

  window.fetch = asyncMock;

  const saga = fetchUserInfo({
    type: GET_USER_INFO_INIT,
    payload: userName
  });

  saga.next(); // delay call
  const result = saga.next(); // api call
  expect((saga as any).throw(new Error('')).value).toStrictEqual(put(handleGetUserInfoError()));
  expect(saga.next().done).toBe(true);

});
