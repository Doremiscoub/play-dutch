
// Redirection vers le nouveau contexte Supabase
export { 
  SupabaseAuthProvider as AuthProvider, 
  useSupabaseAuth as useAuth,
  type SupabaseAuthUser as AuthUser,
  type SupabaseAuthContextType as AuthContextType 
} from './SupabaseAuthContext';
