/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/await-thenable */

import React from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {MockedProvider} from '@apollo/client/testing';
import {ChakraProvider} from '@chakra-ui/react';
import UpdateStatusButton from '../components/UpdateStatusButton';
import {updateTaskMutationMock, updateTaskMutationErrorMock} from './mocks/mocks';

describe('UpdateStatusButton', () => {
  const refetch = jest.fn();
  it('should render the UpdateStatusButton component', async () => {
    render(
      <MockedProvider mocks={updateTaskMutationMock} addTypename={false}>
        <UpdateStatusButton />
      </MockedProvider>,
    );
    expect(screen.getByTestId('updateStatusButton')).toBeInTheDocument();
  });
  it('should call refetch after the data is submitted', async () => {
    render(
      <MockedProvider mocks={updateTaskMutationMock} addTypename={false}>
        <UpdateStatusButton id="test1" isDone={false} refetch={refetch} />
      </MockedProvider>,
    );

    await userEvent.click(screen.getByTestId('updateStatusButton'));
    await waitFor(() => {
      expect(refetch).toHaveBeenCalled();
    });
  });
  it('should not call refetch or the mutation if the id is not provided', async () => {
    render(
      <MockedProvider mocks={updateTaskMutationMock} addTypename={false}>
        <UpdateStatusButton isDone={false} refetch={refetch} />
      </MockedProvider>,
    );

    await userEvent.click(screen.getByTestId('updateStatusButton'));
    expect(refetch).not.toHaveBeenCalled();
  });
  it('should show an error message if the api fails', async () => {
    render(
      <MockedProvider mocks={updateTaskMutationErrorMock} addTypename={false}>
        <ChakraProvider>
          <UpdateStatusButton id="test1" isDone={false} refetch={refetch} />
        </ChakraProvider>
      </MockedProvider>,
    );

    await userEvent.click(screen.getByTestId('updateStatusButton'));
    expect(await screen.findByText('Error: Update error')).toBeInTheDocument();
  });
});
