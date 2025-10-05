-- Migration: Update profiles table to use separate first_name and last_name
-- Run this ONLY if you already have an existing database with the old schema

-- Step 1: Add new columns
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS first_name TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS last_name TEXT;

-- Step 2: Migrate existing data from full_name to first_name and last_name
-- This splits "John Doe" into first_name="John" and last_name="Doe"
UPDATE profiles
SET 
  first_name = CASE 
    WHEN full_name IS NOT NULL AND position(' ' in full_name) > 0 
    THEN split_part(full_name, ' ', 1)
    ELSE full_name
  END,
  last_name = CASE 
    WHEN full_name IS NOT NULL AND position(' ' in full_name) > 0 
    THEN substring(full_name from position(' ' in full_name) + 1)
    ELSE NULL
  END
WHERE full_name IS NOT NULL;

-- Step 3: Drop the old full_name column (optional - uncomment if you're sure)
-- ALTER TABLE profiles DROP COLUMN IF EXISTS full_name;

-- Step 4: Update the handle_new_user function to use new fields
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, first_name, last_name)
  VALUES (
    NEW.id, 
    NEW.email, 
    NEW.raw_user_meta_data->>'first_name',
    NEW.raw_user_meta_data->>'last_name'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Note: After running this migration, you may want to manually verify the data
-- and then uncomment Step 3 to remove the old full_name column.

