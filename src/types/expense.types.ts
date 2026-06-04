export interface Expense {
  id: string;
  user_id: string;
  category: string;
  description?: string;
  amount: number;
  date: string;
  payment_method?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateExpenseDto {
  category: string;
  description?: string;
  amount: number;
  date: string;
  payment_method?: string;
}

export interface UpdateExpenseDto extends Partial<CreateExpenseDto> {}
