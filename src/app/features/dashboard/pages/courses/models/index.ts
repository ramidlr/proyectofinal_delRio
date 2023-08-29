export interface Course {
    id: number;
    name: string;
    description: string;
    credits: number;
    price: number;
}

export interface CreateCourseData {
    name: string | null;
    description: string | null;
    credits: number | null;
    price: number | null;
}

export interface UpdateCourseData {
    id?: number;
    name?: string;
    description?: string;
    credits?: number;
    price?: number;
}

