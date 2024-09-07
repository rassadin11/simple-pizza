import cn from 'classnames'
import s from './Button.module.css'
import {ButtonProps} from './Button.props'

function Button({children, isUpper, ...props}: ButtonProps) {
  return (
    <button
      className={cn(s['button'], s['accent'], isUpper ? s.upper : '')}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
