import { z } from 'zod';

export const expenseSchema = z.object({
  category: z.string().min(1, 'La categoría es requerida'),
  description: z.string().optional(),
  amount: z.coerce.number().positive('El monto debe ser un número positivo'),
  date: z.string().min(1, 'La fecha es requerida'),
  payment_method: z.string().optional(),
});

export type ExpenseFormData = z.infer<typeof expenseSchema>;
