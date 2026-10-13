import { z } from 'zod';

const text = (max: number) => z.string().trim().min(1, 'This field is required.').max(max, `Please use ${max} characters or fewer.`).refine(value => !/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/.test(value), 'Please remove invalid characters.');
export const registrationSchema = z.object({
  name: text(100), surname: text(100),
  dob: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Enter your date of birth.').refine(value => { const d = new Date(`${value}T00:00:00Z`); return Number.isFinite(d.getTime()) && d.toISOString().slice(0,10) === value && d <= new Date() && d.getUTCFullYear() >= 1900; }, 'Enter a valid date of birth in the past.'),
  email: z.string().trim().email('Enter a valid email address.').max(255),
  address: text(500),
  phone: z.string().trim().min(7, 'Enter a valid phone number.').max(25).regex(/^\+?[\d\s()-]+$/, 'Enter a valid phone number.').refine(v => v.replace(/\D/g, '').length >= 7, 'Enter a valid phone number.'),
  church_name: text(200), gifting: text(200), reason: text(2000),
});
export type Registration = z.infer<typeof registrationSchema>;

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
function prettyDate(iso: string) {
  const [year, month, day] = iso.split('-').map(Number);
  const label = month && day ? MONTHS[month - 1] : undefined;
  return label ? `${day} ${label} ${year}` : iso;
}

export function whatsappUrl(input: Registration) {
  const data = registrationSchema.parse(input);
  const message = [
    '*Ruach Apostolic & Prophetic Training School*',
    '_Where Eagles shall Sow Prophetic School_',
    '',
    '*Personal*',
    `Name: ${data.name} ${data.surname}`,
    `Date of birth: ${prettyDate(data.dob)}`,
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