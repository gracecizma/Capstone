// constants
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";
const SET_ALL_USERS = "session/SET_ALL_USERS"

const setUser = (user) => ({
	type: SET_USER,
	payload: user,
});

const setAllUsers = (users) => ({
	type: SET_ALL_USERS,
	payload: users
})

const removeUser = () => ({
	type: REMOVE_USER,
});

const initialState = { user: null };

export const loadUsers = () => async (dispatch) => {
	const res = await fetch(`/api/users/`)

	if (res.ok) {
		const users = await res.json()
		console.log("all users fetch", users)
		let usersObj = {}
		users.users.forEach((user) => {
			usersObj[user.id] = user
		})
		dispatch(setAllUsers(usersObj))
		return users
	}
}

export const authenticate = () => async (dispatch) => {
	const response = await fetch("/api/auth/", {
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}

		dispatch(setUser(data));
	}
};

export const login = (email, password) => async (dispatch) => {
	const response = await fetch("/api/auth/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email,
			password,
		}),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

export const logout = () => async (dispatch) => {
	const response = await fetch("/api/auth/logout", {
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (response.ok) {
		dispatch(removeUser());
	}
};

export const signUp = (username, email, password) => async (dispatch) => {
	const response = await fetch("/api/auth/signup", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			username,
			email,
			password,
		}),
	});

	if (response.ok) {
		const data = await response.json();
		console.log("signup data", data)
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		console.log("signup data", data)
		if (data.errors) {
			console.log("signup errors", data.errors)
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case SET_USER:
			return { user: action.payload };
		case REMOVE_USER:
			return { user: null };
		case SET_ALL_USERS:
			return { ...state, users: action.payload };
		default:
			return state;
	}
}
