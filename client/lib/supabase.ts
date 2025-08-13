import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Check if we have valid Supabase credentials
const isSupabaseConfigured = () => {
  return supabaseUrl &&
         supabaseAnonKey &&
         supabaseUrl !== 'https://demo.supabase.co' &&
         supabaseAnonKey !== 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0'
}

// Create a mock client if environment variables are not set or are demo values
const createSupabaseClient = () => {
  if (!isSupabaseConfigured()) {
    console.warn('⚠️ Supabase not properly configured. Using mock client. Please set up your Supabase project.')

    // Return a comprehensive mock client that won't cause fetch errors
    return {
      auth: {
        getSession: () => Promise.resolve({ data: { session: null }, error: null }),
        signInWithPassword: () => Promise.resolve({
          data: { user: null, session: null },
          error: { message: 'Please configure Supabase to enable authentication. Check SUPABASE_SETUP.md for instructions.' }
        }),
        signUp: () => Promise.resolve({
          data: { user: null, session: null },
          error: { message: 'Please configure Supabase to enable authentication. Check SUPABASE_SETUP.md for instructions.' }
        }),
        signInWithOAuth: () => Promise.resolve({
          data: { url: null, provider: null },
          error: { message: 'Please configure Supabase to enable OAuth authentication. Check SUPABASE_SETUP.md for instructions.' }
        }),
        signOut: () => Promise.resolve({ error: null }),
        onAuthStateChange: (callback: any) => {
          // Call the callback immediately with no session
          setTimeout(() => callback('SIGNED_OUT', null), 0)
          return { data: { subscription: { unsubscribe: () => {} } } }
        }
      },
      from: (table: string) => ({
        insert: () => Promise.resolve({
          data: null,
          error: { message: `Please configure Supabase to store data in ${table}. Check SUPABASE_SETUP.md for instructions.` }
        }),
        select: () => ({
          order: () => Promise.resolve({
            data: [],
            error: { message: `Please configure Supabase to read data from ${table}. Check SUPABASE_SETUP.md for instructions.` }
          })
        }),
        update: () => ({
          eq: () => Promise.resolve({
            data: null,
            error: { message: `Please configure Supabase to update data in ${table}. Check SUPABASE_SETUP.md for instructions.` }
          })
        }),
        upsert: () => Promise.resolve({
          data: null,
          error: { message: `Please configure Supabase to store data in ${table}. Check SUPABASE_SETUP.md for instructions.` }
        })
      }),
      storage: {
        from: () => ({
          upload: () => Promise.resolve({
            data: null,
            error: { message: 'Please configure Supabase storage to enable file uploads. Check SUPABASE_SETUP.md for instructions.' }
          }),
          getPublicUrl: () => ({ data: { publicUrl: '' } })
        })
      }
    }
  }

  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    }
  })
}

export const supabase = createSupabaseClient() as any

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          updated_at?: string
        }
      }
      contacts: {
        Row: {
          id: string
          name: string
          email: string
          phone: string | null
          company: string | null
          message: string
          created_at: string
        }
        Insert: {
          name: string
          email: string
          phone?: string | null
          company?: string | null
          message: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string | null
          company?: string | null
          message?: string
        }
      }
      job_applications: {
        Row: {
          id: string
          user_id: string | null
          full_name: string
          email: string
          phone: string
          position: string
          experience: string
          resume_url: string | null
          cover_letter: string | null
          status: string
          created_at: string
        }
        Insert: {
          user_id?: string | null
          full_name: string
          email: string
          phone: string
          position: string
          experience: string
          resume_url?: string | null
          cover_letter?: string | null
          status?: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          full_name?: string
          email?: string
          phone?: string
          position?: string
          experience?: string
          resume_url?: string | null
          cover_letter?: string | null
          status?: string
        }
      }
    }
  }
}
