import {forwardRef} from 'react';
import s from './SearchInput.module.css';
import {SearchInputProps} from './SearchInput.props';

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
	({placeholder, ...props}: SearchInputProps, ref) => {
		return (
			<input
				type='text'
				placeholder={placeholder}
				ref={ref}
				{...props}
				className={s.input}
			/>
		);
	}
);

export default SearchInput;