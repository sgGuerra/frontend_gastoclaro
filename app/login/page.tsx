"use client";

import React, { useState } from 'react';
import { loginSchema, LoginFormData } from '../../src/schemas/auth.schemas';
import { useAuth } from '../../src/hooks/useAuth';
import { useToast } from '../../src/hooks/useToast';
import { Input } from '../../src/components/ui/Input';
import { Button } from '../../src/components/ui/Button';
import { GlassCard } from '../../src/components/ui/GlassCard';
import { AuthLayout } from '../../src/components/layout/AuthLayout';
import { PublicRoute } from '../../src/components/auth/PublicRoute';
import Link from 'next/link';

export default function LoginPage() {
  const { login } = useAuth();
  const { showToast } = useToast();
  
  const [formData, setFormData] = useState<LoginFormData>({ email: '', password: '' });
  const [errors, setErrors] = useState<Partial<Record<keyof LoginFormData, string>>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error on type
    if (errors[name as keyof LoginFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate
    const result = loginSchema.safeParse(formData);
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
      await login(formData);
      showToast('Sesión iniciada con éxito', 'success');
      // Redirect is handled by PublicRoute or useAuth
    } catch (error: any) {
      showToast(error.message || 'Credenciales inválidas', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PublicRoute>
      <AuthLayout>
        <GlassCard className="p-8 md:p-12 shadow-xl auth-transition animate-in fade-in slide-in-from-bottom-8">
          <div className="md:hidden flex items-center justify-center space-x-2 mb-8">
            <span className="material-symbols-outlined text-primary text-3xl font-variation-fill">account_balance_wallet</span>
            <span className="font-title-md text-title-md font-bold text-primary">GastoClaro</span>
          </div>

          <div className="mb-8">
            <h2 className="font-headline-lg text-headline-lg text-on-surface">Bienvenido de nuevo</h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-2">Ingresa tus credenciales para continuar.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              name="email"
              type="email"
              label="Correo Electrónico"
              icon="mail"
              placeholder="nombre@ejemplo.com"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
            />

            <div className="space-y-1">
              <div className="flex justify-between items-center px-1">
                <label className="font-label-sm text-label-sm text-outline">Contraseña</label>
                <a href="#" className="font-label-sm text-label-sm text-primary hover:underline">¿Olvidaste tu contraseña?</a>
              </div>
              <Input
                name="password"
                type="password"
                icon="lock"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
              />
            </div>

            <Button type="submit" className="w-full" isLoading={isLoading} rightIcon="arrow_forward">
              Iniciar Sesión
            </Button>
          </form>

          <p className="mt-8 text-center font-body-md text-body-md text-on-surface-variant">
            ¿No tienes una cuenta?{' '}
            <Link href="/register" className="text-primary font-bold hover:underline">
              Regístrate gratis
            </Link>
          </p>
        </GlassCard>
      </AuthLayout>
    </PublicRoute>
  );
}
