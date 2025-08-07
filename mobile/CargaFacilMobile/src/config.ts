// src/config.ts
export const Config = {
    // Substitua pelo seu IP local (não use localhost)
    API_BASE_URL: 'http://192.168.x.xxx:8000/api/mobile', // 👈 IP da sua máquina
    TIMEOUT: 30000,
    
    ENDPOINTS: {
      AUTH: '/auth/',
      SHIPMENTS: '/shipments/',
      PAYMENTS: '/payments/mpesa/'
    }
  };
  
  // Método alternativo para detectar IP automaticamente
  export const getLocalIP = async () => {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      return data.ip || '192.168.x.xxx'; // Fallback
    } catch {
      return '192.168.x.xxx'; // Seu IP local como fallback
    }
  };