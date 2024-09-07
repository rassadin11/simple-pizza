import { ListProps } from './List.props';

const List = ({ingredients, ...props}: ListProps) => {
	if (!ingredients.length) return null;
    
	return (
		<ul {...props}>
			{ingredients.map(item => <li key={item}>{item}</li>)}
		</ul>
	);
	
};

export default List;