import {FormEvent, useEffect, useState} from 'react';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import Title from '../../components/Title/Title';
import s from './Login.module.css';
import {Link, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../store/store';
import {login, userActions} from '../../store/user.slice';

export type LoginForm = {
  email: {
    value: string
  }
  password: {
    value: string
  }
}

const Login = () => {
	const [, setError] = useState<string | undefined>();
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const {jwt, loginErrorMessage} = useSelector(
		(s: RootState) => s.user
	);

	useEffect(() => {
		if (jwt) navigate('/');
	}, [jwt, navigate]);

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		dispatch(userActions.clearLoginError());
		setError(undefined);

		const target = e.target as typeof e.target & LoginForm;
		const {email, password} = target;

		await sendLogin(email.value, password.value);
	};

	const sendLogin = async (email: string, password: string) => {
		await dispatch(login({email, password}));
	};

	return (
		<form action='#' onSubmit={handleSubmit} className={s.form}>
			<Title>Вход</Title>
			{loginErrorMessage ? (
				<p className={s.error}>{loginErrorMessage}</p>
			) : (
				''
			)}
			<Input
				type='text'
				name='email'
				placeholder='Email'
				text='Ваш email'
			/>
			<Input
				type='password'
				name='password'
				placeholder='Пароль'
				text='Ваш пароль'
			/>
			<div className={s.center}>
				<Button isUpper type='submit'>
          Вход
				</Button>
			</div>
			<p className={s.text}>Нет акканута?</p>
			<p className={s.orange}>
				<Link to='/auth/register'>Зарегистрироваться</Link>
			</p>
		</form>
	);
};

export default Login;
