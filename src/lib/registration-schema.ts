import { z } from 'zod';

const text = (max: number) => z.string().trim().min(1, 'This field is required.').max(max, `Please use ${max} characters or fewer.`).refine(value => !/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/.test(value), 'Please remove invalid characters.');
export const registrationSchema = z.object({
  name: text(100), surname: text(100),
  age: z.string().trim().min(1, 'Enter your age.').max(3, 'Please enter a valid age.').regex(/^\d+$/, 'Enter a valid age as a number.').refine(v => { const n = Number(v); return Number.isInteger(n) && n >= 1 && n <= 120; }, 'Enter a valid age between 1 and 120.'),
  email: z.string().trim().email('Enter a valid email address.').max(255),
  address: text(500),
  phone: z.string().trim().min(7, 'Enter a valid phone number.').max(25).regex(/^\+?[\d\s()-]+$/, 'Enter a valid phone number.').refine(v => v.replace(/\D/g, '').length >= 7, 'Enter a valid phone number.'),
  church_name: text(200), gifting: text(200), reason: text(2000),
});
export type Registration = z.infer<typeof registrationSchema>;

export function whatsappUrl(input: Registration) {
  const data = registrationSchema.parse(input);
  const message = [
    '*Ruach Apostolic & Prophetic Training School*',
    '_Where Eagles shall Sow Prophetic School_',
    '',
    '*Personal*',
    `Name: ${data.name} ${data.surname}`,
    `Age: ${data.age}`,
    '',
    '*Contact*',
    `Phone: ${data.phone}`,
    `Email: ${data.email}`,
    `Address: ${data.address}`,
    '',
    '*Church & calling*',
    `Church: ${data.church_name}`,
    `Gifting: ${data.gifting}`,
    '',
    '*Reason for attending*',
    data.reason,
  ].join('\n');
  return `https://wa.me/27780296688?text=${encodeURIComponent(message)}`;
}