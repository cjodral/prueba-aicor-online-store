import { useEffect } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

type DashboardProps = {
  token?: string;
  user?: {
    id: number;
    name: string;
    email: string;
    google_id?: string;
  };
};

export default function Dashboard({ token, user }: DashboardProps) {
  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      // También puedes configurar axios o fetch con este token aquí
    }
  }, [token]);

  return (
    <AppLayout>
      <Head title="Dashboard" />
      <div className="p-4">
        <h1 className="text-2xl font-bold">Bienvenido, {user?.name}</h1>
        <p>Email: {user?.email}</p>
        <p>Google ID: {user?.google_id || 'No disponible'}</p>
      </div>
    </AppLayout>
  );
}
