export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatMileage(mileage: number): string {
  return new Intl.NumberFormat('en-US').format(mileage) + ' mi';
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function getTimeRemaining(endTime: string): { hours: number; minutes: number; seconds: number; total: number } {
  const total = new Date(endTime).getTime() - Date.now();
  if (total <= 0) return { hours: 0, minutes: 0, seconds: 0, total: 0 };
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor(total / 1000 / 60 / 60);
  return { hours, minutes, seconds, total };
}

export const MAKES = [
  'Alfa Romeo', 'Aston Martin', 'Auburn', 'Austin-Healey',
  'Bentley', 'BMW', 'Buick',
  'Cadillac', 'Chevrolet', 'Chrysler', 'Cord',
  'Datsun', 'DeSoto', 'Dodge', 'Duesenberg',
  'Ferrari', 'Ford',
  'Hudson',
  'Jaguar',
  'Lincoln', 'Lotus',
  'Maserati', 'Mercedes-Benz', 'Mercury', 'MG', 'Morris',
  'Nash',
  'Oldsmobile',
  'Packard', 'Pontiac', 'Porsche', 'Plymouth',
  'Rolls-Royce',
  'Shelby', 'Studebaker',
  'Triumph',
  'Volkswagen',
];

export const YEARS: number[] = Array.from({ length: 75 }, (_, i) => 2000 - i);

export const FEATURES_LIST = [
  'Air Conditioning',
  'Power Steering',
  'Power Brakes',
  'Power Windows',
  'Power Seats',
  'Leather Interior',
  'Convertible Top',
  'Sunroof',
  'AM/FM Radio',
  'Eight-Track Player',
  'CD Player',
  'Navigation System',
  'Bluetooth',
  'Backup Camera',
  'Heated Seats',
  'Cruise Control',
  'Disc Brakes',
  'Drum Brakes',
  'Independent Suspension',
  'Limited Slip Differential',
  'Positraction',
  'Wire Wheels',
  'Alloy Wheels',
  'Rally Wheels',
  'Wide White Wall Tires',
  'Chrome Package',
  'Running Boards',
  'Fender Skirts',
  'Continental Kit',
  'Hood Scoop',
  'Spoiler',
  'Side Pipes',
  'Dual Exhaust',
  'Numbers Matching',
  'Frame-Off Restoration',
  'Rotisserie Restoration',
  'Documented History',
  'Original Owner',
  'Show Quality',
  'Award Winner',
];
