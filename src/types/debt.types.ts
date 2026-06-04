export interface Debt {
  id: string;
  user_id: string;
  creditor: string;
  amount: number;
  interest_rate: number;
  monthly_payment?: number;
  due_date?: string;
  status: 'active' | 'paid';
  created_at: string;
  updated_at: string;
}

export interface CreateDebtDto {
  creditor: string;
  amount: number;
  interest_rate?: number;
  monthly_payment?: number;
  due_date?: string;
  status?: 'active' | 'paid';
}

export interface UpdateDebtDto extends Partial<CreateDebtDto> {}
