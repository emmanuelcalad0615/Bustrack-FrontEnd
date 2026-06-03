import { RequireAuth } from '../../presentation/guards/RequireAuth';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <RequireAuth>{children}</RequireAuth>;
}
