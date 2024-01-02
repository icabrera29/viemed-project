/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/await-thenable */
import React from 'react';
import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {MockedProvider} from '@apollo/client/testing';
import {ChakraProvider} from '@chakra-ui/react';
import Login from '../components/Login';
import {loginMutationMock, loginMutationErrorMock} from './mocks/mocks';

describe('Login', () => {
  const setIsLoggedIn = jest.fn();

  it('should render the login form', async () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <Login setIsLoggedIn={setIsLoggedIn} />
      </MockedProvider>,
    );

    expect(screen.getByText('UserName')).toBeInTheDocument();
    expect(screen.getByText('Enter your username')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  it('Should throw an error if the username is not provided', async () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <Login setIsLoggedIn={setIsLoggedIn} />
      </MockedProvider>,
    );

    await userEvent.click(screen.getByText('Submit'));
    expect(await screen.findByText('Username is required')).toBeInTheDocument();
  });

  it('setIsLoggedIn should be called if username is submitted', async () => {
    render(
      <MockedProvider mocks={loginMutationMock} addTypename={false}>
        <Login setIsLoggedIn={setIsLoggedIn} />
      </MockedProvider>,
    );

    await userEvent.type(screen.getByTestId('userName'), 'test');
    await fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(setIsLoggedIn).toHaveBeenCalled();
    });
  });

  it('Should throw an error if the api fails', async () => {
    render(
      <MockedProvider mocks={loginMutationErrorMock} addTypename={false}>
        <ChakraProvider>
          <Login setIsLoggedIn={setIsLoggedIn} />
        </ChakraProvider>
      </MockedProvider>,
    );

    await userEvent.type(screen.getByTestId('userName'), 'test');
    await userEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(screen.getByText('Error: Error!')).toBeInTheDocument();
    });
  });
});
