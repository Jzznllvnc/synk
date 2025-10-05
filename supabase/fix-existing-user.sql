-- Quick fix for existing user profile
-- This adds a first_name to your current profile so the greeting works

-- Replace 'your-email@example.com' with your actual email
-- Replace 'YourFirstName' with your actual first name

-- Option 1: With both first and last name
UPDATE profiles 
SET first_name = 'Jazznelle', last_name = 'Vince'
WHERE email = 'your-email@example.com';

-- Option 2: With only first name (last name is optional/NULL)
-- UPDATE profiles 
-- SET first_name = 'Jazznelle', last_name = NULL
-- WHERE email = 'your-email@example.com';

-- Option 3: With only first name (simpler - omit last_name)
-- UPDATE profiles 
-- SET first_name = 'Jazznelle'
-- WHERE email = 'your-email@example.com';

-- To check your profile after update:
SELECT id, email, first_name, last_name FROM profiles;

