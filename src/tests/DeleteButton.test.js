/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/await-thenable */
import React from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {MockedProvider} from '@apollo/client/testing';
import {ChakraProvider} from '@chakra-ui/react';
import DeleteButton from '../components/DeleteButton';
import {deleteTaskMutationMock, deleteTaskMutationErrorMock} from './mocks/mocks';

describe('DeleteButton', () => {
  const refetch = jest.fn();

  it('should render the delete button', async () => {
    render(
      <MockedProvider mocks={deleteTaskMutationMock} addTypename={false}>
        <DeleteButton id="1" refetch={refetch} />
      </MockedProvider>,
    );
    expect(screen.getByTestId('deleteButton')).toBeInTheDocument();
  });

  it('should delete the task and call refetch', async () => {
    render(
      <MockedProvider mocks={deleteTaskMutationMock} addTypename={false}>
        <DeleteButton id="1" refetch={refetch} />
      </MockedProvider>,
    );

    await userEvent.click(screen.getByTestId('deleteButton'));
    await waitFor(() => expect(refetch).toHaveBeenCalled());
  });
  it('should show the loading spinner', async () => {
    render(
      <MockedProvider mocks={deleteTaskMutationMock} addTypename={false}>
        <DeleteButton id="1" refetch={refetch} />
      </MockedProvider>,
    );

    await userEvent.click(screen.getByTestId('deleteButton'));
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
  it('should not call the api if the id is not provided', async () => {
    render(
      <MockedProvider mocks={deleteTaskMutationMock} addTypename={false}>
        <DeleteButton refetch={refetch} />
      </MockedProvider>,
    );

    await userEvent.click(screen.getByTestId('deleteButton'));
    expect(refetch).not.toHaveBeenCalled();
  });
  it('should show an error message if the api fails', async () => {
    render(
      <MockedProvider mocks={deleteTaskMutationErrorMock} addTypename={false}>
        <ChakraProvider>
          <DeleteButton id="1" refetch={refetch} />
        </ChakraProvider>
      </MockedProvider>,
    );

    await userEvent.click(screen.getByTestId('deleteButton'));
    expect(await screen.findByText('Error: Api error')).toBeInTheDocument();
  });
});
