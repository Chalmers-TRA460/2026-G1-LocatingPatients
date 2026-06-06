CREATE TABLE patients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  note text,
  planned_operation text,
  planned_check_in text,
  planned_check_out text,
  location_room text,
  location_bed integer,
  personal_number text,
  care_level_medicine text,
  care_level_nursing integer,
  quick_icons text[] DEFAULT '{}'::text[] NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

CREATE TABLE bed_events (
  id text PRIMARY KEY,
  bed text NOT NULL,
  patient_id uuid NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  start_time text NOT NULL,
  end_time text NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

CREATE TABLE patient_list_entries (
  id text PRIMARY KEY,
  collection text NOT NULL, -- 'permissions', 'ivaPatients', 'nivaPatients'
  patient_id uuid NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  from_time text NOT NULL,
  to_time text NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

CREATE TABLE board_plans (
  id text PRIMARY KEY,
  time text NOT NULL,
  text text NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

CREATE TABLE board_beds (
  bed text PRIMARY KEY,
  sort_order serial,
  created_at timestamptz DEFAULT now() NOT NULL
);
