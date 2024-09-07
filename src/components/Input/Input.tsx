import {forwardRef} from 'react';
import {InputProps} from './Input.props';
import s from './Input.module.css';

const Input = forwardRef<HTMLInputElement, InputProps>(
	({type, placeholder, text, name}, ref) => {
		return (
			<label>
				<p className={s.title}>{text}</p>
				<input
					ref={ref}
					type={type}
					placeholder={placeholder}
					className={s.input}
					name={name}
				/>
			</label>
		);
	}
);

export default Input;
