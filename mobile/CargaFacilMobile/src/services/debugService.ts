export const debugNetwork = async () => {
    const tests = [
      {
        name: "Teste de Conexão Básica",
        url: "http://192.168.43.132:8000/api/mobile/auth/connection-test/",
        method: "GET"
      },
      {
        name: "Teste de OTP",
        url: "http://192.168.43.132:8000/api/mobile/auth/request-otp/",
        method: "POST",
        body: { phone: "258841234567" }
      }
    ];
  
    for (const test of tests) {
      try {
        console.log(`Iniciando teste: ${test.name}`);
        const start = Date.now();
        
        const response = await fetch(test.url, {
          method: test.method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: test.body ? JSON.stringify(test.body) : undefined
        });
  
        const data = await response.json();
        console.log(`✅ Sucesso (${Date.now() - start}ms):`, {
          status: response.status,
          data
        });
      } catch (error) {
        console.error(`❌ Falha no teste ${test.name}:`, error);
      }
    }
  };