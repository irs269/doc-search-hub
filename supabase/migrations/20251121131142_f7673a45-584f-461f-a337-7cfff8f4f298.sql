-- Create specialties table
CREATE TABLE public.specialties (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  icon TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create diseases table
CREATE TABLE public.diseases (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  specialty_id UUID REFERENCES public.specialties(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create doctors table
CREATE TABLE public.doctors (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  photo TEXT,
  specialty_id UUID REFERENCES public.specialties(id) ON DELETE SET NULL NOT NULL,
  hospital TEXT NOT NULL,
  address TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create pharmacies table
CREATE TABLE public.pharmacies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  opening_hours TEXT,
  is_24h BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.specialties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.diseases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.doctors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pharmacies ENABLE ROW LEVEL SECURITY;

-- Create RLS policies (public read access for all tables)
CREATE POLICY "Anyone can view specialties"
  ON public.specialties FOR SELECT
  USING (true);

CREATE POLICY "Anyone can view diseases"
  ON public.diseases FOR SELECT
  USING (true);

CREATE POLICY "Anyone can view doctors"
  ON public.doctors FOR SELECT
  USING (true);

CREATE POLICY "Anyone can view pharmacies"
  ON public.pharmacies FOR SELECT
  USING (true);

-- Insert initial specialties data
INSERT INTO public.specialties (name, icon) VALUES
  ('Médecine Générale', '🩺'),
  ('Pédiatrie', '👶'),
  ('Cardiologie', '❤️'),
  ('Chirurgie', '🔪'),
  ('Dentiste', '🦷'),
  ('Dermatologie', '🧴'),
  ('Ophtalmologie', '👁️'),
  ('Gynécologie', '🤰'),
  ('ORL', '👂'),
  ('Neurologie', '🧠'),
  ('Endocrinologie', '💉');

-- Insert some initial doctors data based on the PDF
INSERT INTO public.doctors (first_name, last_name, specialty_id, hospital, address, phone_number, description)
SELECT 
  'NASSUR SAID',
  'SOIMIHI',
  (SELECT id FROM public.specialties WHERE name = 'Médecine Générale'),
  'Clinique Espace médical',
  'Moroni',
  '336.31.56 / 336.15.89',
  'Médecine générale et interne';

INSERT INTO public.doctors (first_name, last_name, specialty_id, hospital, address, phone_number, description)
SELECT 
  'DJABIR',
  'Ibrahim',
  (SELECT id FROM public.specialties WHERE name = 'Médecine Générale'),
  'Clinique idéal médical',
  'Moroni',
  '733.49.19 / 325.49.19',
  'Médecine générale et d''urgence';

INSERT INTO public.doctors (first_name, last_name, specialty_id, hospital, address, phone_number, description)
SELECT 
  'MOUSSA BEN',
  'IBRAHIM',
  (SELECT id FROM public.specialties WHERE name = 'Médecine Générale'),
  'Cabinet médical',
  'Moroni',
  '338.17.09',
  'Médecine générale et d''urgence';

INSERT INTO public.doctors (first_name, last_name, specialty_id, hospital, address, phone_number, description)
SELECT 
  'KAMAL',
  '',
  (SELECT id FROM public.specialties WHERE name = 'Endocrinologie'),
  'Amical clinique',
  'Moroni',
  '322.32.05 / 773.14.65',
  'Endocrinologie et diabétologie';

INSERT INTO public.doctors (first_name, last_name, specialty_id, hospital, address, phone_number, description)
SELECT 
  'DADA',
  'Fouad',
  (SELECT id FROM public.specialties WHERE name = 'Médecine Générale'),
  'Cabinet médical',
  'Moroni',
  '378.01.00',
  'Médecine générale';

INSERT INTO public.doctors (first_name, last_name, specialty_id, hospital, address, phone_number, description)
SELECT 
  'NADJWA',
  'ABASS',
  (SELECT id FROM public.specialties WHERE name = 'Pédiatrie'),
  'Cabinet médical Dr abbas cheikh',
  'Route corniche (à côté de rive gauche)',
  '337.11.48',
  'Pédiatrie';

INSERT INTO public.doctors (first_name, last_name, specialty_id, hospital, address, phone_number, description)
SELECT 
  'ISSLAME',
  'ABDALLAH',
  (SELECT id FROM public.specialties WHERE name = 'Pédiatrie'),
  'Cabinet médical',
  'Route câbles de Lyon',
  '773.18.08',
  'Pédiatrie';

INSERT INTO public.doctors (first_name, last_name, specialty_id, hospital, address, phone_number, description)
SELECT 
  'MYRIAM',
  'MOURCHID',
  (SELECT id FROM public.specialties WHERE name = 'Pédiatrie'),
  'Clinique Espace médical',
  'Moroni',
  '336.31.56 / 335.34.97',
  'Pédiatrie';

INSERT INTO public.doctors (first_name, last_name, specialty_id, hospital, address, phone_number, description)
SELECT 
  'YACINE',
  '',
  (SELECT id FROM public.specialties WHERE name = 'Pédiatrie'),
  'Clinique de l''amitié',
  'Moroni',
  '334.23.98',
  'Pédiatrie';

INSERT INTO public.doctors (first_name, last_name, specialty_id, hospital, address, phone_number, description)
SELECT 
  'ABDOURAZAK',
  '',
  (SELECT id FROM public.specialties WHERE name = 'Pédiatrie'),
  'Groupe médicochirurgical',
  'Moroni',
  '333.00.33',
  'Pédiatrie';

INSERT INTO public.doctors (first_name, last_name, specialty_id, hospital, address, phone_number, description)
SELECT 
  'ALI',
  'MOHAMED',
  (SELECT id FROM public.specialties WHERE name = 'Cardiologie'),
  'Cabinet médical Dr Abbas cheikh',
  'Route corniche - Chef de service médecine A EL MAAROUF',
  '335.70.51',
  'Cardiologie';

INSERT INTO public.doctors (first_name, last_name, specialty_id, hospital, address, phone_number, description)
SELECT 
  'HAMIDY',
  'Hasal Mhoussine',
  (SELECT id FROM public.specialties WHERE name = 'Cardiologie'),
  'Cabinet médical',
  'Maluzini',
  '369.01.78 / 459.32.86',
  'Cardiologie';

INSERT INTO public.doctors (first_name, last_name, specialty_id, hospital, address, phone_number, description)
SELECT 
  'ADA',
  '',
  (SELECT id FROM public.specialties WHERE name = 'Chirurgie'),
  'Clinique SALAMA',
  'Moroni',
  '348.30.22 / 333.21.12',
  'Chirurgie générale';

INSERT INTO public.doctors (first_name, last_name, specialty_id, hospital, address, phone_number, description)
SELECT 
  'SALIM',
  '',
  (SELECT id FROM public.specialties WHERE name = 'Chirurgie'),
  'Clinique médicale de la paix',
  'Moroni',
  '327.91.77',
  'Chirurgie orthopédique';

INSERT INTO public.doctors (first_name, last_name, specialty_id, hospital, address, phone_number, description)
SELECT 
  'MOURCHID',
  '',
  (SELECT id FROM public.specialties WHERE name = 'Dentiste'),
  'Cabinet dentaire',
  'Route corniche',
  '773.30.52 / 333.30.52',
  'Dentiste';

INSERT INTO public.doctors (first_name, last_name, specialty_id, hospital, address, phone_number, description)
SELECT 
  'MOUSTOIFA',
  'OMAR',
  (SELECT id FROM public.specialties WHERE name = 'Dentiste'),
  'Cabinet dentaire',
  'Moroni',
  '346.55.98',
  'Dentiste';

INSERT INTO public.doctors (first_name, last_name, specialty_id, hospital, address, phone_number, description)
SELECT 
  'TADJIRI',
  '',
  (SELECT id FROM public.specialties WHERE name = 'Dermatologie'),
  'Cabinet dermatologique',
  'Moroni',
  '333.63.69',
  'Dermatologie';

INSERT INTO public.doctors (first_name, last_name, specialty_id, hospital, address, phone_number, description)
SELECT 
  'SOUDJAY',
  '',
  (SELECT id FROM public.specialties WHERE name = 'Dermatologie'),
  'Cabinet dermatologique',
  'Moroni',
  '320.23.99',
  'Dermatologie';

-- Insert some sample diseases
INSERT INTO public.diseases (name, description, specialty_id)
SELECT 
  'Diabète',
  'Trouble du métabolisme du glucose',
  (SELECT id FROM public.specialties WHERE name = 'Endocrinologie');

INSERT INTO public.diseases (name, description, specialty_id)
SELECT 
  'Hypertension',
  'Pression artérielle élevée',
  (SELECT id FROM public.specialties WHERE name = 'Cardiologie');

INSERT INTO public.diseases (name, description, specialty_id)
SELECT 
  'Asthme',
  'Maladie respiratoire chronique',
  (SELECT id FROM public.specialties WHERE name = 'Médecine Générale');

INSERT INTO public.diseases (name, description, specialty_id)
SELECT 
  'Eczéma',
  'Inflammation de la peau',
  (SELECT id FROM public.specialties WHERE name = 'Dermatologie');

-- Insert sample pharmacies
INSERT INTO public.pharmacies (name, address, phone_number, is_24h)
VALUES
  ('Pharmacie Centrale', 'Centre-ville, Moroni', '773.00.00', false),
  ('Pharmacie de l''Hôpital', 'El Maarouf, Moroni', '773.11.11', true),
  ('Pharmacie du Nord', 'Route de l''aéroport, Moroni', '773.22.22', false);
