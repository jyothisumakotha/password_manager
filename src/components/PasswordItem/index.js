import './index.css'

const PasswordItem = props => {
  const {userDetails, deleteUser, active} = props
  const {
    website,
    password,
    username,
    initialLetter,
    logoColor,
    id,
  } = userDetails

  const onDeleteBtn = () => {
    deleteUser(id)
  }
  return (
    <li className="details-card">
      <p className={`paragraph ${logoColor}`}>{initialLetter}</p>
      <div className="user-Details">
        <p className="details">{website}</p>
        <p className="details">{username}</p>
        {active ? (
          <p className="details">{password}</p>
        ) : (
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png "
            alt="stars"
            className="stars-logo"
          />
        )}
      </div>
      <button type="button" className="delete-btn" onClick={onDeleteBtn} testid="delete">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png "
          alt="delete"
          className="delete-logo"
        />
      </button>
    </li>
  )
}
export default PasswordItem
