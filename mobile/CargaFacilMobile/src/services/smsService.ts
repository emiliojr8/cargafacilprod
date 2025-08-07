const operatorPrefixes = {
  vodacom: ['84', '85'],
  movitel: ['86', '87'],
  tmcel: ['82', '83']
};

export const detectOperator = (phone: string): string => {
  const cleanedPhone = phone.replace(/\D/g, '');
  
  if (!cleanedPhone.startsWith('258') || cleanedPhone.length !== 12) {
    return 'invalid';
  }

  const prefix = cleanedPhone.substring(3, 5);
  
  if (operatorPrefixes.vodacom.includes(prefix)) return 'vodacom';
  if (operatorPrefixes.movitel.includes(prefix)) return 'movitel';
  if (operatorPrefixes.tmcel.includes(prefix)) return 'tmcel';
  
  return 'unknown';
};

export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.startsWith('258')) return `+${cleaned}`;
  if (cleaned.length === 9) return `+258${cleaned}`;
  return phone;
};