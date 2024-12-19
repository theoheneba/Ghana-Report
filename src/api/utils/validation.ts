import { z } from 'zod';
import type { Report } from '../schemas/report';

export function validateReport(data: unknown): { valid: boolean; errors?: string[] } {
  try {
    const report = data as Report;
    const errors: string[] = [];

    if (!report.title?.trim()) {
      errors.push('Title is required');
    }

    if (!report.description?.trim()) {
      errors.push('Description is required');
    }

    if (!report.date) {
      errors.push('Date is required');
    }

    if (!report.location?.trim()) {
      errors.push('Location is required');
    }

    return {
      valid: errors.length === 0,
      errors: errors.length > 0 ? errors : undefined
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        valid: false,
        errors: error.errors.map(e => e.message)
      };
    }
    return {
      valid: false,
      errors: ['Invalid report data']
    };
  }
}