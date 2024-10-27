import React, { useState } from 'react';
import './NotificationPagePremium.css';

const NotificationPage = () => {
  // Danh sách thông báo mẫu với trạng thái đã xem và hình ảnh
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New Message",
      message: "You have a new message from a contact.",
      time: "10:30 AM",
      isRead: false,
      image: "path/to/image1.jpg", // Đường dẫn tới hình ảnh
    },
    {
      id: 2,
      title: "Profile Update",
      message: "Your profile information has been successfully updated.",
      time: "11:15 AM",
      isRead: true,
      image: "path/to/image2.jpg", // Đường dẫn tới hình ảnh
    },
    {
      id: 3,
      title: "System Alert",
      message: "Scheduled maintenance will occur tomorrow at 10 PM.",
      time: "Yesterday at 9:00 PM",
      isRead: false,
      image: "path/to/image3.jpg", // Đường dẫn tới hình ảnh
    },
  ]);

  // Xử lý khi nhấn vào thông báo
  const handleNotificationClick = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === id ? { ...notification, isRead: true } : notification
      )
    );
  };

  return (
    <div className="main-container-noti">
      <h1 className="noti">Notifications</h1>

      <div className="content-container-noti">
        <div className="notification-list-noti">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`notification-item ${notification.isRead ? 'read' : 'unread'}`}
              onClick={() => handleNotificationClick(notification.id)}
            >
              <img src={notification.image} alt={notification.title} className="notification-image" />
              <div className="notification-content">
                <h2 className="title-noti">{notification.title}</h2>
                <p className="message-noti">{notification.message}</p>
                <p className="notification-time">{notification.time}</p>
                {!notification.isRead && <span className="new-indicator">New</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationPage;
