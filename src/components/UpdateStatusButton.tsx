import React from 'react';
import {IconButton, useToast} from '@chakra-ui/react';
import {CheckIcon} from '@chakra-ui/icons';

import {useUpdateTaskStatusMutation} from '../graphql/types';
import {type HandleUpdateArgs, type UpdateStatusButtonProps} from '../types';

const UpdateStatusButton: React.FC<UpdateStatusButtonProps> = ({id, isDone, refetch}) => {
  const toast = useToast();
  const [updateTask, {loading}] = useUpdateTaskStatusMutation();

  const handleUpdateTask = async ({id, isDone}: HandleUpdateArgs): Promise<void> => {
    try {
      if (id) {
        await updateTask({
          variables: {
            id,
            isDone: !isDone,
          },
        });
        refetch();
        toast({
          position: 'top',
          title: `Task Updated`,
          status: 'success',
          isClosable: true,
        });
      }
    } catch (error: any) {
      toast({
        position: 'top',
        title: `Error: ${error.message}`,
        status: 'error',
        isClosable: true,
      });
    }
  };

  return (
    <IconButton
      variant="solid"
      colorScheme={isDone ? 'green' : 'gray'}
      aria-label="Done"
      fontSize="12px"
      size="xs"
      icon={<CheckIcon />}
      isLoading={loading}
      onClick={() => {
        void handleUpdateTask({id, isDone});
      }}
      data-testid="updateStatusButton"
    />
  );
};

export default UpdateStatusButton;
