// src/services/smsService.ts
const operatorPrefixes = {
    vodacom: ['84', '85'],
    movitel: ['86', '87'],
    tmcel: ['82', '83']
  };
  
  export const detectOperator = (phone: string): string => {
    const prefix = phone.substring(4, 6);
    
    if (operatorPrefixes.vodacom.includes(prefix)) return 'vodacom';
    if (operatorPrefixes.movitel.includes(prefix)) return 'movitel';
    if (operatorPrefixes.tmcel.includes(prefix)) return 'tmcel';
    
    return 'unknown';
  };
  
  export const sendSMS = async (phone: string): Promise<boolean> => {
    const operator = detectOperator(phone);
    console.log(`Enviando SMS via ${operator}...`);
    
    // TODO: Integração real com APIs das operadoras
    return true;
  };