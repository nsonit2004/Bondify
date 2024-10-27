import React, { useState, useEffect } from 'react';
import Sidebar from './sidebar';
import './BannedUsersList.scss';
import { getBannedUsers, unbanUser } from '../../apiService';

const BannedUsersList = () => {
    const [bannedUsers, setBannedUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        // Lấy danh sách người dùng bị ban khi component mount
        const fetchBannedUsers = async () => {
            try {
                const users = await getBannedUsers();
                setBannedUsers(users);
            } catch (error) {
                setError('Failed to load banned users.');
            } finally {
                setLoading(false);
            }
        };

        fetchBannedUsers();
    }, []);

    const handleUnban = async (bannedId) => {
        try {
            await unbanUser(bannedId);
            // Xóa người dùng đã được unban khỏi danh sách
            setBannedUsers(bannedUsers.filter(user => user.bannedId !== bannedId));
            alert('User unbanned successfully.');
        } catch (error) {
            alert('Failed to unban user.');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="app-container">
            <Sidebar/>
            <div className="banned-users-container">
                <h2>Banned Users</h2>
                {bannedUsers.length === 0 ? (
                    <div className="no-banned-users">
                        <h3>No users are currently banned.</h3>
                        <p>It seems there are no issues with users right now. Enjoy your community!</p>
                        <img src="/img/logo.png" alt="No banned users" className="no-banned-users-image"/>
                    </div>
                ) : (
                    bannedUsers.map((user, index) => (
                        <div className="banned-user-card" key={index}>
                            <div className="user-info">
                                <h4>UserId: {user.user.email}</h4>
                                <p>Reason: {user.bannedReason.reason}</p>
                                <p>Date Banned: {new Date(user.bannedDate).toLocaleDateString()}</p>
                            </div>
                            <button className="unban-btn" onClick={() => handleUnban(user.bannedId)}>Unban</button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

    export default BannedUsersList;