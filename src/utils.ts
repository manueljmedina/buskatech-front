export const formatCurrency = (value: number | string | undefined | null): string => {
  if (value === undefined || value === null || value === '') return '';
  
  const numberValue = typeof value === 'string' ? parseFloat(value) : value;
  
  if (isNaN(numberValue)) return '';

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numberValue);
};

export const parseCurrency = (value: string): number => {
  // Remove non-numeric characters except dot
  const cleanValue = value.replace(/[^0-9.]/g, '');
  return parseFloat(cleanValue) || 0;
};