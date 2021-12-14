import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { RootState } from '../../redux';
import { logout } from '../../redux/Authentication/Authentication.actions';
import { User } from '../../services/Authentication.service';
import './Header.css'

declare interface HeaderProps {
  title: string,
  profile?: User
}

const Header: React.FC <HeaderProps> = (props) => {
  const isLoggedIn = !!props.profile?._id
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLoginLogout = () => {
    isLoggedIn
      ? askToLogout()
      : navigate('/login')
  }

  const askToLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#09f',
      cancelButtonColor: '#d33',
    }).then((result) => { result && dispatch(logout()) })
  }

  return (
    <header className='AppHeader'>
      <h1>{props.title}</h1>
      <div>
        <span onClick={handleLoginLogout}>
          {
            isLoggedIn ? 'Logout' : 'Login'
          }
        </span>
      </div>
    </header>
  )

}

const mapStateToProps = (state: RootState) => ({
  profile: state.authentication.profile
})

export default connect(mapStateToProps)(Header)