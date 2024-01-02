import {gql} from '@apollo/client';

export const LOG_IN_MUTATION = gql(`
    mutation GenerateAccessToken($apiKey: String!, $userName: String!) {
      generateAccessToken(apiKey: $apiKey, userName: $userName)
    }
  `);

export const CREATE_TASK_MUTATION = gql(`
    mutation CreateTask($name: String!, $note: String!, $isDone: Boolean!) {
      createTask(name: $name, note: $note, isDone: $isDone) {
          id
          name
          note
          isDone
      }
    }
  `);

export const UPDATE_TASK_MUTATION = gql(`
    mutation UpdateTaskStatus($id: String!,$isDone: Boolean!) {
      updateTaskStatus(id: $id, isDone: $isDone) {
          id
          isDone
      }
    }
  `);

export const DELETE_TASK_MUTATION = gql(`
    mutation DeleteTask($id: String!) {
      deleteTask(id: $id)
    }
  `);
