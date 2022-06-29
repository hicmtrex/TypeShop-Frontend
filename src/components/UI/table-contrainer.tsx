import { ReactNode } from 'react';
import { Card, Table } from 'react-bootstrap';

type Props = {
  children: ReactNode;
  cols: any;
};

const TableContainer = ({ children, cols }: Props) => {
  return (
    <Card className=' shadow border-0 mt-5 '>
      <Table responsive hover className='table-nowrap'>
        <thead
          style={{ backgroundColor: '#e03a3c' }}
          className='thead-light text-white'
        >
          <tr>
            {cols.map((col: any) => (
              <th key={col} scope='col'>
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </Table>
    </Card>
  );
};

export default TableContainer;
