import githubReducer from "./githubReducer";
import {
  GET_USER_INFO_INIT,
  GET_USER_INFO_ERROR,
  GET_USER_INFO_SUCCESS,
  initGetUserInfo,
  handleGetUserInfoSuccess,
  handleGetUserInfoError
} from "./githubActions";
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

it("Should have the correct initial state", () => {
  const initialState = githubReducer(undefined, { type: "NONE" });

  expect(initialState.loading).toBe(false);
  expect(initialState.hasError).toBe(false);
  expect(initialState.searchResults).toBe(null);
});

it("Should begin searching correctly", () => {
  const stateAfterBeginSearch = githubReducer(
    undefined,
    initGetUserInfo("alexib")
  );

  expect(stateAfterBeginSearch.loading).toBe(true);
  expect(stateAfterBeginSearch.hasError).toBe(false);
  expect(stateAfterBeginSearch.searchResults).toBe(null);
});

it("Should complete successful search correctly", () => {
  const stateAfterBeginSearch = githubReducer(
    undefined,
    initGetUserInfo("alexib")
  );

  const stateAfterSuccessfulSearch = githubReducer(
    stateAfterBeginSearch,
    handleGetUserInfoSuccess(mockUser)
  );

  expect(stateAfterSuccessfulSearch.loading).toBe(false);
  expect(stateAfterSuccessfulSearch.hasError).toBe(false);
  expect(stateAfterSuccessfulSearch.searchResults).toBe(mockUser);
});

it("Should complete unsuccessful search correctly", () => {
  const stateAfterBeginSearch = githubReducer(
    undefined,
    initGetUserInfo("alexib")
  );

  const stateAfterSuccessfulSearch = githubReducer(
    stateAfterBeginSearch,
    handleGetUserInfoError()
  );

  expect(stateAfterSuccessfulSearch.loading).toBe(false);
  expect(stateAfterSuccessfulSearch.hasError).toBe(true);
  expect(stateAfterSuccessfulSearch.searchResults).toBe(null);
});
