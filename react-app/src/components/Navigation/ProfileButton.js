import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const history = useHistory()

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    history.push("/")
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "open" : "");
  const closeMenu = () => setShowMenu(false);

  return (
    <>
      <button className='profile-button' onClick={openMenu}>
        <i className="fas fa-solid fa-users fa-xl" />
      </button>

      <ul className={ulClassName} ref={ulRef}>
      <div id='dropdown-container'>
        {user ? (
          <>
            <div id='dropdown-buttons'>
              <div id='user-profile-container'>
                <NavLink exact to='/users/profile'>User Profile</NavLink>
              </div>
              <div id='signout-button-container'>
                <button onClick={handleLogout}>
                <i class="fa fa-power-off signout-icon"></i><span id='signout-text'>Sign out</span>
                </button>
              </div>
            </div>
          </>
        ) : (
            <>
              <OpenModalButton
                buttonText="Log In"
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
              <OpenModalButton
                buttonText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
            </>
        )}
      </div>
      </ul>
    </>
  );
}

export default ProfileButton;
