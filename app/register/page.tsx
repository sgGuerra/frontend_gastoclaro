"use client";

import React, { useState } from 'react';
import { registerSchema, RegisterFormData } from '../../src/schemas/auth.schemas';
import { useAuth } from '../../src/hooks/useAuth';
import { useToast } from '../../src/hooks/useToast';
import { Input } from '../../src/components/ui/Input';
import { Button } from '../../src/components/ui/Button';
import { GlassCard } from '../../src/components/ui/GlassCard';
import { AuthLayout } from '../../src/components/layout/AuthLayout';
import { PublicRoute } from '../../src/components/auth/PublicRoute';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const { register } = useAuth();
  const { showToast } = useToast();
  const router = useRouter();
  
  const [formData, setFormData] = useState<RegisterFormData>({ 
    name: '', email: '', password: '', confirmPassword: '' 
  });
  const [errors, setErrors] = useState<Partial<Record<keyof RegisterFormData, string>>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof RegisterFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = registerSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: any = {};
      result.error.issues.forEach(issue => {
        fieldErrors[issue.path[0]] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsLoading(true);
    try {
      await register(formData);
      showToast('Cuenta creada exitosamente. Por favor inicia sesión.', 'success');
      router.push('/login');
    } catch (error: any) {
      showToast(error.message || 'Error al crear la cuenta', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // Simple password strength
  const getPasswordStrength = () => {
    const p = formData.password;
    if (p.length === 0) return 0;
    if (p.length < 6) return 1;
    if (p.length < 8) return 2;
    if (/[A-Z]/.test(p) && /[0-9]/.test(p)) return 4;
    return 3;
  };
  
  const strength = getPasswordStrength();

  return (
    <PublicRoute>
      <AuthLayout>
        <GlassCard className="p-8 md:p-12 shadow-xl auth-transition animate-in fade-in slide-in-from-bottom-8">
          <div className="mb-8">
            <Link href="/login" className="flex items-center text-primary font-label-sm text-label-sm mb-4 hover:translate-x-[-4px] transition-transform w-fit">
              <span className="material-symbols-outlined text-sm mr-1">arrow_back</span> Volver al inicio
            </Link>
            <h2 className="font-headline-lg text-headline-lg text-on-surface">Crea tu cuenta</h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-2">Empieza a gestionar tu dinero hoy mismo.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              name="name"
              label="Nombre completo"
              placeholder="Ej. Ana Pérez"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
            />

            <Input
              name="email"
              type="email"
              label="Correo Electrónico"
              placeholder="ana@ejemplo.com"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
            />

            <div className="space-y-1">
              <Input
                name="password"
                type="password"
                label="Contraseña"
                placeholder="Mínimo 8 caracteres"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
              />
              <div className="flex space-x-1 mt-2 px-1">
                {[1, 2, 3, 4].map((level) => (
                  <div 
                    key={level} 
                    className={`h-1 flex-1 rounded-full transition-colors ${
                      strength >= level ? (strength > 2 ? 'bg-savings-emerald' : 'bg-primary') : 'bg-surface-variant'
                    }`} 
                  />
                ))}
              </div>
            </div>

            <Input
              name="confirmPassword"
              type="password"
              label="Confirmar Contraseña"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
            />

            <div className="pt-4">
              <Button type="submit" className="w-full" isLoading={isLoading}>
                Crear cuenta
              </Button>
            </div>
            
            <p className="text-[12px] text-center text-outline px-4">
              Al registrarte, aceptas nuestros <a href="#" className="text-primary hover:underline">Términos de Servicio</a> y <a href="#" className="text-primary hover:underline">Política de Privacidad</a>.
            </p>
          </form>
          
          <p className="mt-8 text-center font-body-md text-body-md text-on-surface-variant">
            ¿Ya tienes una cuenta?{' '}
            <Link href="/login" className="text-primary font-bold hover:underline">
              Inicia sesión
            </Link>
          </p>
        </GlassCard>
      </AuthLayout>
    </PublicRoute>
  );
}
