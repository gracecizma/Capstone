import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state?.session?.user);

	const history = useHistory();
	const ulRef = useRef();

	const [search, setSearch] = useState("");


	const [isOpen, setIsOpen] = useState(false);

	function handleMenuToggle() {
		setIsOpen(!isOpen);
	}

	function handleMenuItemClick(category) {
		// Navigate to the selected category
		console.log(`Navigating to ${category} category`);
	}

	return (
		<>
			<div className="nav-bar">
				<div className="nav-links">
					<div className="home">
						<NavLink exact to="/" className="home-link">Home</NavLink>
					</div>
					<div className="menu">
						{/* <NavLink exact to="/products" className="menu-link">Products</NavLink> */}
						<p
							className="menu-link"
							onClick={handleMenuToggle}
						>
							Products
						</p>
						{isOpen && (
							<ul className="dropdown-menu">
								<li onClick={() => handleMenuItemClick('All')}>All Products</li>
								<li onClick={() => handleMenuItemClick('Breads')}>Breads</li>
								<li onClick={() => handleMenuItemClick('Breads')}>Cookies</li>
								<li onClick={() => handleMenuItemClick('Cakes')}>Cakes & Pies</li>
								<li onClick={() => handleMenuItemClick('Etc')}>Assorted Sweets</li>
							</ul>
						)}
					</div>
					<div className="FAQ">
						<NavLink exact to="/faqs" className="faq-link">FAQs</NavLink>
					</div>
					<div className="profile">
						<NavLink to={`/users/profile/${sessionUser?.id}`} className="profile-link">Profile</NavLink>
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
							<NavLink exact to="/shopping-cart" className="cart-icon">
								<i className="fas fa-shopping-cart fa-lg" style={{ color: "#e8dfd8" }}></i>
							</NavLink>
						</div>

					</div>
				)}
			</div>
		</>
	);
}

export default Navigation;
