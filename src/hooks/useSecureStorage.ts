import { useState, useEffect } from 'react';

interface SecureStorageOptions {
  encrypt?: boolean;
  expirationHours?: number;
  sensitive?: boolean;
}

// Simple encryption for non-sensitive data (not cryptographically secure)
const simpleEncrypt = (text: string): string => {
  return btoa(text);
};

const simpleDecrypt = (encrypted: string): string => {
  try {
    return atob(encrypted);
  } catch (error) {
    throw new Error('Invalid encrypted data');
  }
};

export const useSecureStorage = <T>(
  key: string, 
  initialValue: T, 
  options: SecureStorageOptions = {}
) => {
  const { encrypt = false, expirationHours = 24, sensitive = false } = options;

  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      if (typeof window === 'undefined') return initialValue;

      const item = window.localStorage.getItem(key);
      if (!item) return initialValue;

      let parsedItem;
      
      if (encrypt) {
        try {
          const decrypted = simpleDecrypt(item);
          parsedItem = JSON.parse(decrypted);
        } catch (error) {
          console.warn(`Failed to decrypt storage item ${key}:`, error);
          window.localStorage.removeItem(key);
          return initialValue;
        }
      } else {
        parsedItem = JSON.parse(item);
      }

      // Check expiration
      if (parsedItem && typeof parsedItem === 'object' && parsedItem.expires) {
        if (new Date().getTime() > parsedItem.expires) {
          window.localStorage.removeItem(key);
          return initialValue;
        }
        return parsedItem.data;
      }

      return parsedItem;
    } catch (error) {
      console.error(`Error reading from secure storage "${key}":`, error);
      // Clean up corrupted data
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key);
      }
      return initialValue;
    }
  });

  const setValue = (value: T | ((prevValue: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      if (typeof window === 'undefined') return;

      // Security: Don't store sensitive data in localStorage
      if (sensitive) {
        console.warn(`Attempting to store sensitive data in localStorage for key: ${key}`);
        return;
      }

      let dataToStore;
      
      if (expirationHours > 0) {
        const expirationTime = new Date().getTime() + (expirationHours * 60 * 60 * 1000);
        dataToStore = {
          data: valueToStore,
          expires: expirationTime
        };
      } else {
        dataToStore = valueToStore;
      }

      const serializedData = JSON.stringify(dataToStore);
      
      if (encrypt) {
        const encrypted = simpleEncrypt(serializedData);
        window.localStorage.setItem(key, encrypted);
      } else {
        window.localStorage.setItem(key, serializedData);
      }

      setStoredValue(valueToStore);
    } catch (error) {
      console.error(`Error setting secure storage "${key}":`, error);
    }
  };

  const removeValue = () => {
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key);
      }
      setStoredValue(initialValue);
    } catch (error) {
      console.error(`Error removing secure storage "${key}":`, error);
    }
  };

  // Clean up expired items on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const cleanupExpiredItems = () => {
      const keys = Object.keys(localStorage);
      keys.forEach(storageKey => {
        try {
          const item = localStorage.getItem(storageKey);
          if (!item) return;

          let parsedItem;
          
          // Try to parse as regular JSON first
          try {
            parsedItem = JSON.parse(item);
          } catch (e) {
            // If that fails, try to decrypt first
            try {
              const decrypted = simpleDecrypt(item);
              parsedItem = JSON.parse(decrypted);
            } catch (decryptError) {
              return; // Skip items that can't be parsed
            }
          }

          if (parsedItem && typeof parsedItem === 'object' && parsedItem.expires) {
            if (new Date().getTime() > parsedItem.expires) {
              localStorage.removeItem(storageKey);
            }
          }
        } catch (error) {
          console.error(`Error cleaning up storage item ${storageKey}:`, error);
        }
      });
    };

    cleanupExpiredItems();
  }, []);

  return [storedValue, setValue, removeValue] as const;
};