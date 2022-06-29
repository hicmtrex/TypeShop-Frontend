import { ReactNode } from 'react';
import { Alert } from 'react-bootstrap';

type Props = {
  children: ReactNode;
  variant?: string;
};

const Message = ({ children, variant = 'danger' }: Props) => {
  return (
    <Alert variant={variant}>
      <Alert.Heading>{children}</Alert.Heading>
    </Alert>
  );
};

export default Message;
