export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
  };
}

export interface ApiError {
  message: string;
  details?: {
    field: string;
    message: string;
  }[];
}

export interface QueryParams {
  page?: number;
  limit?: number;
  category?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
}
