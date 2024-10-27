import React, { useState } from 'react';
import { saveUserProfile, verifyUser } from '../../apiService';
import { useNavigate } from 'react-router-dom';
import './VerifyForm.css'; // Import the CSS file

const VerificationForm = () => {
    const [verificationCode, setVerificationCode] = useState('');
    const [message, setMessage] = useState('');
    const email = localStorage.getItem('email');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!email) {
            setMessage('Không tìm thấy email để xác minh.');
            return;
        }
    
        try {
            const response = await verifyUser(email, verificationCode);
            setMessage(response.message);
    
            // Sau khi xác minh thành công, lưu thông tin người dùng vào cơ sở dữ liệu
            if (response.success) { // Kiểm tra nếu xác minh thành công
                // Gọi API để lưu thông tin người dùng
                const userId = localStorage.getItem('userId'); // Lấy userId từ localStorage
                // await saveUserProfile({ userId, /* các trường khác cần thiết */ });
                await saveUserProfile({userId,});
    
                
            }
            // Chuyển hướng đến trang hồ sơ
            navigate('/profile', { state: { email } });
        } catch (error) {
            setMessage(error.error || 'Xác minh không thành công.');
        }
    };
    

    const handleCancel = () => {
        navigate('/register'); // Điều hướng về trang đăng ký
    };

    return (
        <div className="verify-container">
            <div className="verification-form-container">
                <h2>Enter Verification Code</h2>
                <form className="verification-form" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="code">Code:</label>
                        <input
                            type="text"
                            id="code"
                            value={verificationCode}
                            onChange={(e) => setVerificationCode(e.target.value)} // Đảm bảo cập nhật giá trị
                            required
                        />
                    </div>
                    <div className="button-container">
                        <button type="submit" className="submit-btn">Verify Code</button>
                        <button type="button" className="cancel-btn" onClick={handleCancel}>Cancel</button>
                    </div>
                </form>
                {message && <p className="success">{message}</p>}
                {error && <p className="error">{error}</p>}
            </div>
        </div>    
    );
};

export default VerificationForm;
