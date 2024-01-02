import React from 'react';
import {
  FormLabel,
  FormControl,
  Input,
  Button,
  Checkbox,
  FormErrorMessage,
  VStack,
  useToast,
} from '@chakra-ui/react';

import {Field, Form, Formik} from 'formik';

import {type FieldInputProps, type FormikProps} from 'formik/dist/types';
import {type TaskFormValues, type AddTaskProps} from '../types';

import {useCreateTaskMutation} from '../graphql/types';

const AddTask: React.FC<AddTaskProps> = ({refetch}) => {
  const toast = useToast();
  const initialValues: TaskFormValues = {name: '', note: '', isDone: false};

  const [addTask, {loading}] = useCreateTaskMutation();

  const validateName = (value: string): string | undefined => {
    let error;
    if (value === '') {
      error = 'Name is required';
    }
    return error;
  };

  const handleSubmit = async (values: TaskFormValues): Promise<void> => {
    try {
      await addTask({
        variables: {
          name: values.name,
          note: values.note,
          isDone: values.isDone,
        },
      });
      refetch();
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
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {() => (
        <Form className="taskForm">
          <VStack spacing={2} align="flex-start">
            <Field name="name" validate={validateName}>
              {({
                field,
                form,
              }: {
                field: FieldInputProps<string>;
                form: FormikProps<TaskFormValues>;
              }) => (
                <FormControl isInvalid={!!form.errors.name && form.touched.name}>
                  <FormLabel htmlFor="name">Name</FormLabel>
                  <Input {...field} type="text" placeholder="name" data-testid="name" />
                  <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="note">
              {({
                field,
                form,
              }: {
                field: FieldInputProps<string>;
                form: FormikProps<TaskFormValues>;
              }) => (
                <FormControl marginBottom={3}>
                  <FormLabel htmlFor="note">Note</FormLabel>
                  <Input {...field} type="text" placeholder="note" data-testid="note" />
                </FormControl>
              )}
            </Field>
            <Field as={Checkbox} name="isDone">
              Is done?
            </Field>

            <Button mt={4} colorScheme="teal" type="submit" isLoading={loading}>
              Submit
            </Button>
          </VStack>
        </Form>
      )}
    </Formik>
  );
};

export default AddTask;
