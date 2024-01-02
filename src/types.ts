import {type SetStateAction} from 'react';
import {type AllTasksQuery} from './graphql/types';

export interface LoginFormValues {
  userName: string;
}

export interface TaskFormValues {
  name: string;
  note: string;
  isDone: boolean;
}

export interface LoginProps {
  setIsLoggedIn: React.Dispatch<SetStateAction<boolean>>;
}

export interface Task {
  id: string;
  name: string;
  note?: string;
  isDone: boolean;
}

export interface TasksTableProps {
  tasks: AllTasksQuery | undefined;
  loading: boolean;
  refetch: () => void;
}

export interface HandleUpdateArgs {
  id: string | undefined;
  isDone: boolean | undefined;
}

export interface UpdateStatusButtonProps extends HandleUpdateArgs {
  refetch: () => void;
}

export interface DeleteButtonProps {
  id: string | undefined;
  refetch: () => void;
}

export interface AddTaskProps {
  refetch: () => void;
}
