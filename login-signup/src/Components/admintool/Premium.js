import React, { useState, useEffect } from 'react';
import './Premium.css';
import Sidebar from "./sidebar";
import { getAllUsers, togglePremiumStatus } from '../../apiService'; // Import các hàm từ apiService

const Premium = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [userFilter, setUserFilter] = useState('all'); // State để lọc người dùng

    // Fetch danh sách người dùng từ API
    const fetchUsers = async () => {
        try {
            const userData = await getAllUsers(); // Gọi API để lấy danh sách người dùng
            setUsers(userData); // Lưu dữ liệu vào state
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {
        fetchUsers(); // Gọi hàm fetchUsers khi component mount
    }, []);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleTogglePremium = async (userId) => {
        try {
            const updatedUser = await togglePremiumStatus(userId); // Gọi API để thay đổi trạng thái Premium
            setUsers(users.map(user => (user.id === updatedUser.id ? updatedUser : user))); // Cập nhật state sau khi thay đổi
        } catch (error) {
            console.error('Error toggling premium status:', error);
        }
    };

    const filteredUsers = users.filter(user =>
        user.email.includes(searchTerm) &&
        (userFilter === 'all' || (userFilter === 'premium' && user.isPremium) || (userFilter === 'normal' && !user.isPremium))
    );

    return (
        <div className="premium-container">
            <div className="sidebar">
                <Sidebar />
            </div>
            <div className="premium-wrapper">
                <h1>User List</h1>
                <input
                    type="text"
                    placeholder="Search by email..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <div className="filter-buttons">
                    <button onClick={() => setUserFilter('all')} className={userFilter === 'all' ? 'active' : ''}>
                        All Users
                    </button>
                    <button onClick={() => setUserFilter('premium')} className={userFilter === 'premium' ? 'active' : ''}>
                        Premium Users
                    </button>
                    <button onClick={() => setUserFilter('normal')} className={userFilter === 'normal' ? 'active' : ''}>
                        Normal Users
                    </button>
                </div>
                <table>
                    <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Premium Status</th>
                        <th>Toggle Premium</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredUsers.map(user => (
                        <tr key={user.id}>
                            <td className="info">{user.username}</td>
                            <td className="info">{user.email}</td>
                            <td>{user.isPremium ? 'Premium' : 'Normal'}</td>
                            <td>
                                <button
                                    className={user.isPremium ? '' : 'make-premium-button'}
                                    onClick={() => handleTogglePremium(user.id)}
                                >
                                    {user.isPremium ? 'Revert to Normal' : 'Make Premium'}
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Premium;
