export interface Goal {
    id: number;
    name: string;
    description: string;
}

export interface CreateGoalData {
    id: number;
    name: string;
    description: string
}

export interface UpdateGoalData {
    id?: number;
    name?: string;
    description?: string;
}