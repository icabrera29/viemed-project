import React from 'react';
import {render, screen} from '@testing-library/react';
import TasksTable from '../components/TasksTable';
import {MockedProvider} from '@apollo/client/testing';
import {tasksMock} from './mocks/mocks';

describe('Login', () => {
  it('Should render correctly', async () => {
    render(<TasksTable />);

    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Note')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
    expect(screen.getByText('Remove')).toBeInTheDocument();
  });
  it('Should render the tasks', async () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <TasksTable tasks={tasksMock} />
      </MockedProvider>,
    );

    expect(screen.getByText('test1')).toBeInTheDocument();
    expect(screen.getByText('test2')).toBeInTheDocument();
  });
  it('Should render the loading component', async () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <TasksTable tasks={tasksMock} loading={true} />
      </MockedProvider>,
    );

    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });
});
