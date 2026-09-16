export type ActiveTab = 'inicio' | 'recursos' | 'kixikila' | 'comosurgiu' | 'sobre-nos' | 'artigos' | 'privacidade' | 'termos' | 'eliminar-conta';

export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  readTime: string;
  wordCount: number;
  datePublished: string;
  authorTitle?: string;
  summary: string;
  tags: string[];
  keyTakeaways: string[];
  sections: {
    heading: string;
    subheading?: string;
    paragraphs: string[];
    callout?: {
      type: 'tip' | 'warning' | 'formula' | 'quote';
      title: string;
      content: string;
    };
    table?: {
      headers: string[];
      rows: string[][];
    };
  }[];
  practicalChecklist: string[];
  faqs: {
    question: string;
    answer: string;
  }[];
  references: string[];
}

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
