import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export enum CacheControlScope {
  Private = 'PRIVATE',
  Public = 'PUBLIC'
}

export type Mutation = {
  __typename?: 'Mutation';
  /**
   * Creates a new task. Returns newly created task.
   * Default value for parameter "isDone" is false. Default value for "note" is null.
   */
  createTask?: Maybe<Task>;
  /**
   * Deletes task identified by "id".
   * Returns true if the task was deleted. Returns false if there was no task for a given id.
   */
  deleteTask?: Maybe<Scalars['Boolean']['output']>;
  /**
   * For a given apiKey and a username, generates accessToken.
   * All queries and mutations except generateAccessToken require HTTP header Authorization with accessToken as the value.
   */
  generateAccessToken?: Maybe<Scalars['String']['output']>;
  /**
   * Updates value of the flag "isDone" for task identified by "id".
   * Returns Task after update.
   */
  updateTaskStatus?: Maybe<Task>;
};


export type MutationCreateTaskArgs = {
  isDone?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  note?: InputMaybe<Scalars['String']['input']>;
};


export type MutationDeleteTaskArgs = {
  id: Scalars['String']['input'];
};


export type MutationGenerateAccessTokenArgs = {
  apiKey: Scalars['String']['input'];
  userName: Scalars['String']['input'];
};


export type MutationUpdateTaskStatusArgs = {
  id: Scalars['String']['input'];
  isDone: Scalars['Boolean']['input'];
};

export type Query = {
  __typename?: 'Query';
  /** Returns all tasks for a user identified by accessKey. Tasks are sorted by a creation timestamp. */
  allTasks?: Maybe<Array<Maybe<Task>>>;
};

/** A structure of a single task. */
export type Task = {
  __typename?: 'Task';
  id: Scalars['String']['output'];
  isDone: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  note?: Maybe<Scalars['String']['output']>;
};

export type GenerateAccessTokenMutationVariables = Exact<{
  apiKey: Scalars['String']['input'];
  userName: Scalars['String']['input'];
}>;


export type GenerateAccessTokenMutation = { __typename?: 'Mutation', generateAccessToken?: string | null };

export type CreateTaskMutationVariables = Exact<{
  name: Scalars['String']['input'];
  note: Scalars['String']['input'];
  isDone: Scalars['Boolean']['input'];
}>;


export type CreateTaskMutation = { __typename?: 'Mutation', createTask?: { __typename?: 'Task', id: string, name: string, note?: string | null, isDone: boolean } | null };

export type UpdateTaskStatusMutationVariables = Exact<{
  id: Scalars['String']['input'];
  isDone: Scalars['Boolean']['input'];
}>;


export type UpdateTaskStatusMutation = { __typename?: 'Mutation', updateTaskStatus?: { __typename?: 'Task', id: string, isDone: boolean } | null };

export type DeleteTaskMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteTaskMutation = { __typename?: 'Mutation', deleteTask?: boolean | null };

export type AllTasksQueryVariables = Exact<{ [key: string]: never; }>;


export type AllTasksQuery = { __typename?: 'Query', allTasks?: Array<{ __typename?: 'Task', id: string, name: string, note?: string | null, isDone: boolean } | null> | null };


export const GenerateAccessTokenDocument = gql`
    mutation GenerateAccessToken($apiKey: String!, $userName: String!) {
  generateAccessToken(apiKey: $apiKey, userName: $userName)
}
    `;
export type GenerateAccessTokenMutationFn = Apollo.MutationFunction<GenerateAccessTokenMutation, GenerateAccessTokenMutationVariables>;

/**
 * __useGenerateAccessTokenMutation__
 *
 * To run a mutation, you first call `useGenerateAccessTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGenerateAccessTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [generateAccessTokenMutation, { data, loading, error }] = useGenerateAccessTokenMutation({
 *   variables: {
 *      apiKey: // value for 'apiKey'
 *      userName: // value for 'userName'
 *   },
 * });
 */
export function useGenerateAccessTokenMutation(baseOptions?: Apollo.MutationHookOptions<GenerateAccessTokenMutation, GenerateAccessTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GenerateAccessTokenMutation, GenerateAccessTokenMutationVariables>(GenerateAccessTokenDocument, options);
      }
export type GenerateAccessTokenMutationHookResult = ReturnType<typeof useGenerateAccessTokenMutation>;
export type GenerateAccessTokenMutationResult = Apollo.MutationResult<GenerateAccessTokenMutation>;
export type GenerateAccessTokenMutationOptions = Apollo.BaseMutationOptions<GenerateAccessTokenMutation, GenerateAccessTokenMutationVariables>;
export const CreateTaskDocument = gql`
    mutation CreateTask($name: String!, $note: String!, $isDone: Boolean!) {
  createTask(name: $name, note: $note, isDone: $isDone) {
    id
    name
    note
    isDone
  }
}
    `;
