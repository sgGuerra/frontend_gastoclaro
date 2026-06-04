import { z } from 'zod';

export const debtSchema = z.object({
  creditor: z.string().min(1, 'El acreedor es requerido'),
  amount: z.coerce.number().positive('El monto debe ser positivo'),
  interest_rate: z.coerce.number().min(0, 'La tasa no puede ser negativa').optional(),
  monthly_payment: z.coerce.number().positive('El pago mensual debe ser positivo').optional(),
  due_date: z.string().optional(),
  status: z.enum(['active', 'paid']).optional(),
});

export type DebtFormData = z.infer<typeof debtSchema>;
