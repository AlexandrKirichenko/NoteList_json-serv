import React, { ReactNode } from 'react';
import styles from './Button.module.scss';

interface ButtonProps {
  id: string;
  onAddSublist: (id: string) => void;
  children?: ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onAddSublist,
  id,
}) => {
  return (
    <button className={styles.button} onClick={() => onAddSublist(id)}>
      {children}
    </button>
  );
};
