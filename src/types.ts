export type ActiveTab = 'inicio' | 'recursos' | 'kixikila' | 'privacidade' | 'termos' | 'eliminar-conta';

export interface DeletionRequest {
  id: string;
  email: string;
  reason: string;
  notes?: string;
  date: string;
  status: 'processado' | 'pendente' | 'concluido';
  estimatedPurgeDate: string;
  verifiedAt?: string;
  adminNotifiedEmail?: string;
}

export interface KixikilaSimulation {
  members: number;
  monthlyQuota: number;
  totalCycleMonths: number;
  totalPerTurn: number;
}
