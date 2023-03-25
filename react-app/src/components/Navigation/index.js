import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state?.session?.user);

	const history = useHistory();

	const [search, setSearch] = useState("");

	// const profileHandler = (e) => {
	// 	e.preventDefault();
	// 	history.push(`/sessionUser/${sessionUser.id}`);
	// };

	return (
		<>
			<div className="nav-bar">
				<div className="nav-links">
					<div className="home">
						<NavLink exact to="/" className="home-link">Home</NavLink>
					</div>
					<div className="menu">
						<NavLink exact to="/products" className="menu-link">Menu</NavLink>
					</div>
					<div className="about">
						<NavLink exact to="/" className="about-link">About</NavLink>
					</div>
					<div>
						<NavLink to={`/users/profile/${sessionUser?.id}`}>Profile</NavLink>
					</div>
				</div>
				<div className="header">
					<NavLink exact to="/" className="logo-text-one">Gracefully</NavLink>
					<NavLink exact to="/" className="logo-text-two">Baked</NavLink>
				</div>

				{isLoaded && (
					<div className="nav-bar-buttons">

						<div className="search-container">
							<div className="search-form">
								<form
									className="search-form"
									onSubmit={() => history.push(`/search/${search}`)}
								>
									<input
										placeholder="Search for something"
										className="search-form-input"
										onChange={(e) => setSearch(e.target.value)}
									/>
								</form>
							</div>
						</div>
						<div className="user-menu-button">
							<ProfileButton user={sessionUser} />
						</div>
						<div className="cart-box">
							<NavLink exact to="/shopping-cart">
								<i className="fas fa-shopping-cart fa-lg"></i>
							</NavLink>
						</div>

					</div>
				)}
			</div>
		</>
	);
}

export default Navigation;
