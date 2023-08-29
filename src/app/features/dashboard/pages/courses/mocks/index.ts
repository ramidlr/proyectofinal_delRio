import { Course } from "../models";

export const COURSES_MOCK: Course[] = [
  {
    id: 1,
    name: 'Angular',
    description: 'Angular de cero a experto: Online On-Demand',
    credits: 40,
    price: 120
  }, {
    id: 2,
    name: 'React',
    description: 'React Experto: En Vivo',
    credits: 43,
    price: 250
  }, {
    id: 3,
    name: 'Full-Stack Developer 2023',
    description: 'Curso completo de Angular, React, HTML, CSS y proyecto final en empresa',
    credits: 60,
    price: 1900
  },
  {
    id: 4,
    name: 'UX-UI',
    description: 'Diseno UX - UI: Full-Time Intensivo',
    credits: 40,
    price: 300
  },
]