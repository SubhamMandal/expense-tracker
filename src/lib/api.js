import { BASE_URL } from "../static/constants";

export async function signUpUser(userData) {
    let response;
    try {
        response = await fetch(`${BASE_URL}/users/sign-up`, {
            method: 'POST',
            body: JSON.stringify(userData),
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (err) {
        throw new Error('Network Error');
    }

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || 'User could not be registered');
    }

    return null;
}

export async function loginUser(userData) {
    let response;
    try {
        response = await fetch(`${BASE_URL}/users/login`, {
            method: 'POST',
            body: JSON.stringify(userData),
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (err) {
        throw new Error('Network Error');
    }

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || 'User could not be registered');
    }

    return data;
}

export async function addExpense(expenseDetails) {
    let response;
    try {
        response = await fetch(`${BASE_URL}/expense/add-expense`, {
            method: 'POST',
            body: JSON.stringify(expenseDetails),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': document.cookie.split('=')[1],
            },
        });
    } catch (err) {
        throw new Error('Network Error');
    }

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || 'Expense could not be added');
    }

    return data;
}

