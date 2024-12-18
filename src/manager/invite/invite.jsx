import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useSearchParams } from 'react-router-dom';
import classes from './invite.module.css';

const AcceptInvitation = () => {
    const [searchParams] = useSearchParams();
    const location = useLocation();
    const token = searchParams.get('token');
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);

    const authToken = localStorage.getItem("token")

    const apiBaseURL = 'http://localhost:8085';
    const cleanedPathname = location.pathname.replace(/^\/v1/, ''); // Удаляем 'v1'
    const apiEndpoint = `${apiBaseURL}${cleanedPathname}`;

    const handleAccept = async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await axios.post(
                apiEndpoint,
                null,
                {
                    params: { token },
                    headers: {
                        Authorization: `Bearer ${authToken}`, // Добавляем Bearer-токен
                    },
                }
            );
            setResponse(result.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (!token) {
        return <div>Токен не найден</div>;
    }

    return (
        <div className={classes.container}>
            <div className={classes.invitation}>
                <h1 className={classes.label}>Invitation</h1>
                <p className={classes.label}>Would you like to accept invitation?</p>
                {loading && <p className={classes.label}>Loading...</p>}
                {response && <p className={classes.label}>Successful: {JSON.stringify(response)}</p>}
                {error && <p className={classes.label}>Error: {error}</p>}
                <button className={classes.button} onClick={handleAccept} disabled={loading}>
                    Accept
                </button>
            </div>
        </div>
    );
};

export default AcceptInvitation;
