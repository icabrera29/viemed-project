/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/await-thenable */

import React from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {MockedProvider} from '@apollo/client/testing';
import {ChakraProvider} from '@chakra-ui/react';
import AddTask from '../components/AddTask';
import {createTaskMutationMock, createTaskMutationErrorMock} from './mocks/mocks';

const refetch = jest.fn();

describe('AddTask', () => {
  it('should render the addTask component', async () => {
    render(
      <MockedProvider mocks={createTaskMutationMock} addTypename={false}>
        <AddTask />
      </MockedProvider>,
    );
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Note')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
    expect(screen.getByText('Is done?')).toBeInTheDocument();
  });
  it('Should throw an error if the name is not provided', async () => {
    render(
      <MockedProvider mocks={createTaskMutationMock} addTypename={false}>
        <AddTask />
      </MockedProvider>,
    );
    await userEvent.click(screen.getByText('Submit'));
    expect(await screen.findByText('Name is required')).toBeInTheDocument();
  });
  it('should call refetch after the data is submitted', async () => {
    render(
      <MockedProvider mocks={createTaskMutationMock} addTypename={false}>
        <AddTask refetch={refetch} />
      </MockedProvider>,
    );
    await userEvent.type(screen.getByTestId('name'), 'test');
    await userEvent.type(screen.getByTestId('note'), 'test');
    await userEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(refetch).toHaveBeenCalled();
    });
  });

  it('should throw an error if the api fails', async () => {
    render(
      <MockedProvider mocks={createTaskMutationErrorMock} addTypename={false}>
        <ChakraProvider>
          <AddTask refetch={refetch} />
        </ChakraProvider>
      </MockedProvider>,
    );
    await userEvent.type(screen.getByTestId('name'), 'test');
    await userEvent.type(screen.getByTestId('note'), 'test');
    await userEvent.click(screen.getByText('Submit'));

    expect(await screen.findByText('Error: Api error')).toBeInTheDocument();
  });
});
