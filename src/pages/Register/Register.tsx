import { FormEvent, useEffect, useState } from 'react';
import s from './Register.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { registration, userActions } from '../../store/user.slice';;
import Title from '../../components/Title/Title';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';

export interface RegistrationFields {
	email: {
		value: string
	},
	password: {
		value: string,
	}
	name: {
		value: string
	}
}

const Register = () => {
	const [, setError] = useState<string | undefined>();
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const {jwt, registerErrorMessage} = useSelector(
		(s: RootState) => s.user
	);

	useEffect(() => {
		if (jwt) navigate('/');
	}, [jwt, navigate]);

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		dispatch(userActions.clearLoginError());
		setError(undefined);

		const target = e.target as typeof e.target & RegistrationFields;
		const {email, password, name} = target;

		dispatch(registration({email: email.value, password: password.value, name: name.value}));
	};

	return (
		<form action='#' onSubmit={handleSubmit} className={s.form}>
			<Title>Регистрация</Title>
			{registerErrorMessage ? (
				<p className={s.error}>{registerErrorMessage}</p>
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
			<Input
				type='text'
				name='name'
				placeholder='Имя'
				text='Ваше имя'
			/>
			<div className={s.center}>
				<Button isUpper type='submit'>
          			Зарегистрироваться
				</Button>
			</div>
			<p className={s.text}>Есть аккаунт?</p>
			<p className={s.orange}>
				<Link to='/auth/login'>Войти</Link>
			</p>
		</form>
	);
};

export default Register;
