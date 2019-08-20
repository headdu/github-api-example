import React from "react";
import { connect } from "react-redux";
import { GithubReducer } from "./store/githubReducer";

const SearchResults = ({ loading, searchResults, hasError }: GithubReducer) => {
  if (loading) {
    return <div className="search-results__container">Loading</div>;
  }

  if (hasError) {
    return (
      <div className="search-results__container search-results__error">
        There was an error :(
      </div>
    );
  }

  if (searchResults) {
    return (
      <div className="search-results__container">
        <img src={searchResults.avatar_url} alt="user avatar" />
        <span>{searchResults.name}</span>
        <span>{searchResults.location}</span>
        {searchResults.email ? (
          <a href={`mailto:${searchResults.email}`}>{searchResults.email}</a>
        ) : null}
        <a href={searchResults.blog} target="_blank" rel="noopener noreferrer">
          {searchResults.blog}
        </a>
      </div>
    );
  }

  return null;
};

const mapStateToProps = (state: GithubReducer) => state;

export default connect(mapStateToProps)(SearchResults);
