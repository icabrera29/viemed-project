import React, {type PropsWithChildren} from 'react';
import {Container} from '@chakra-ui/react';

const Auth = ({children}: PropsWithChildren): JSX.Element => {
  return (
    <Container
      maxW="800px"
      minHeight="100vh"
      justifyContent="center"
      centerContent
      display="flex"
      flexDirection="column">
      {children}
    </Container>
  );
};

export default Auth;
