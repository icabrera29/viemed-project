import React from 'react';
import {Table, Thead, Tbody, Tr, Th, Td, TableContainer, Skeleton, Stack} from '@chakra-ui/react';

import DeleteButton from './DeleteButton';
import UpdateStatusButton from './UpdateStatusButton';
import {type TasksTableProps} from '../types';

const TasksTable: React.FC<TasksTableProps> = ({tasks, loading, refetch}) => {
  if (loading)
    return (
      <Stack width="100%" data-testid="loading">
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
      </Stack>
    );
  return (
    <TableContainer width="100%">
      <Table
        variant="simple"
        border="1px solid"
        borderColor="gray.200"
        rounded="md"
        data-testid="tasksTable">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Note</Th>
            <Th textAlign="center">Status</Th>
            <Th textAlign="center">Remove</Th>
          </Tr>
        </Thead>
        <Tbody>
          {!!tasks?.allTasks?.length &&
            tasks?.allTasks?.map(task => {
              return (
                <Tr key={task?.id}>
                  <Td className="taskTd">{task?.name}</Td>
                  <Td className="taskTd">{task?.note}</Td>
                  <Td textAlign="center">
                    <UpdateStatusButton id={task?.id} isDone={task?.isDone} refetch={refetch} />
                  </Td>
                  <Td textAlign="center">
                    <DeleteButton id={task?.id} refetch={refetch} />
                  </Td>
                </Tr>
              );
            })}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default TasksTable;
