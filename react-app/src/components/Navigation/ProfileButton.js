import React, { useState, useEffect, useRef } from "react";
import { DropdownButton, Dropdown, Button } from 'react-bootstrap';
import { BsList } from 'react-icons/bs';
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

function ProfileButton({ user }) {
  const dispatch = useDispatch();

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prevMenuOpen) => !prevMenuOpen);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };


  return (
    <DropdownButton
      id="user-menu"
      title={<BsList size={20} />}
      show={menuOpen}
      onToggle={toggleMenu}
      align="end"
    >
      {user ? (
        <>
          <Dropdown.Item>Hello, {user.username}</Dropdown.Item>
          <Dropdown.Item>{user.email}</Dropdown.Item>
          <Dropdown.Item className="logout-button-item">
            <Button onClick={handleLogout} className="logout-button">
              Log Out
            </Button>
          </Dropdown.Item>
        </>
      ) : (
        <>
          <div className="login-signup-container">
            <OpenModalButton
              className="login-signup"
              buttonText="Log In"
              onItemClick={toggleMenu}
              modalComponent={<LoginFormModal />}
            />

            <OpenModalButton
              className="login-signup"
              buttonText="Sign Up"
              onItemClick={toggleMenu}
              modalComponent={<SignupFormModal />}
            />
          </div>
        </>
      )}
    </DropdownButton>


    // <>
    //   <button
    //     onClick={openMenu}
    //     className="user-menu-container">
    //     <i className="fas fa-user-circle" />
    //   </button>
    //   <ul className={ulClassName} ref={ulRef}>
    //     {user ? (
    //       <>
    //         <li>Hello, {user.username}</li>
    //         <li>{user.email}</li>
    //         <li className="logout-button-item">
    //           <button
    //             onClick={handleLogout}
    //             className="logout-button"
    //           >
    //             Log Out</button>
    //         </li>
    //       </>
    //     ) : (
    //       <>
    //         <div className="login-signup-container">
    //           <OpenModalButton
    //             className="login-signup"
    //             buttonText="Log In"
    //             onItemClick={closeMenu}
    //             modalComponent={<LoginFormModal />}
    //           />

    //           <OpenModalButton
    //             className="login-signup"
    //             buttonText="Sign Up"
    //             onItemClick={closeMenu}
    //             modalComponent={<SignupFormModal />}
    //           />
    //         </div>
    //       </>
    //     )}
    //   </ul>
    // </>
  );
}

export default ProfileButton;
