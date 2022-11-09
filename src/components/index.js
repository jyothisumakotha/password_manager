import {Component} from 'react'
import './index.css'
import {v4 as uuidv4} from 'uuid'
import PasswordItem from './PasswordItem/index'

const logoColors = ['red', 'orange', 'skyblue', 'yellow', 'green', 'lightgreen']
class PasswordManager extends Component {
  state = {
    website: '',
    password: '',
    username: '',
    count: 0,
    usersList: '',
    isActive: false,
  }

  onWebsite = event => {
    this.setState({
      website: event.target.value,
    })
  }

  onUsername = event => {
    this.setState({username: event.target.value})
  }

  onPassword = event => {
    this.setState({password: event.target.value})
  }

  onAddBtn = event => {
    event.preventDefault()
    const {website, password, username} = this.state
    const len = logoColors.length
    const res = Math.floor(Math.random() * len)
    const newUserDetails = {
      id: uuidv4(),
      website,
      password,
      username,
      initialLetter: website[0].toUpperCase(),
      logoColor: logoColors[res],
    }
    this.setState(prevState => ({
      website: '',
      username: '',
      password: '',
      count: prevState.count + 1,
      usersList: [...prevState.usersList, newUserDetails],
    }))
  }

  showPasswords = () => {
    this.setState(prevState => ({isActive: !prevState.isActive}))
  }

  deleteUser = id => {
    const {usersList} = this.state
    const filteredUsersList = usersList.filter(eachUser => eachUser.id !== id)
    this.setState(prevState => ({
      usersList: filteredUsersList,
      count: prevState.count - 1,
    }))
  }

  onSearch = event => {
    if (event.target.value.length !== 0) {
      const {usersList} = this.state
      const resultantList = usersList.filter(eachUser =>
        eachUser.website.includes(event.target.value.toLowerCase()),
      )
      this.setState({
        usersList: resultantList,
      })
    } else {
      this.setState({usersList: ''})
    }
  }

  render() {
    const {website, password, username, count, usersList, isActive} = this.state
    return (
      <div className="bg-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png "
          alt=" app logo"
          className="app-logo"
        />
        <div className="container1">
          <form className="passwordDetails-container">
            <h1 className="title">Add New Password</h1>
            <div className="website-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                alt="website"
                className="logo"
              />
              <input
                placeholder="Enter Website"
                className="input-bar"
                onChange={this.onWebsite}
                value={website}
              />
            </div>
            <div className="username-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png "
                alt="username"
                className="logo"
              />
              <input
                placeholder="Enter Username"
                className="input-bar"
                onChange={this.onUsername}
                value={username}
              />
            </div>
            <div className="password-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                alt="password"
                className="logo"
              />
              <input
                placeholder="Enter Password"
                className="input-bar"
                type="password"
                onChange={this.onPassword}
                value={password}
              />
            </div>
            <button
              type="submit"
              className="add-button"
              onClick={this.onAddBtn}
            >
              Add
            </button>
          </form>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png "
            alt="password manager"
            className="image"
          />
        </div>
        <div className="container2">
          <div className="passwords-display-container">
            <h1 className="heading">Your Passwords</h1>
            <p className="passwords-count">{count}</p>
            <div className="search-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="search-icon"
              />
              <input
                placeholder="Search"
                type="search"
                className="search-bar"
                onChange={this.onSearch}
              />
            </div>
          </div>
          <hr className="line" />
          <div className="checkbox-container">
            <input
              type="checkbox"
              id="passwordCheckbox"
              onClick={this.showPasswords}
            />
            <label htmlFor="passwordCheckbox" className="text">
              Show Passwords
            </label>
          </div>
          {usersList.length > 0 ? (
            <ul className="details-container">
              {usersList.map(eachUser => (
                <PasswordItem
                  userDetails={eachUser}
                  key={eachUser.id}
                  deleteUser={this.deleteUser}
                  active={isActive}
                />
              ))}
            </ul>
          ) : (
            <div className="logo-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png "
                alt="no passwords"
                className="image2"
              />
              <p className="password">No Passwords</p>
            </div>
          )}
        </div>
      </div>
    )
  }
}
export default PasswordManager
