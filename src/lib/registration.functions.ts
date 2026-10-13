import { createServerFn } from '@tanstack/react-start';
import { registrationSchema } from './registration-schema';

export const submitRegistration = createServerFn({ method: 'POST' })
  .inputValidator((input: unknown) => registrationSchema.parse(input))
  .handler(async ({ data }) => {
    // Validation only - data will be sent via WhatsApp
    // No database storage needed since all info goes directly to WhatsApp
    return { saved: true };
  });