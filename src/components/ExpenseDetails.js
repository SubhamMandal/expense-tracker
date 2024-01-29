import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import useHttp from '../hooks/use-http';
import { getExpenseDetails } from '../lib/api';

const ExpenseDetails = () => {
    const { expenseId } = useParams();
    const { sendRequest, data, error, status } = useHttp(getExpenseDetails);
    useEffect(() => {
        sendRequest(expenseId);
    }, [])
    console.log(data);
    if (error) {
        return <div>Opps! Something went wrong! {error}</div>
    }
    return (
        <div>
            {expenseId}
        </div>
    )
}

export default ExpenseDetails;