import React, { useState, useEffect } from 'react';
import { registerUser } from '../../apiService';
import './RegisterForm.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegistrationForm = () => {
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [address, setAddress] = useState('');
    const [provinceId, setProvinceId] = useState('');
    const [districtId, setDistrictId] = useState('');
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [userId, setUserId] = useState(null); // Thêm state để lưu ID người dùng

    useEffect(() => {
        // Lấy danh sách các tỉnh từ backend
        const fetchProvinces = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/location/provinces');
                setProvinces(response.data);
            } catch (error) {
                setMessage('Error fetching provinces.');
            }
        };

        fetchProvinces();
    }, []);

    useEffect(() => {
        // Lấy danh sách huyện dựa trên tỉnh đã chọn
        const fetchDistricts = async () => {
            if (provinceId) {
                try {
                  const response = await axios.get(`http://localhost:8080/api/location/districts/${provinceId}`);
                    setDistricts(response.data);
                } catch (error) {
                    setMessage('Error fetching districts.');
                }
            }
        };

        fetchDistricts();
    }, [provinceId]);

    const handleSubmit = async (e) => {
      e.preventDefault();
      setMessage('');
    
      if (!email || !phoneNumber || !password || !dateOfBirth || !address || !provinceId || !districtId) {
        setMessage('All fields are required.');
        return;
      }
    
      // Các kiểm tra dữ liệu khác ở đây (email, số điện thoại, password...)
    
      try {
          setLoading(true);
          const response = await registerUser({
            email,
            phoneNumber,
            password,
            dateOfBirth,
            address,
            province: { id: provinceId }, // Gửi province dưới dạng đối tượng
            district: { id: districtId }   // Gửi district dưới dạng đối tượng
        });



        // Lưu userId vào localStorage
if (response.userId) {
    localStorage.setItem('userId', response.userId); // Lưu userId vào localStorage
    console.log('User ID saved:', response.userId); // Kiểm tra đã lưu đúng chưa
}
          setMessage(response.message);
          localStorage.setItem('email', email);
          
          setTimeout(() => {
              setLoading(false);
              navigate('/verify');
          }, 1500);
      } catch (error) {
          setMessage(error.error || 'Registration failed.');
          setLoading(false);
      }
  };

    return (
        <div className="custom-container">
            {loading && (
            <div className="custom-loading-overlay">
                <div className="custom-spinner"></div>
            </div>
        )}
    <div className="custom-signup-form-container">
        <form onSubmit={handleSubmit} className="custom-signup-form">
            <h1>SIGN UP</h1>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Email"
                className="custom-input-field"
            />
            <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
                placeholder="Phone Number"
                className="custom-input-field"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Password"
                className="custom-input-field"
            />
            <input
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                required
                className="custom-input-field"
            />

            {/* Dropdown chọn tỉnh */}
            <select
                value={provinceId}
                onChange={(e) => setProvinceId(e.target.value)}
                required
                className="custom-input-field"
            >
                <option value="">Select Province</option>
                {provinces.map((province) => (
                    <option key={province.id} value={province.id}>
                        {province.name}
                    </option>
                ))}
            </select>

            {/* Dropdown chọn huyện */}
            <select
                value={districtId}
                onChange={(e) => setDistrictId(e.target.value)}
                required
                className="custom-input-field"
                disabled={!provinceId} // Disable nếu chưa chọn tỉnh
            >
                <option value="">Select District</option>
                {districts.map((district) => (
                    <option key={district.id} value={district.id}>
                        {district.name}
                    </option>
                ))}
            </select>

            <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                placeholder="Address"
                className="custom-input-field"
            />
            <button
              className="custom-submit-button"
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#5a0ba0")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#6a0dad")}
          >
            Register
          </button>
            {message && <div className="custom-message">{message}</div>}
        </form>

        <div className="custom-signup-image"></div>
    </div>
</div>

    );
}
    export default RegistrationForm;
