export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount);
}

export function formatMileage(miles: number): string {
  return new Intl.NumberFormat('en-US').format(miles) + ' mi';
}

export function getTimeRemaining(endTime: string): { total: number; hours: number; minutes: number; seconds: number } {
  const total = Math.max(0, new Date(endTime).getTime() - Date.now());
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor(total / 1000 / 3600);
  return { total, hours, minutes, seconds };
}

export const MAKES = [
  'AC', 'Alfa Romeo', 'Aston Martin', 'Auburn', 'Austin-Healey',
  'Bentley', 'BMW', 'Buick',
  'Cadillac', 'Chevrolet', 'Chrysler', 'Cord',
  'Datsun', 'DeSoto', 'Dodge', 'Duesenberg',
  'Edsel',
  'Ferrari', 'Ford',
  'Hudson',
  'Jaguar',
  'Kaiser',
  'Lamborghini', 'Lincoln', 'Lotus',
  'Maserati', 'Mercedes-Benz', 'Mercury', 'MG', 'Morgan',
  'Nash',
  'Oldsmobile',
  'Packard', 'Plymouth', 'Pontiac', 'Porsche',
  'Rolls-Royce',
  'Shelby', 'Studebaker',
  'Triumph',
  'Volkswagen',
];

export const YEARS: number[] = Array.from({ length: 60 }, (_, i) => 1999 - i);
