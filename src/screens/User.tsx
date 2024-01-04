import React, {type PropsWithChildren} from 'react';
import {Container} from '@chakra-ui/react';

const User = ({children}: PropsWithChildren): JSX.Element => {
  return (
    <Container
      maxW="800px"
      minHeight="100vh"
      justifyContent="start"
      centerContent
      display="flex"
      flexDirection="column"
      gap={20}>
      {children}
    </Container>
  );
};

export default User;
