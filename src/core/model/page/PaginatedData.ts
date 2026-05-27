import { Pageable } from './Pageable';

/* TData es un genérico de TS. Permite que esta clase sea reutilizable con cualquier tipo de contenido. */
export interface PaginatedData <TData> { 
    content: TData[];
    pageable: Pageable;
    totalElements: number;
}