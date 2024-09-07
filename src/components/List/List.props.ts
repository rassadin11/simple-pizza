import { HTMLAttributes } from 'react';

export interface ListProps extends HTMLAttributes<HTMLUListElement> {
    ingredients: string[];
}