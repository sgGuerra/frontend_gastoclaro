import { z } from 'zod';

export const savingSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  amount: z.coerce.number().positive('El monto debe ser positivo'),
  source: z.string().optional(),
  date: z.string().min(1, 'La fecha es requerida'),
});

export type SavingFormData = z.infer<typeof savingSchema>;
