
import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import './ViewReport.scss';
import Sidebar from './sidebar';
import { getReportedUsers, banUser, getBannedReasons } from '../../apiService'; // Import API functions

const ViewReport = () => {
  const [reports, setReports] = useState([]); // List of reported users
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(''); // Error state
  const [showModal, setShowModal] = useState(false); // Modal state for report details
  const [showBanModal, setShowBanModal] = useState(false); // Modal state for banning user
  const [selectedReport, setSelectedReport] = useState(null); // The currently selected report
  const [banReason, setBanReason] = useState(''); // Selected reason for banning
  const [banReasonsList, setBanReasonsList] = useState([]); // List of ban reasons

  // Fetch the list of reported users and banned reasons when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [reportsData, reasonsData] = await Promise.all([
          getReportedUsers(),
          getBannedReasons(),
        ]);

        console.log('Reports Data:', reportsData);
        console.log('Ban Reasons Data:', reasonsData);

        setReports(reportsData);
        setBanReasonsList(reasonsData); // Sửa lại để lưu đúng danh sách lý do
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to fetch data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Open report detail modal
  const handleShow = (report) => {
    setSelectedReport(report);
    setShowModal(true);
  };

  // Close report detail modal
  const handleClose = () => {
    setShowModal(false);
    setSelectedReport(null);
  };

  // Open ban user modal
  const handleBan = (report) => {
    setSelectedReport(report);
    setShowBanModal(true);
  };

  // Close ban user modal
  const handleBanClose = () => {
    setShowBanModal(false);
    setBanReason('');
    setSelectedReport(null);
  };

  // Confirm banning the user
  const confirmBan = async (reportId) => {
    try {
      await banUser({
        userId: selectedReport.target.id,  // Phải chắc chắn là không null
        bannedReasonId: banReason,        // Đảm bảo banReason là một ID hợp lệ
        reportId: selectedReport.reportId
      });
      setReports(reports.filter(report => report.reportId !== reportId));
      handleBanClose();
      alert('User has been successfully banned.');
    } catch (err) {
      console.error('Failed to ban user:', err);
      alert('Failed to ban user. Please try again.');
    }
  };


  if (loading) {
    return <div>Loading reports...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
      <div className="app-container">
        <Sidebar />
        <div className="view-report-container">
          <h2>Reported Users</h2>
          {reports.length === 0 ? (
              <div className="no-reported-users">
                <h3>No users are currently reported</h3>
                <p>It seems there are no issues with users right now. Enjoy your community</p>
                <img src="/img/logo.png" alt="No reported users" className="no-reported-users-image" />
              </div>
          ) : (
              reports.map((report, index) => (
                  <div className="report-card" key={index} onClick={() => handleShow(report)}>
                    <div className="report-info">
                      <h4>Reported User: {report.target.id}</h4>
                      <p>Reported By: {report.sender.id}</p>
                      <p>Reason: {report.reason}</p>
                    </div>
                    <button
                        className="ban-btn"
                        onClick={(e) => {
                          handleBan(report);
                        }}
                    >
                      Ban
                    </button>
                  </div>
              ))
          )}

          {/* Modal for report details */}
          <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Report Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {selectedReport && (
                  <div>
                    <h4>Reported User: {selectedReport.target.id}</h4>
                    <p>Reported By: {selectedReport.sender.id}</p>
                    <p>Reason: {selectedReport.reason}</p>
                  </div>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>

          {/* Modal for banning user */}
          <Modal show={showBanModal} onHide={handleBanClose}>
            <Modal.Header closeButton>
              <Modal.Title>Ban User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h4>Ban {selectedReport?.target.id}</h4>
              <p>Select the reason for banning:</p>
              <div className="ban-reason-options">
                <select
                    value={banReason}
                    onChange={(e) => setBanReason(e.target.value)}  // Lấy đúng giá trị của ID
                    className="form-control"
                >
                  <option value="">-- Select a reason --</option>
                  {banReasonsList.map((reason, index) => (
                      <option key={index} value={reason.id}> {/* Sử dụng id làm giá trị */}
                        {reason.reason}
                      </option>
                  ))}
                </select>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleBanClose}>
                Cancel
              </Button>
              <Button variant="danger" onClick={() => confirmBan(selectedReport.reportId)} disabled={!banReason}>
                Ban User
              </Button>

            </Modal.Footer>
          </Modal>
        </div>
      </div>
  );
};

export default ViewReport;
