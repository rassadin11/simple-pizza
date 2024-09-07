import {TitleProps} from './Title.props';
import s from './Title.module.css';
import cn from 'classnames';

const Title = ({children, className, ...props}: TitleProps) => {
	return (
		<h1 className={cn(className, s.title)} {...props}>
			{children}
		</h1>
	);
};

export default Title;
