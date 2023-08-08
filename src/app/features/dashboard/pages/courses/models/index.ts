export interface Course {
    id: number;
    name: string;
    description: string;
    credits: number;
    price: number;
}

export interface CreateCourseData {
    id: number;
    name: string;
    description: string;
    credits: number;
    price: number;
}

export interface UpdateCourseData {
    id?: number;
    name?: string;
    description?: string;
    credits?: number;
    price?: number;
}