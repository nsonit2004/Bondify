import React, { useState, useEffect } from 'react';
import './VerifyProfile.scss';
import { FaCheck, FaTimes } from 'react-icons/fa';
import Sidebar from './sidebar';
//import { getPendingRequests, approveVerification, deleteVerifyRequest } from '../../apiService';
import { getVerifyRequests, verifyProfile, deleteVerifyRequest  } from '../../apiService';
const VerifyProfile = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPendingRequests = async () => {
      try {
        const pendingUsers = await getVerifyRequests();
        setUsers(pendingUsers);
      } catch (error) {
        console.error('Error fetching pending requests:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPendingRequests();
  }, []);

  const handleVerify = async (requestId) => {
    const verifiedBy = 'Admin'; // Bạn có thể thay đổi giá trị này tùy theo yêu cầu
    try {
      await verifyProfile(requestId, verifiedBy);
      const updatedUsers = users.map(user =>
        user.id === requestId ? { ...user, status: 'Verified' } : user
      );
      setUsers(updatedUsers);
    } catch (error) {
      console.error('Error verifying user:', error);
    }
  };

  const handleReject = async (requestId) => {
    try {
      await deleteVerifyRequest(requestId); // Gọi API để xóa yêu cầu
      const updatedUsers = users.filter(user => user.id !== requestId);
      setUsers(updatedUsers);
    } catch (error) {
      console.error('Error rejecting user:', error);
    }
  };

  return (
    <div className="app-container-vp">
      <Sidebar />
      <div className="verify-profile-container-vp">
        {loading ? (
          [1, 2, 3].map((item) => (
            <div key={item} className="user-card skeleton-vp">
              <div className="skeleton-image-vp"></div>
              <div className="skeleton-info-vp">
                <div className="skeleton-name-vp"></div>
                <div className="skeleton-status-vp"></div>
              </div>
              <div className="skeleton-additional-images-vp">
                <div className="skeleton-additional-vp"></div>
                <div className="skeleton-additional-vp"></div>
              </div>
              <div className="skeleton-verify-button-vp"></div>
            </div>
          ))
        ) : (
          users.map((user) => (
            <div key={user.id} className="user-card-vp">
              <img src={user.image} alt={user.name} className="user-image-vp" />
              <div className="user-info-vp">
                <h4>{user.name}</h4>
                <p>Status: {user.status}</p>
              </div>
              <div className="additional-images-vp">
                <img src={user.additionalImage1} alt="Additional 1" className="additional-image-vp" />
                <img src={user.additionalImage2} alt="Additional 2" className="additional-image-vp" />
              </div>

              <div className="action-buttons-vp">
                <button
                  className={`verify-btn-vp ${user.status === 'Verified' ? 'verified' : ''}`}
                  onClick={() => handleVerify(user.id)}
                  disabled={user.status === 'Verified'}
                >
                  {user.status === 'Verified' ? <FaCheck className="check-icon-vp" /> : 'Verify'}
                </button>
                <button
                  className="reject-btn-vp"
                  onClick={() => handleReject(user.id)}
                >
                  <FaTimes className="reject-icon-vp" /> Reject
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default VerifyProfile;
