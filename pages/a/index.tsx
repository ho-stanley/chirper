import { Button, Container, Spacer, Table, Text } from '@nextui-org/react';
import { useState } from 'react';
import useSWR from 'swr';
import LoadingIndicator from '../../components/LoadingIndicator';
import useDeleteUserDialog from '../../hooks/useDeleteUserDialog';
import useNewUserDialog from '../../hooks/useNewUserDialog';
import useRoleChangeDialog from '../../hooks/useRoleChangeDialog';
import { User } from '../../types/user';
import { API_URL } from '../../utils/config';
import { fetcher } from '../../utils/http/axios-http';
import renderCell from '../../utils/table.helper';
import { NextPageWithLayout } from '../_app';

const columns = [
  { key: 'username', label: 'Username' },
  { key: 'role', label: 'Role' },
  { key: 'actions', label: 'Actions' },
];

const ManageUsersPage: NextPageWithLayout = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const { setVisible: openNewUserDialog, UserDialog } = useNewUserDialog();
  const { setVisible: openRoleChangeDialog, RoleDialog } =
    useRoleChangeDialog(selectedUser);
  const { setVisible: openDeleteUserDialog, DeleteDialog } =
    useDeleteUserDialog(selectedUser);
  const {
    data: users,
    mutate,
    isValidating,
  } = useSWR<User[]>(`${API_URL}/users`, fetcher);

  const onDelete = (user: User) => {
    setSelectedUser(user);
    openDeleteUserDialog(true);
  };

  const onRoleChange = (user: User) => {
    setSelectedUser(user);
    openRoleChangeDialog(true);
  };

  if (!users && isValidating) return <LoadingIndicator />;

  return (
    <>
      {RoleDialog}
      {DeleteDialog}
      {UserDialog}
      <Container gap={1} css={{ mb: '$4' }}>
        <Text h2>Manage users</Text>
        <Button auto onPress={() => openNewUserDialog(true)}>
          New user
        </Button>
        <Spacer y={0.5} />

        <Table aria-label="Table showing user information">
          <Table.Header columns={columns}>
            {(column) => (
              <Table.Column
                key={column.key}
                hideHeader={column.key === 'actions'}
                align={column.key === 'actions' ? 'center' : 'start'}
              >
                {column.label}
              </Table.Column>
            )}
          </Table.Header>
          <Table.Body items={users}>
            {(item) => (
              <Table.Row>
                {(columnKey) => (
                  <Table.Cell>
                    {renderCell(item, columnKey, onDelete, onRoleChange)}
                  </Table.Cell>
                )}
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </Container>
    </>
  );
};

export default ManageUsersPage;
