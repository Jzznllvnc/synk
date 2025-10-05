import { useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../supabase';

interface UserProfile {
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  avatar_url: string | null;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(() => {
    // Load cached profile immediately from localStorage
    if (typeof window !== 'undefined') {
      const cached = localStorage.getItem('user_profile');
      if (cached) {
        try {
          return JSON.parse(cached);
        } catch {
          return null;
        }
      }
    }
    return null;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setUser(session?.user ?? null);
      
      // Fetch profile data from database
      if (session?.user) {
        const { data } = await supabase
          .from('profiles')
          .select('first_name, last_name, email, avatar_url')
          .eq('id', session.user.id)
          .single();
        
        if (data) {
          setProfile(data);
          // Cache the profile for instant loading next time
          localStorage.setItem('user_profile', JSON.stringify(data));
        }
      }
      
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setUser(session?.user ?? null);
        
        // Fetch profile data from database
        if (session?.user) {
          const { data } = await supabase
            .from('profiles')
            .select('first_name, last_name, email, avatar_url')
            .eq('id', session.user.id)
            .single();
          
          if (data) {
            setProfile(data);
            // Cache the profile for instant loading next time
            localStorage.setItem('user_profile', JSON.stringify(data));
          }
        } else {
          setProfile(null);
          // Clear cache on logout
          localStorage.removeItem('user_profile');
        }
        
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  return { user, profile, loading };
}

