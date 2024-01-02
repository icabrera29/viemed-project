import {
  CREATE_TASK_MUTATION,
  DELETE_TASK_MUTATION,
  LOG_IN_MUTATION,
  UPDATE_TASK_MUTATION,
} from '../../graphql/mutations';
import {GET_TASKS_QUERY} from '../../graphql/queries';
import {GraphQLError} from 'graphql';

export const tasksMock = {
  allTasks: [
    {
      id: 'c575505b-9be5-4b83-9906-17390361fa48',
      name: 'test1',
      note: 'teastas',
      isDone: true,
    },
    {
      id: 'e539cd26-bf35-4ecf-9404-331b312129d3',
      name: 'test2',
      note: null,
      isDone: false,
    },
  ],
};

export const getAllTasksQueryMock = [
  {
    request: {
      query: GET_TASKS_QUERY,
    },
    result: {
      data: {
        ...tasksMock,
      },
    },
  },
];

export const loginMutationMock = [
  {
    request: {
      query: LOG_IN_MUTATION,
      variables: {
        apiKey: '',
        userName: 'test',
      },
    },
    result: {
      data: {
        generateAccessToken: 'testToken',
      },
    },
  },
];

export const loginMutationErrorMock = [
  {
    request: {
      query: LOG_IN_MUTATION,
      variables: {apiKey: '', userName: 'test'},
    },
    result: {
      errors: [new GraphQLError('Error!')],
    },
  },
];

export const createTaskMutationMock = [
  {
    request: {
      query: CREATE_TASK_MUTATION,
      variables: {
        name: 'test',
        note: 'test',
        isDone: false,
      },
    },
    result: {
      data: {
        createTask: {
          id: 'test',
          name: 'test',
          note: null,
          isDone: false,
        },
      },
    },
  },
];

export const createTaskMutationErrorMock = [
  {
    request: {
      query: CREATE_TASK_MUTATION,
      variables: {
        name: 'test',
        note: 'test',
        isDone: false,
      },
    },
    result: {
      errors: [new GraphQLError('Api error')],
    },
  },
];

export const deleteTaskMutationMock = [
  {
    request: {
      query: DELETE_TASK_MUTATION,
      variables: {
        id: '1',
      },
    },
    result: {
      data: {
        deleteTask: true,
      },
    },
  },
];

export const deleteTaskMutationErrorMock = [
  {
    request: {
      query: DELETE_TASK_MUTATION,
      variables: {
        id: '1',
      },
    },
    result: {
      errors: [new GraphQLError('Api error')],
    },
  },
];

export const updateTaskMutationMock = [
  {
    request: {
      query: UPDATE_TASK_MUTATION,
      variables: {
        id: 'test1',
        isDone: true,
      },
    },
    result: {
      data: {
        updateTaskStatus: {
          id: 'test1',
          name: 'test',
          note: 'teastas',
          isDone: true,
        },
      },
    },
  },
];

export const updateTaskMutationErrorMock = [
  {
    request: {
      query: UPDATE_TASK_MUTATION,
      variables: {
        id: 'test1',
        isDone: true,
      },
    },
    result: {
      errors: [new Error('Update error')],
    },
  },
];