export type CreateTaskMutationFn = Apollo.MutationFunction<CreateTaskMutation, CreateTaskMutationVariables>;

/**
 * __useCreateTaskMutation__
 *
 * To run a mutation, you first call `useCreateTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTaskMutation, { data, loading, error }] = useCreateTaskMutation({
 *   variables: {
 *      name: // value for 'name'
 *      note: // value for 'note'
 *      isDone: // value for 'isDone'
 *   },
 * });
 */
export function useCreateTaskMutation(baseOptions?: Apollo.MutationHookOptions<CreateTaskMutation, CreateTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTaskMutation, CreateTaskMutationVariables>(CreateTaskDocument, options);
      }
export type CreateTaskMutationHookResult = ReturnType<typeof useCreateTaskMutation>;
export type CreateTaskMutationResult = Apollo.MutationResult<CreateTaskMutation>;
export type CreateTaskMutationOptions = Apollo.BaseMutationOptions<CreateTaskMutation, CreateTaskMutationVariables>;
export const UpdateTaskStatusDocument = gql`
    mutation UpdateTaskStatus($id: String!, $isDone: Boolean!) {
  updateTaskStatus(id: $id, isDone: $isDone) {
    id
    isDone
  }
}
    `;
export type UpdateTaskStatusMutationFn = Apollo.MutationFunction<UpdateTaskStatusMutation, UpdateTaskStatusMutationVariables>;

/**
 * __useUpdateTaskStatusMutation__
 *
 * To run a mutation, you first call `useUpdateTaskStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTaskStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTaskStatusMutation, { data, loading, error }] = useUpdateTaskStatusMutation({
 *   variables: {
 *      id: // value for 'id'
 *      isDone: // value for 'isDone'
 *   },
 * });
 */
export function useUpdateTaskStatusMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTaskStatusMutation, UpdateTaskStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTaskStatusMutation, UpdateTaskStatusMutationVariables>(UpdateTaskStatusDocument, options);
      }
export type UpdateTaskStatusMutationHookResult = ReturnType<typeof useUpdateTaskStatusMutation>;
export type UpdateTaskStatusMutationResult = Apollo.MutationResult<UpdateTaskStatusMutation>;
export type UpdateTaskStatusMutationOptions = Apollo.BaseMutationOptions<UpdateTaskStatusMutation, UpdateTaskStatusMutationVariables>;
export const DeleteTaskDocument = gql`
    mutation DeleteTask($id: String!) {
  deleteTask(id: $id)
}
    `;
export type DeleteTaskMutationFn = Apollo.MutationFunction<DeleteTaskMutation, DeleteTaskMutationVariables>;

/**
 * __useDeleteTaskMutation__
 *
 * To run a mutation, you first call `useDeleteTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTaskMutation, { data, loading, error }] = useDeleteTaskMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteTaskMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTaskMutation, DeleteTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteTaskMutation, DeleteTaskMutationVariables>(DeleteTaskDocument, options);
      }
export type DeleteTaskMutationHookResult = ReturnType<typeof useDeleteTaskMutation>;
export type DeleteTaskMutationResult = Apollo.MutationResult<DeleteTaskMutation>;
export type DeleteTaskMutationOptions = Apollo.BaseMutationOptions<DeleteTaskMutation, DeleteTaskMutationVariables>;
export const AllTasksDocument = gql`
    query AllTasks {
  allTasks {
    id
    name
    note
    isDone
  }
}
    `;

/**
 * __useAllTasksQuery__
 *
 * To run a query within a React component, call `useAllTasksQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllTasksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllTasksQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllTasksQuery(baseOptions?: Apollo.QueryHookOptions<AllTasksQuery, AllTasksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllTasksQuery, AllTasksQueryVariables>(AllTasksDocument, options);
      }
export function useAllTasksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllTasksQuery, AllTasksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllTasksQuery, AllTasksQueryVariables>(AllTasksDocument, options);
        }
export function useAllTasksSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<AllTasksQuery, AllTasksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<AllTasksQuery, AllTasksQueryVariables>(AllTasksDocument, options);
        }
export type AllTasksQueryHookResult = ReturnType<typeof useAllTasksQuery>;
export type AllTasksLazyQueryHookResult = ReturnType<typeof useAllTasksLazyQuery>;
export type AllTasksSuspenseQueryHookResult = ReturnType<typeof useAllTasksSuspenseQuery>;
export type AllTasksQueryResult = Apollo.QueryResult<AllTasksQuery, AllTasksQueryVariables>;