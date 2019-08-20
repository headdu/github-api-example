import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { initGetUserInfo } from "./store/githubActions";

interface HeaderProps {
  initUserSearch: (userName: string) => void;
}

const Header = ({ initUserSearch }: HeaderProps) => {
  return (
    <header className="header__container">
      <h1 className="header__title">Hello World</h1>
      <div className="header__search-container">
        <div className="header__search-icon" />
        <input
          placeholder="Search User"
          onChange={e => initUserSearch(e.target.value)}
        />
      </div>
    </header>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  initUserSearch: (userName: string) => dispatch(initGetUserInfo(userName))
});

export default connect(
  null,
  mapDispatchToProps
)(Header);
