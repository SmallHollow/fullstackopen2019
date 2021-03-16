const Notification = ({ message }) => {
  return (
    message && (
      <div className={message.error ? 'error' : 'success'}>{message.text}</div>
    )
  );
};

export default Notification;
