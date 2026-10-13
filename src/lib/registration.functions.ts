import { createServerFn } from '@tanstack/react-start';
import { registrationSchema } from './registration-schema';

export const submitRegistration = createServerFn({ method: 'POST' })
  .inputValidator((input: unknown) => registrationSchema.parse(input))
  .handler(async ({ data }) => {
    // Public, insert-only operation: never exposes existing registrations.
    const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
    const { error } = await supabaseAdmin.from('course_registrations').insert(data);
    if (error) throw new Error('Your registration could not be saved. Please try again.');
    return { saved: true };
  });