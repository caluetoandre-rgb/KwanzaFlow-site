import { Article } from '../../types';
import { article1 } from './article1';
import { article2 } from './article2';
import { article3 } from './article3';
import { article4 } from './article4';
import { article5 } from './article5';
import { article6 } from './article6';
import { article7 } from './article7';
import { article8 } from './article8';
import { article9 } from './article9';
import { article10 } from './article10';
import { article11 } from './article11';
import { article12 } from './article12';
import { article13 } from './article13';
import { article14 } from './article14';
import { article15 } from './article15';
import { article16 } from './article16';
import { article17 } from './article17';
import { article18 } from './article18';
import { article19 } from './article19';
import { article20 } from './article20';

export const allArticles: Article[] = [
  article1,
  article2,
  article3,
  article4,
  article5,
  article6,
  article7,
  article8,
  article9,
  article10,
  article11,
  article12,
  article13,
  article14,
  article15,
  article16,
  article17,
  article18,
  article19,
  article20,
];

export function getArticleBySlug(slug: string): Article | undefined {
  return allArticles.find(
    (a) => a.slug === slug || a.id === slug || a.slug.replace(/-\w+$/, '') === slug
  );
}

export function getRelatedArticles(currentId: string, limit = 3): Article[] {
  return allArticles.filter((a) => a.id !== currentId).slice(0, limit);
}

export {
  article1,
  article2,
  article3,
  article4,
  article5,
  article6,
  article7,
  article8,
  article9,
  article10,
  article11,
  article12,
  article13,
  article14,
  article15,
  article16,
  article17,
  article18,
  article19,
  article20,
};

