export default function ErrorMessage({ title, message, details }) {
  return (
    <div className="error-message">
      <div className="error-icon">⚠️</div>
      <h2>{title}</h2>
      <p className="error-main">{message}</p>
      {details && <p className="error-details">{details}</p>}
    </div>
  )
}
