CREATE TABLE public.course_registrations (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 created_at timestamptz NOT NULL DEFAULT now(),
 name text NOT NULL CHECK (char_length(name) BETWEEN 1 AND 100),
 surname text NOT NULL CHECK (char_length(surname) BETWEEN 1 AND 100),
 dob date NOT NULL,
 email text NOT NULL CHECK (char_length(email) <= 255),
 address text NOT NULL CHECK (char_length(address) BETWEEN 1 AND 500),
 phone text NOT NULL CHECK (char_length(phone) BETWEEN 7 AND 25),
 church_name text NOT NULL CHECK (char_length(church_name) BETWEEN 1 AND 200),
 gifting text NOT NULL CHECK (char_length(gifting) BETWEEN 1 AND 200),
 reason text NOT NULL CHECK (char_length(reason) BETWEEN 1 AND 2000)
);
GRANT ALL ON public.course_registrations TO service_role;
ALTER TABLE public.course_registrations ENABLE ROW LEVEL SECURITY;