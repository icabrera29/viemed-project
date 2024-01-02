import {gql} from '@apollo/client';

export const GET_TASKS_QUERY = gql(`
        query AllTasks {
          allTasks {
              id
              name
              note
              isDone
          }
    }
  `);
