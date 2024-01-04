import React from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
  FormHelperText,
  FormErrorMessage,
  useToast,
} from '@chakra-ui/react';

import {Field, Form, Formik} from 'formik';
import {useNavigate, useLocation} from 'react-router-dom';
import {type LoginFormValues} from '../types';
import {type FieldInputProps, type FormikProps} from 'formik/dist/types';
import {useGenerateAccessTokenMutation} from '../graphql/types';

const Login = (): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();
  const apiKey = process.env.REACT_APP_API_KEY ?? '';

  const initialValues: LoginFormValues = {userName: ''};

  const [login, {loading}] = useGenerateAccessTokenMutation();

  const validateUserName = (value: string): string | undefined => {
    let error;
    if (value === '') {
      error = 'Username is required';
    }
    return error;
  };

  const handleSubmit = async (values: LoginFormValues): Promise<void> => {
    try {
      const data = await login({variables: {apiKey, userName: values.userName}});
      const token = data?.data?.generateAccessToken;

      localStorage.setItem('token', token ?? '');
      const from: string = location.state?.from?.pathname || '/';
      navigate(from, {replace: true});
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
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      justifyContent="center"
      padding="40px"
      display="flex"
      boxShadow="lg">
      <Formik onSubmit={handleSubmit} initialValues={initialValues}>
        {() => (
          <Form>
            <Field name="userName" validate={validateUserName}>
              {({
                field,
                form,
              }: {
                field: FieldInputProps<string>;
                form: FormikProps<LoginFormValues>;
              }) => (
                <FormControl isInvalid={!!form.errors.userName}>
                  <FormLabel>UserName</FormLabel>
                  <Input {...field} type="text" placeholder="Username" data-testid="userName" />
                  {form.errors.userName ? (
                    <FormErrorMessage>{form.errors.userName}</FormErrorMessage>
                  ) : (
                    <FormHelperText>Enter your username</FormHelperText>
                  )}
                </FormControl>
              )}
            </Field>

            <Button mt={4} colorScheme="teal" type="submit" isLoading={loading}>
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default Login;
