import React, { useState, useEffect, useRef } from 'react';
import {
	Container,
	Navbar,
	Nav,
	NavDropdown,
	FormControl,
	Form,
	Button
} from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navigation.css'


function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state?.session?.user);

	const history = useHistory();

	const [search, setSearch] = useState("");

	const handleSearch = (e) => {
		e.preventDefault();
		history.push(`/search/${search}`);
	};

	function handleMenuItemClick(category) {
		if (category === 'All') {
			history.push('/products')
		}
		if (category === 'Breads') {
			history.push('/products/breads')

		}
		if (category === 'Cookies') {
			history.push('/products/cookies')

		}
		if (category === 'Cakes') {
			history.push('/products/cakes')

		}
		if (category === 'Etc') {
			history.push('/products/sweets')

		}
	}

	const navLinkStyles = {
		textDecoration: 'none',
		color: 'inherit',
	};



	return (

		<Navbar bg="dark" variant="dark">
			<Container>

				<Navbar.Toggle aria-controls="navbar-nav" />
				<Navbar.Collapse id="navbar-nav">
					<Nav className="mr-auto nav-links">
						<Nav.Link as={NavLink} exact to="/" className="home-link">
							Home
						</Nav.Link>
						<NavDropdown
							title="Products"
							id="basic-nav-dropdown"
						>
							<NavDropdown.Item onClick={() => handleMenuItemClick('All')} className="product-link">
								All Products
							</NavDropdown.Item>
							<NavDropdown.Item onClick={() => handleMenuItemClick('Breads')} className="product-link">
								Breads
							</NavDropdown.Item>
							<NavDropdown.Item onClick={() => handleMenuItemClick('Cookies')} className="product-link">
								Cookies
							</NavDropdown.Item>
							<NavDropdown.Item onClick={() => handleMenuItemClick('Cakes')} className="product-link">
								Cakes & Pies
							</NavDropdown.Item>
							<NavDropdown.Item onClick={() => handleMenuItemClick('Etc')} className="product-link">
								Assorted Sweets
							</NavDropdown.Item>
						</NavDropdown>
						<Nav.Link as={NavLink} exact to="/faqs" className="faq-link">
							FAQs
						</Nav.Link>
						<Nav.Link as={NavLink} to={`/users/profile/${sessionUser?.id}`} className="profile-link">
							Profile
						</Nav.Link>
					</Nav>
					<img src="https://i.imgur.com/YCUcE1L.png" alt="logo" />
					<Navbar.Brand className="mx-auto logo">
						<NavLink exact to="/" className="logo-text-one" style={navLinkStyles}>
							Gracefully
						</NavLink>
						<NavLink exact to="/" className="logo-text-two" style={navLinkStyles}>
							Baked
						</NavLink>
					</Navbar.Brand>
					{isLoaded && (
						<Nav className="ml-auto nav-actions">
							<div className="search-container">
								<div className="search-form">
									<Form
										className="search-form"
										onSubmit={handleSearch}
									>
										<FormControl
											type="text"
											placeholder="Search for something"
											className="search-form-input"
											value={search}
											onChange={(e) => setSearch(e.target.value)}
										/>
									</Form>
								</div>
								<Button type="submit" variant="primary">Search</Button>
							</div>
							<div className="user-menu-button">
								<ProfileButton user={sessionUser} />
							</div>
							<div className="cart-box">
								<Nav.Link as={NavLink} exact to="/shopping-cart" className="cart-icon">
									<FaShoppingCart size={20} color="#e8dfd8" />
								</Nav.Link>
							</div>
						</Nav>
					)}
				</Navbar.Collapse>
			</Container>
		</Navbar>

	);
}

// <>
// 	<div className="nav-bar">
// 		<div className="nav-links">
// 			<div className="home">
// 				<NavLink exact to="/" className="home-link">Home</NavLink>
// 			</div>
// 			<div className="menu">
// 				{/* <NavLink exact to="/products" className="menu-link">Products</NavLink> */}
// 				<p
// 					className="menu-link"
// 					onClick={handleMenuToggle}
// 				>
// 					Products
// 				</p>
// 				{isOpen && (
// 					<ul className={ulClassName} ref={ulRef}>
// 						<li className="product-link" onClick={() => handleMenuItemClick('All')}>All Products</li>
// 						<li className="product-link" onClick={() => handleMenuItemClick('Breads')}>Breads</li>
// 						<li className="product-link" onClick={() => handleMenuItemClick('Cookies')}>Cookies</li>
// 						<li className="product-link" onClick={() => handleMenuItemClick('Cakes')}>Cakes & Pies</li>
// 						<li className="product-link" onClick={() => handleMenuItemClick('Etc')}>Assorted Sweets</li>
// 					</ul>
// 				)}
// 			</div>
// 			<div className="FAQ">
// 				<NavLink exact to="/faqs" className="faq-link">FAQs</NavLink>
// 			</div>
// 			<div className="profile">
// 				<NavLink to={`/users/profile/${sessionUser?.id}`} className="profile-link">Profile</NavLink>
// 			</div>
// 		</div>
// 		<img src="https://i.imgur.com/YCUcE1L.png" alt="Logo" />
// 		<div className="header">
// 			<NavLink exact to="/" className="logo-text-one">Gracefully</NavLink>
// 			<NavLink exact to="/" className="logo-text-two">Baked</NavLink>
// 		</div>

// 		{isLoaded && (
// 			<div className="nav-bar-buttons">

// 				<div className="search-container">
// 					<div className="search-form">
// 						<form
// 							className="search-form"
// 							onSubmit={() => history.push(`/search/${search}`)}
// 						>
// 							<input
// 								placeholder="Search for something"
// 								className="search-form-input"
// 								onChange={(e) => setSearch(e.target.value)}
// 							/>
// 						</form>
// 					</div>
// 				</div>
// 				<div className="user-menu-button">
// 					<ProfileButton user={sessionUser} />
// 				</div>
// 				<div className="cart-box">
// 					<NavLink exact to="/shopping-cart" className="cart-icon">
// 						<i className="fas fa-shopping-cart fa-lg" style={{ color: "#e8dfd8" }}></i>
// 					</NavLink>
// 				</div>

// 			</div>
// 		)}
// 	</div>
// </>


export default Navigation;
