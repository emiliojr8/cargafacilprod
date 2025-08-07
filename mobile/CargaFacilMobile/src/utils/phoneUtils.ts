// src/utils/phoneUtils.ts
export const validateMozambiquePhone = (phone: string): boolean => {
  return /^\+258(8[2-7]\d{7})$/.test(phone);
};

export const formatPhoneDisplay = (phone: string): string => {
  if (!validateMozambiquePhone(phone)) return phone;
  return phone.replace(/^\+258/, '0');
};

export const getOperator = (phone: string): string => {
  if (!validateMozambiquePhone(phone)) return 'unknown';
  const prefix = phone.substring(4, 6);
  if (['84', '85'].includes(prefix)) return 'vodacom';
  if (['86', '87'].includes(prefix)) return 'movitel';
  if (['82', '83'].includes(prefix)) return 'tmcel';
  return 'unknown';
};