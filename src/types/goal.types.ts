export interface Goal {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  target_amount: number;
  current_amount: number;
  deadline: string;
  status: 'active' | 'completed';
  created_at: string;
  updated_at: string;
}

export interface CreateGoalDto {
  title: string;
  description?: string;
  target_amount: number;
  current_amount?: number;
  deadline: string;
  status?: 'active' | 'completed';
}

export interface UpdateGoalDto extends Partial<CreateGoalDto> {}
