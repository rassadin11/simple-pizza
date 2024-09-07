import { HTMLAttributes } from 'react';

export interface MenuItemProps extends HTMLAttributes<HTMLUListElement> {
    text: string;
    icon: string;
    to: string;
    items?: boolean
}