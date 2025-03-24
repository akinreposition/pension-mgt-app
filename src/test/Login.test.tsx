import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import authReducer from '../redux/authSlice'; // Adjust the path as needed
import Login from '../components/Authentication/Login';
import thunk from 'redux-thunk';

interface State {} // Define your state interface as needed

// Cast thunk to any to bypass the type mismatch:
const middlewares = (getDefaultMiddleware: any) => getDefaultMiddleware().concat(thunk);
const rootReducer = combineReducers({
    auth: authReducer,
});

const mockStore = (initialState: State) => configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => middlewares(getDefaultMiddleware),
    preloadedState: initialState,
});

jest.mock('../components/authentication/Login', () => () => <div>Login</div>);
describe('Login Component', () => {
    let store: ReturnType<typeof mockStore>;

    beforeEach(() => {
        store = mockStore({
            auth: { isAuthenticated: false },
        });
    });

    test('renders login form', () => {
        render(
            <Provider store={store}>
                <Router>
                    <Login />
                </Router>
            </Provider>
        );

        expect(screen.getByText(/Login/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
        expect(screen.getByText(/Forgot Password?/i)).toBeInTheDocument();
    });

    test('allows user to input email and password', () => {
        render(
            <Provider store={store}>
                <Router>
                    <Login />
                </Router>
            </Provider>
        );

        const emailInput = screen.getByLabelText(/Email/i) as HTMLInputElement;
        const passwordInput = screen.getByLabelText(/Password/i) as HTMLInputElement;

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });

        expect(emailInput.value).toBe('test@example.com');
        expect(passwordInput.value).toBe('password123');
    });

    test('allows user to select role', () => {
        render(
            <Provider store={store}>
                <Router>
                    <Login />
                </Router>
            </Provider>
        );

        const adminRole = screen.getByText(/Admin/i);
        const memberRole = screen.getByText(/Member/i);

        fireEvent.click(adminRole);
        expect(adminRole).toHaveClass('text-green-500 font-semibold');
        expect(memberRole).toHaveClass('text-gray-500');

        fireEvent.click(memberRole);
        expect(memberRole).toHaveClass('text-green-500 font-semibold');
        expect(adminRole).toHaveClass('text-gray-500');
    });

    test('displays error message on failed login', async () => {
        render(
            <Provider store={store}>
                <Router>
                    <Login />
                </Router>
            </Provider>
        );

        const emailInput = screen.getByLabelText(/Email/i);
        const passwordInput = screen.getByLabelText(/Password/i);
        const submitButton = screen.getByText(/Login/i);

        fireEvent.change(emailInput, { target: { value: 'wrong@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
        fireEvent.click(submitButton);

        expect(await screen.findByText(/Invalid email or password./i)).toBeInTheDocument();
    });
});