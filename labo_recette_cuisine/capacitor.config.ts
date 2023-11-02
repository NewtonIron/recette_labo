import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'labo_recette_cuisine',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
