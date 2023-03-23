import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);

	const history = useHistory();

	const [search, setSearch] = useState("");

	return (
		<>
			<div className="nav-bar">
				<div className="nav-links">
					<div className="menu">
						<NavLink exact to="/products" className="menu-link">Menu</NavLink>
					</div>
				</div>
				<div className="header">
					<NavLink exact to="/" className="logo-text">Gracefully Baked</NavLink>
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

					</div>
				)}
			</div>
		</>
	);
}

export default Navigation;
