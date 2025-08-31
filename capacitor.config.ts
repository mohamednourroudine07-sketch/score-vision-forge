import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.60c05168106a41fab7cc511dcb942f21',
  appName: 'score-vision-forge',
  webDir: 'dist',
  server: {
    url: 'https://60c05168-106a-41fa-b7cc-511dcb942f21.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  bundledWebRuntime: false
};

export default config;