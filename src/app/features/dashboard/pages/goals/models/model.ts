export interface Goal {
    id: number;
    name: string;
    studentComments: string;
}

export interface CreateGoalData {
    id: number;
    name: string;
    studentComments: string;
}

export interface UpdateGoalData {
    id?: number;
    name?: string;
    studentComments?: string;
}