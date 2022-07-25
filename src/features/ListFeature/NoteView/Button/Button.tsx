import React, { ReactNode } from 'react';
import styles from './Button.module.scss';

interface ButtonProps {
  id: string;
  onClick?: (id: string) => void;
  children?: ReactNode;
  type?: 'submit';
}

export const Button: React.FC<ButtonProps> = ({ children, onClick, id }) => {
  return (
    <button
      className={styles.button}
      onClick={() => (onClick ? onClick(id) : null)}
    >
      {children}
    </button>
  );
};
