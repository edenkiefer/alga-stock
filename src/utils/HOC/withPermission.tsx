import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import {RootState} from '../../redux'

type Role = 'admin' | 'customer' | undefined

const withPermission = 
  (roles: Role[], redirect = '') =>
  (Component: FC<any>) => 
  (props: any) => {
    const auth = useSelector((state: RootState) => ({
      profile: state.authentication.profile
    }))

    return roles.includes(auth.profile?.role)
      ? <Component {...props} />
      : redirect
        ? <Navigate to={redirect}/>
        : null 
  }

export default withPermission