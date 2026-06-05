import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CarListing, FilterState } from '@/types';
import { useListings } from '@/hooks/useListings';
import CarCard from '@/components/common/CarCard';
import SearchFilters, { defaultFilters } from '@/components/common/SearchFilters';
import styles from './ListingsPage.module.css';

export default function ListingsPage() {
  const { listings } = useListings();
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState<FilterState>(() => {
    const make = searchParams.get('make') || '';
    return { ...defaultFilters, make };
  });

  useEffect(() => {
    const make = searchParams.get('make') || '';
    if (make) setFilters(f => ({ ...f, make }));
  }, [searchParams]);

  const filtered = useMemo(() => {
    let result: CarListing[] = [...listings];

    if (filters.make) result = result.filter(c => c.make === filters.make);
    if (filters.model) result = result.filter(c => c.model.toLowerCase().includes(filters.model.toLowerCase()));
    if (filters.yearMin) result = result.filter(c => c.year >= Number(filters.yearMin));
    if (filters.yearMax) result = result.filter(c => c.year <= Number(filters.yearMax));
    if (filters.priceMin) result = result.filter(c => c.price >= Number(filters.priceMin));
    if (filters.priceMax) result = result.filter(c => c.price <= Number(filters.priceMax));
    if (filters.mileageMax) result = result.filter(c => c.mileage <= Number(filters.mileageMax));
    if (filters.fuelType) result = result.filter(c => c.fuelType === filters.fuelType);
    if (filters.transmission) result = result.filter(c => c.transmission === filters.transmission);
    if (filters.condition) result = result.filter(c => c.condition === filters.condition);
    if (filters.bodyStyle) result = result.filter(c => c.bodyStyle === filters.bodyStyle);
    if (filters.drivetrain) result = result.filter(c => c.drivetrain === filters.drivetrain);
    if (filters.location) result = result.filter(c => c.location.toLowerCase().includes(filters.location.toLowerCase()));

    switch (filters.sortBy) {
      case 'price-asc': result.sort((a, b) => a.price - b.price); break;
      case 'price-desc': result.sort((a, b) => b.price - a.price); break;
      case 'mileage-asc': result.sort((a, b) => a.mileage - b.mileage); break;
      case 'year-desc': result.sort((a, b) => b.year - a.year); break;
      case 'year-asc': result.sort((a, b) => a.year - b.year); break;
      case 'oldest': result.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()); break;
      default: result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    return result;
  }, [listings, filters]);

  const handleReset = () => setFilters(defaultFilters);

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div className={styles.headerContent}>
          <h1 className={styles.pageTitle}>Classic Car Listings</h1>
          <p className={styles.pageSubtitle}>{filtered.length} vehicles found</p>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.layout}>
          <aside className={styles.sidebar}>
            <SearchFilters
              filters={filters}
              onFilterChange={setFilters}
              onReset={handleReset}
            />
          </aside>
          <div className={styles.results}>
            {filtered.length === 0 ? (
              <div className={styles.empty}>
                <h3>No vehicles found</h3>
                <p>Try adjusting your filters to see more results.</p>
                <button className={styles.resetBtn} onClick={handleReset}>Clear All Filters</button>
              </div>
            ) : (
              <div className={styles.grid}>
                {filtered.map(car => (
                  <CarCard key={car.id} car={car} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
