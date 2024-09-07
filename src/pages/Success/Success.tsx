import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import s from './Success.module.css';
import pizza from '../../assets/pizza.png';

const SuccessPage = () => {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate('/');
	};

	return (
		<div className={s.success}>
			<img src={pizza} alt="Pizza" />
			<p className={s.text}>Ваш заказ успешно оформлен</p>
			<Button isUpper onClick={handleClick}>Сделать новый заказ</Button>
		</div>
	);
};

export default SuccessPage;