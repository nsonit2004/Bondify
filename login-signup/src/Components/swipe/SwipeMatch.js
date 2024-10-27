import React, { useState } from 'react';
import { swipeUser } from '../../apiService'; // Import hàm từ apiService

const SwipeMatch = () => {
    const [userEmail, setUserEmail] = useState('');
    const [targetUserEmail, setTargetUserEmail] = useState('');
    const [action, setAction] = useState('like');
    const [responseMessage, setResponseMessage] = useState('');

    const handleSwipe = async (e) => {
        e.preventDefault();
        setResponseMessage('');

        const swipeRequest = {
            userEmail,
            targetUserEmail,
            action
        };

        try {
            const response = await swipeUser(swipeRequest); // Gọi hàm swipeUser từ apiService
            setResponseMessage(response.message);
        } catch (error) {
            console.error(error);
            if (error.message) {
                setResponseMessage(error.message);
            } else {
                setResponseMessage('An error occurred. Please try again.');
            }
        }
    };

    return (
        <div style={styles.container}>
            <h2>Swipe and Match</h2>
            <form onSubmit={handleSwipe}>
                <input
                    type="email"
                    placeholder="Your Email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Target User Email"
                    value={targetUserEmail}
                    onChange={(e) => setTargetUserEmail(e.target.value)}
                    required
                />
                <select value={action} onChange={(e) => setAction(e.target.value)}>
                    <option value="like">Like</option>
                    <option value="pass">Pass</option>
                </select>
                <button type="submit">Swipe</button>
            </form>
            {responseMessage && <p style={styles.response}>{responseMessage}</p>}
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        maxWidth: '400px',
        margin: 'auto',
    },
    response: {
        marginTop: '20px',
        color: 'green',
    },
};

export default SwipeMatch;