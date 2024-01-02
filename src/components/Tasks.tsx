import React from 'react';

import {Container, Heading, Text, VStack} from '@chakra-ui/react';

import AddTask from './AddTask';
import TasksTable from './TasksTable';

import {useAllTasksQuery} from '../graphql/types';

const Tasks: React.FC = () => {
  const {data, refetch, loading, client} = useAllTasksQuery();

  const handleLogout = async (): Promise<void> => {
    localStorage.removeItem('token');
    await client.clearStore();
    window.location.reload();
  };

  return (
    <Container
      maxW="800px"
      minHeight="100vh"
      justifyContent="start"
      centerContent
      display="flex"
      flexDirection="column"
      gap={20}>
      <VStack spacing={5} align="center" marginTop={65}>
        <Heading>Add your tasks</Heading>
        <Text onClick={handleLogout} as="u" cursor="pointer">
          LOGOUT
        </Text>
      </VStack>
      <AddTask refetch={refetch} />
      <TasksTable tasks={data} refetch={refetch} loading={loading} />
    </Container>
  );
};

export default Tasks;
