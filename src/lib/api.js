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

