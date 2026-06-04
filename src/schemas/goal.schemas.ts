import { z } from 'zod';

export const goalSchema = z.object({
  title: z.string().min(1, 'El título es requerido'),
  description: z.string().optional(),
  target_amount: z.coerce.number().positive('El monto objetivo debe ser positivo'),
  current_amount: z.coerce.number().min(0, 'El monto actual no puede ser negativo').optional(),
  deadline: z.string().min(1, 'La fecha límite es requerida'),
  status: z.enum(['active', 'completed']).optional(),
});

export type GoalFormData = z.infer<typeof goalSchema>;
