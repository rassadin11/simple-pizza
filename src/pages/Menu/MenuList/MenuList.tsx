import PizzaCard from '../../../components/Card/Card';
import {MenuListProps} from './MenuList.props';
import s from '../Menu.module.css';

const MenuList = ({products}: MenuListProps) => {
	return (
		<div className={s.cards}>
			{products.map(item => (
				<PizzaCard
					title={item.name}
					key={item.id}
					description={item.ingredients.join(', ')}
					img={item.image}
					rate={item.rating}
					price={item.price}
					uid={item.id}
				/>
			))}
		</div>
	);
};

export default MenuList;
