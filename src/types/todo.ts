export type TTodo = {
    id: number;
    title: string;
    description: string;
    status: 'todo' | 'in_progress' | 'done' | 'all'
    createdAt: string;
}

export type TData = {
    title: string;
    description: string;
}

export type TStatus = 'all' | 'todo' | 'in_progress' | 'done'

export type TChangeStatus = 'todo' | 'in_progress' | 'done'
