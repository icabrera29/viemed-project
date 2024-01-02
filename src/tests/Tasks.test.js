/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/await-thenable */
// Tasks.tsx unit tests
import React from 'react';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Tasks from '../components/Tasks';
import {MockedProvider} from '@apollo/client/testing';
import {getAllTasksQueryMock} from './mocks/mocks';

describe('Tasks', () => {
  delete window.location;
  window.location = {reload: jest.fn()};

  it('Should render correctly', async () => {
    render(
      <MockedProvider mocks={getAllTasksQueryMock} addTypename={false}>
        <Tasks />
      </MockedProvider>,
    );

    expect(screen.getByText('Add your tasks')).toBeInTheDocument();
    expect(screen.getByText('LOGOUT')).toBeInTheDocument();
    expect(await screen.findByTestId('tasksTable')).toBeInTheDocument();
  });

  it('Should clear the local storage', async () => {
    localStorage.setItem('token', 'test');
    render(
      <MockedProvider mocks={getAllTasksQueryMock} addTypename={false}>
        <Tasks />
      </MockedProvider>,
    );
    await userEvent.click(screen.getByText('LOGOUT'));
    expect(localStorage.getItem('token')).toBeNull();
  });
});
