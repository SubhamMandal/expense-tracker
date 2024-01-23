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
    console.log({BASE_URL})
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

export async function getAllExpense() {
    let response;
    try {
        response = await fetch(`${BASE_URL}/expense/all-expense`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': document.cookie.split('=')[1],
            },
        });
    } catch (err) {
        throw new Error(err || 'Network Error');
    }

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || 'Could not fetch expenses');
    }

    return data;
}

export async function addGroup(groupDetails) {
    let response;
    try {
        response = await fetch(`${BASE_URL}/group/add-group`, {
            method: 'POST',
            body: JSON.stringify(groupDetails),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': document.cookie.split('=')[1],
            },
        });
    } catch (err) {
        throw new Error(err || 'Network Error');
    }

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || 'Group could not be added');
    }

    return data;
}

export async function getUserGroups() {
    let response;
    try {
        response = await fetch(`${BASE_URL}/group/user-groups`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': document.cookie.split('=')[1],
            },
        });
    } catch (err) {
        throw new Error(err || 'Network Error');
    }

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || 'Could not fetch group');
    }

    return data;
}

export async function getGroup(groupId) {
    let response;
    try {
        response = await fetch(`${BASE_URL}/group/group-details/${groupId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': document.cookie.split('=')[1],
            },
        });
    } catch (err) {
        throw new Error(err || 'Network Error');
    }

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || 'Could not fetch group');
    }

    return data;
}

export async function joinGroup(groupId) {
    let response;
    try {
        response = await fetch(`${BASE_URL}/group/join/${groupId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': document.cookie.split('=')[1],
            },
        });
    } catch (err) {
        throw new Error(err || 'Network Error');
    }

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || 'Could not join group');
    }

    return data;
}


export async function getGroupExpenses(groupId) {
    let response;
    try {
        response = await fetch(`${BASE_URL}/group/expenses/${groupId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': document.cookie.split('=')[1],
            },
        });
    } catch (err) {
        throw new Error(err || 'Network Error');
    }

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || 'Could not get group expenses');
    }

    return data;
}