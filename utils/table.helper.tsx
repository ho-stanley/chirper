import { Col, Row, Text, Tooltip } from '@nextui-org/react';
import { MdOutlineDelete } from 'react-icons/md';
import { FiEdit } from 'react-icons/fi';
import IconButton from '../components/IconButton';
import { User } from '../types/user';

interface UserType extends User {
  [key: string]: string;
}

const renderCell = (
  item: User,
  columnKey: React.Key,
  onDelete: (user: User) => void,
  onRoleChange: (user: User) => void
) => {
  const userType: UserType = { ...item };
  const cellValue = userType[columnKey];

  switch (columnKey) {
    case 'username':
      return <Text>{item.username}</Text>;
    case 'role':
      return <Text>{item.role}</Text>;
    case 'actions':
      return (
        <Row justify="center" align="center">
          <Col css={{ d: 'flex' }}>
            <Tooltip content="Change role">
              <IconButton onClick={() => onRoleChange(item)}>
                <FiEdit size="1.5rem" />
              </IconButton>
            </Tooltip>
          </Col>
          <Col css={{ d: 'flex' }}>
            <Tooltip content="Delete user">
              <IconButton onClick={() => onDelete(item)}>
                <MdOutlineDelete size="1.5rem" fill="#f31260" />
              </IconButton>
            </Tooltip>
          </Col>
        </Row>
      );
    default:
      return <Text>{cellValue}</Text>;
  }
};

export default renderCell;
