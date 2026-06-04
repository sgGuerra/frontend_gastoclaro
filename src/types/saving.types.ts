export interface Saving {
  id: string;
  user_id: string;
  name: string;
  amount: number;
  source?: string;
  date: string;
  created_at: string;
  updated_at: string;
}

export interface CreateSavingDto {
  name: string;
  amount: number;
  source?: string;
  date: string;
}

export interface UpdateSavingDto extends Partial<CreateSavingDto> {}
