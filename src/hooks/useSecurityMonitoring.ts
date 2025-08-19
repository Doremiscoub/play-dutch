import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface SecurityEvent {
  type: 'failed_auth' | 'unusual_activity' | 'data_access';
  details: string;
  timestamp: string;
  user_id?: string;
}

export const useSecurityMonitoring = () => {
  const logSecurityEvent = async (event: SecurityEvent) => {
    try {
      // Log security events for monitoring
      console.warn('Security Event:', event);
      
      // In production, you might want to send this to a security monitoring service
      if (process.env.NODE_ENV === 'production') {
        // Example: Send to external monitoring service
        // await fetch('/api/security-log', { method: 'POST', body: JSON.stringify(event) });
      }
    } catch (error) {
      console.error('Failed to log security event:', error);
    }
  };

  const monitorAuthFailures = () => {
    // Monitor for suspicious authentication patterns
    const failedAttempts = parseInt(localStorage.getItem('auth_failures') || '0');
    
    if (failedAttempts > 5) {
      logSecurityEvent({
        type: 'failed_auth',
        details: `Multiple failed authentication attempts: ${failedAttempts}`,
        timestamp: new Date().toISOString()
      });
      
      // Implement progressive delays or account lockout
      const lockoutTime = Math.min(failedAttempts * 1000, 30000); // Max 30 seconds
      setTimeout(() => {
        localStorage.setItem('auth_failures', '0');
      }, lockoutTime);
    }
  };

  const monitorDataAccess = (table: string, operation: string) => {
    // Monitor for unusual data access patterns
    const accessKey = `access_${table}_${operation}`;
    const lastAccess = localStorage.getItem(accessKey);
    const now = new Date().getTime();
    
    if (lastAccess) {
      const timeSinceLastAccess = now - parseInt(lastAccess);
      
      // If too many rapid requests (less than 100ms apart), flag as suspicious
      if (timeSinceLastAccess < 100) {
        logSecurityEvent({
          type: 'unusual_activity',
          details: `Rapid ${operation} requests to ${table} table`,
          timestamp: new Date().toISOString()
        });
      }
    }
    
    localStorage.setItem(accessKey, now.toString());
  };

  useEffect(() => {
    // Clean up old monitoring data periodically
    const cleanup = () => {
      const keys = Object.keys(localStorage);
      const now = new Date().getTime();
      const oneHour = 60 * 60 * 1000;
      
      keys.forEach(key => {
        if (key.startsWith('access_')) {
          const timestamp = localStorage.getItem(key);
          if (timestamp && now - parseInt(timestamp) > oneHour) {
            localStorage.removeItem(key);
          }
        }
      });
    };

    const interval = setInterval(cleanup, 30 * 60 * 1000); // Run every 30 minutes
    
    return () => clearInterval(interval);
  }, []);

  return {
    logSecurityEvent,
    monitorAuthFailures,
    monitorDataAccess
  };
};