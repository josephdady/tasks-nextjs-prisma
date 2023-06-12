export type User = {
  id: string;
  name: string;
  avatar: string | null;
};

export interface ITaskCard {
  id: string;
  createdAt: Date;
  title: string;
  status: Status;
  assignee: User;
}

export interface ITask {
  id?: string;
  createdAt?: string;
  title?: string;
  description?: string;
  status?: Status;
  relatedTo?: ITask[];
  assignee?: User;
  assigneeId?: string;
  viewers?: User[];
}
