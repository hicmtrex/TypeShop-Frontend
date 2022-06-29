import { ReactNode } from 'react';
import { Button } from 'react-bootstrap';

type ButtonType = {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
};

const RedButton = ({ children, onClick, className, disabled }: ButtonType) => {
  return (
    <Button
      onClick={onClick}
      style={{ backgroundColor: '#e03a3c', color: '#fff' }}
      variant='outline-none'
      className={className}
      disabled={disabled}
    >
      {children}
    </Button>
  );
};

export default RedButton;
