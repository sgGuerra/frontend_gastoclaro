import Link from 'next/link';
import { EmptyState } from '../src/components/ui/EmptyState';
import { Button } from '../src/components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <EmptyState
        icon="sentiment_dissatisfied"
        title="404 - Página no encontrada"
        message="Lo sentimos, la página que estás buscando no existe o ha sido movida."
        action={
          <Link href="/">
            <Button leftIcon="home">Volver al inicio</Button>
          </Link>
        }
      />
    </div>
  );
}
