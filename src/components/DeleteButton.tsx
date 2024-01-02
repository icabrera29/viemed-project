import React from 'react';
import {useToast, IconButton} from '@chakra-ui/react';
import {CloseIcon} from '@chakra-ui/icons';
import {useDeleteTaskMutation} from '../graphql/types';
import {type DeleteButtonProps} from '../types';

const DeleteButton: React.FC<DeleteButtonProps> = ({id, refetch}) => {
  const toast = useToast();
  const [deleteTask, {loading}] = useDeleteTaskMutation();

  const handleRemoveTask = async (id: string | undefined): Promise<void> => {
    try {
      if (id) {
        await deleteTask({
          variables: {
            id,
          },
        });
        refetch();
        toast({
          position: 'top',
          title: `Task deleted`,
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
      colorScheme="red"
      aria-label="Delete"
      fontSize="12px"
      size="xs"
      icon={<CloseIcon />}
      isLoading={loading}
      onClick={() => {
        void handleRemoveTask(id);
      }}
      data-testid="deleteButton"
    />
  );
};

export default DeleteButton;
