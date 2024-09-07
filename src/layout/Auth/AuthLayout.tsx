import {Outlet} from 'react-router-dom';
import s from './AuthLayout.module.css';
import loginImg from '../../assets/login.svg';

const AuthLayout = () => {
	return (
		<div className={s.layout}>
			<div className={s.logo}>
				<img src={loginImg} alt='Logo' />
			</div>
			<div className={s.content}>
				<Outlet />
			</div>
		</div>
	);
};

export default AuthLayout;
