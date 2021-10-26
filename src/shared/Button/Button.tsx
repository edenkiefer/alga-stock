import React from 'react';
import './Button.css';

declare interface ButtonProps {
  onClick?: () => void
}

const Button: React.FC <ButtonProps> = (props) => {
  return <button
    className="ButtonApp"
    onClick={props.onClick}
  >{ props.children }</button>
}

export default Button;