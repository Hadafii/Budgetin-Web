import React, { useState, useEffect } from "react";
import { Popover, OverlayTrigger, Button } from "react-bootstrap";
import "../Component Style/Notifikasi.css";

const NotificationPopover = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [extraNotifications, setExtraNotifications] = useState(0);

  useEffect(() => {
    const fetchNotifications = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        window.location.href = "/Login";
        return;
      }

      try {
        const response = await fetch(
          "https://api.dafiutomo.com/GatewayApi/v1/getnotificationsLimit",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const result = await response.json();

        if (result.success) {
          const notificationsCount = result.totalNotifications;
          setNotifications(result.data);
          setExtraNotifications(notificationsCount - result.data.length);

          const unread = result.data.filter((notif) => notif.is_read === 0).length;
          setUnreadCount(unread);
        } else {
          console.error("Error fetching notifications:", result.message);
        }
      } catch (err) {
        console.error("Error fetching notifications:", err);
      }
    };

    fetchNotifications();
  }, []);

  const markAsRead = async (notificationId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/Login";
      return;
    }

    try {
      const response = await fetch(
        `https://api.dafiutomo.com/GatewayApi/v1/markasRead/${notificationId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const result = await response.json();

      if (result.success) {
        setNotifications((prevNotifications) =>
          prevNotifications.map((notif) =>
            notif.notification_id === notificationId
              ? { ...notif, is_read: 1 }
              : notif
          )
        );

        setUnreadCount((prevCount) => Math.max(prevCount - 1, 0));
      } else {
        console.error("Failed to mark notification as read:", result.message);
      }
    } catch (err) {
      console.error("Error marking notification as read:", err);
    }
  };

  const markAllAsRead = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/Login";
      return;
    }

    try {
      const response = await fetch(
        "https://api.dafiutomo.com/GatewayApi/v1/markAllAsRead",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const result = await response.json();

      if (result.success) {
        setNotifications((prevNotifications) =>
          prevNotifications.map((notif) => ({ ...notif, is_read: 1 }))
        );
        setUnreadCount(0); 
      } else {
        console.error("Failed to mark all notifications as read:", result.message);
      }
    } catch (err) {
      console.error("Error marking all notifications as read:", err);
    }
  };

  const popover = (
    <Popover id="popover-notification" className="shadow" style={{ minWidth: "300px" }}>
      <Popover.Header as="h3" className="d-flex justify-content-between align-items-center">
        <span>Notifications</span>
        <Button variant="link" className="budgetin-linked" onClick={markAllAsRead}>
          Mark all read
        </Button>
      </Popover.Header>
      <Popover.Body>
        {notifications.length === 0 ? (
          <p className="text-muted">Tidak ada notifikasi ditemukan.</p>
        ) : (
          <>
            {notifications.map((notif) => (
              <div
                key={notif.notification_id}
                className={`notification-item ${
                  notif.is_read ? "" : "fw-bold"
                }`}
                onClick={notif.is_read ? null : () => markAsRead(notif.notification_id)} 
                style={{ cursor: notif.is_read ? "default" : "pointer" }}
              >
                <span>{notif.message}</span>
                <p>
                  <small>
                    {new Date(notif.created_at).toLocaleDateString("id-ID", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </small>
                </p>
                <hr />
              </div>
            ))}
            {extraNotifications > 0 && (
              <div className="extra-notifications text-center" style={{marginTop:'-10px', marginBottom:'-20px'}}>
                <small>+{extraNotifications} messages</small>
              </div>
            )}

          </>
        )}
      </Popover.Body>
      <div className="text-center">
        <hr className="mb-0" />
        <Button
          variant="link"
          className="py-2 link-danger link-underline-danger link-offset-3-hover link-underline-opacity-0 link-underline-opacity-75-hover"
          href="/Notification"
        >
          View all notifications
        </Button>
      </div>
    </Popover>
  );

  return (
    <OverlayTrigger trigger="click" placement="bottom" overlay={popover} rootClose>
      <Button variant="outline-light" className="navbar-button position-relative" id="notifaja">
        <i className="bi bi-bell-fill"></i>
        {unreadCount > 0 && (
          <span className="badge bg-danger rounded-pill position-absolute top-0 start-100 translate-middle">
            {unreadCount}
          </span>
        )}
      </Button>
    </OverlayTrigger>
  );
};

export default NotificationPopover;
