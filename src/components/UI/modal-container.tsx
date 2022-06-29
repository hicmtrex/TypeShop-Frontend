import { ReactNode } from 'react';
import { Col, Container, Modal, Row } from 'react-bootstrap';

type Props = {
  children: ReactNode;
  title: string;
  show: boolean;
  handleClose: () => void;
};

const ModalContainer = ({ show, handleClose, children, title }: Props) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title style={{ color: '#e03a3c' }} className='text-xl'>
          {title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row>
            <Col md={12}>{children}</Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default ModalContainer;
