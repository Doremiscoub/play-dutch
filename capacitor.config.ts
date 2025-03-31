
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.11f85a565d874814ad68b7693c4d6dcd',
  appName: 'dutch-digital-buddy',
  webDir: 'dist',
  server: {
    url: 'https://11f85a56-5d87-4814-ad68-b7693c4d6dcd.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  ios: {
    contentInset: 'automatic'
  },
  android: {
    backgroundColor: '#ffffff'
  }
};

export default config;
