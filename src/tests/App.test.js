// App.tsx unit tests

import React from 'react';
import {render, screen} from '@testing-library/react';
import {MockedProvider} from '@apollo/client/testing';
import {loginMutationMock, getAllTasksQueryMock} from './mocks/mocks';
import App from '../App';

describe('App', () => {
  it('renders the Login component if the user is not logged in', () => {
    render(
      <MockedProvider mocks={loginMutationMock} addTypename={false}>
        <App />
      </MockedProvider>,
    );
    expect(screen.getByText('UserName')).toBeInTheDocument();
    expect(screen.getByText('Enter your username')).toBeInTheDocument();
  });
  it('renders the Tasks component if the user is logged in', () => {
    window.localStorage.setItem('token', 'test');
    render(
      <MockedProvider mocks={getAllTasksQueryMock} addTypename={false}>
        <App />
      </MockedProvider>,
    );
    expect(screen.getByText('Add your tasks')).toBeInTheDocument();
    expect(screen.getByText('LOGOUT')).toBeInTheDocument();
  });
});
