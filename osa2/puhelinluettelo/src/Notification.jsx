const Notification = ({ message, error = false }) => {
  return (
    message && <div className={error ? 'error' : 'success'}>{message}</div>
  );
};

export default Notification;
