import axios from 'axios';
import { setAlert } from './alert';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_PROFILE
} from './types';

// Helper function to set a axios gloabal header that is used on every request
import setAuthToken from '../utils/setAuthToken';

// Load User
export const loadUser = () => async (dispatch) => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }

    try {
        const res = await axios.get('/api/auth');

        dispatch({ type: USER_LOADED, payload: res.data });
    } catch (error) {
        dispatch({
            type: AUTH_ERROR
        });
    }
};
// Register User
export const register = ({ name, email, password }) => async (dispatch) => {
    try {
        const newUser = {
            name,
            email,
            password
        };

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const body = JSON.stringify(newUser);

        // api/users is because of the proxy in the package.jsom
        const res = await axios.post('/api/users', body, config);
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });

        dispatch(loadUser());
    } catch (error) {
        const errors = error.response.data.errors;

        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));

        dispatch({
            type: REGISTER_FAIL
        });
    }
};

// Login User
export const login = (email, password) => async (dispatch) => {
    try {
        const user = {
            email,
            password
        };

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const body = JSON.stringify(user);

        // api/users is because of the proxy in the package.jsom
        const res = await axios.post('/api/auth', body, config);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });

        dispatch(loadUser());
    } catch (error) {
        const errors = error.response.data.errors;

        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));

        dispatch({
            type: LOGIN_FAIL
        });
    }
};

// Log out
export const logout = () => (dispatch) => {
    dispatch({ type: CLEAR_PROFILE });
    dispatch({ type: LOGOUT });
};
