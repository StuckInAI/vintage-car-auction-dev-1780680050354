import { useState } from 'react';
import { Search, X, Filter, ChevronDown, ChevronUp } from 'lucide-react';
import { FilterState } from '@/types';
import { MAKES, YEARS } from '@/lib/utils';
import styles from './SearchFilters.module.css';

type SearchFiltersProps = {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onReset: () => void;
};

const defaultFilters: FilterState = {
  make: '',
  model: '',
  yearMin: '',
  yearMax: '',
  priceMin: '',
  priceMax: '',
  mileageMax: '',
  fuelType: '',
  transmission: '',
  condition: '',
  bodyStyle: '',
  drivetrain: '',
  location: '',
  sortBy: 'newest',
};

export default function SearchFilters({ filters, onFilterChange, onReset }: SearchFiltersProps) {
  const [expanded, setExpanded] = useState(false);

  const update = (key: keyof FilterState, value: string) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const hasActiveFilters = Object.entries(filters).some(
    ([k, v]) => k !== 'sortBy' && v !== ''
  );

  return (
    <div className={styles.container}>
      <div className={styles.primaryRow}>
        <div className={styles.searchGroup}>
          <Search size={16} className={styles.searchIcon} />
          <select
            className={styles.select}
            value={filters.make}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => update('make', e.target.value)}
          >
            <option value="">All Makes</option>
            {MAKES.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>
        <div className={styles.searchGroup}>
          <input
            className={styles.input}
            type="text"
            placeholder="Model"
            value={filters.model}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => update('model', e.target.value)}
          />
        </div>
        <div className={styles.searchGroup}>
          <select
            className={styles.select}
            value={filters.yearMin}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => update('yearMin', e.target.value)}
          >
            <option value="">Year From</option>
            {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>
        <div className={styles.searchGroup}>
          <select
            className={styles.select}
            value={filters.yearMax}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => update('yearMax', e.target.value)}
          >
            <option value="">Year To</option>
            {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>
        <div className={styles.searchGroup}>
          <input
            className={styles.input}
            type="number"
            placeholder="Max Price"
            value={filters.priceMax}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => update('priceMax', e.target.value)}
          />
        </div>
        <button
          className={styles.filterToggle}
          onClick={() => setExpanded(v => !v)}
        >
          <Filter size={14} />
          More Filters
          {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
        {hasActiveFilters && (
          <button className={styles.resetBtn} onClick={onReset}>
            <X size={14} /> Reset
          </button>
        )}
      </div>

      {expanded && (
        <div className={styles.expandedFilters}>
          <div className={styles.filterRow}>
            <div className={styles.filterGroup}>
              <label>Min Price</label>
              <input
                className={styles.input}
                type="number"
                placeholder="Min Price"
                value={filters.priceMin}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => update('priceMin', e.target.value)}
              />
            </div>
            <div className={styles.filterGroup}>
              <label>Max Mileage</label>
              <input
                className={styles.input}
                type="number"
                placeholder="Max Mileage"
                value={filters.mileageMax}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => update('mileageMax', e.target.value)}
              />
            </div>
            <div className={styles.filterGroup}>
              <label>Fuel Type</label>
              <select
                className={styles.select}
                value={filters.fuelType}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => update('fuelType', e.target.value)}
              >
                <option value="">All</option>
                <option value="gasoline">Gasoline</option>
                <option value="diesel">Diesel</option>
                <option value="electric">Electric</option>
                <option value="hybrid">Hybrid</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className={styles.filterGroup}>
              <label>Transmission</label>
              <select
                className={styles.select}
                value={filters.transmission}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => update('transmission', e.target.value)}
              >
                <option value="">All</option>
                <option value="manual">Manual</option>
                <option value="automatic">Automatic</option>
                <option value="semi-automatic">Semi-Auto</option>
              </select>
            </div>
            <div className={styles.filterGroup}>
              <label>Condition</label>
              <select
                className={styles.select}
                value={filters.condition}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => update('condition', e.target.value)}
              >
                <option value="">All</option>
                <option value="excellent">Excellent</option>
                <option value="good">Good</option>
                <option value="fair">Fair</option>
                <option value="poor">Poor</option>
                <option value="for-parts">For Parts</option>
              </select>
            </div>
            <div className={styles.filterGroup}>
              <label>Body Style</label>
              <select
                className={styles.select}
                value={filters.bodyStyle}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => update('bodyStyle', e.target.value)}
              >
                <option value="">All</option>
                <option value="sedan">Sedan</option>
                <option value="coupe">Coupe</option>
                <option value="convertible">Convertible</option>
                <option value="wagon">Wagon</option>
                <option value="suv">SUV</option>
                <option value="truck">Truck</option>
                <option value="roadster">Roadster</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className={styles.filterGroup}>
              <label>Drivetrain</label>
              <select
                className={styles.select}
                value={filters.drivetrain}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => update('drivetrain', e.target.value)}
              >
                <option value="">All</option>
                <option value="rwd">RWD</option>
                <option value="fwd">FWD</option>
                <option value="awd">AWD</option>
                <option value="4wd">4WD</option>
              </select>
            </div>
            <div className={styles.filterGroup}>
              <label>Location</label>
              <input
                className={styles.input}
                type="text"
                placeholder="City, State"
                value={filters.location}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => update('location', e.target.value)}
              />
            </div>
          </div>
        </div>
      )}

      <div className={styles.sortRow}>
        <label className={styles.sortLabel}>Sort by:</label>
        <select
          className={styles.sortSelect}
          value={filters.sortBy}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => update('sortBy', e.target.value)}
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="mileage-asc">Mileage: Low to High</option>
          <option value="year-desc">Year: Newest</option>
          <option value="year-asc">Year: Oldest</option>
        </select>
      </div>
    </div>
  );
}

export { defaultFilters };
