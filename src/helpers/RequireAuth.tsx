import {ReactNode} from 'react'
import {useSelector} from 'react-redux'
import {Navigate} from 'react-router-dom'
import {RootState} from '../store/store'

const RequireAuth = ({children}: {children: ReactNode}) => {
  const jwt = useSelector((s: RootState) => s.user.jwt)

  if (!jwt) {
    return <Navigate to='/auth/login' />
  }

  return <div>{children}</div>
}

export default RequireAuth
