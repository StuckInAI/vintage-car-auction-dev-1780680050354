import { useState, useEffect } from 'react';
import { getTimeRemaining } from '@/lib/utils';
import styles from './AuctionTimer.module.css';
import clsx from 'clsx';

type AuctionTimerProps = {
  endTime: string;
  compact?: boolean;
  large?: boolean;
};

export default function AuctionTimer({ endTime, compact = false, large = false }: AuctionTimerProps) {
  const [time, setTime] = useState(() => getTimeRemaining(endTime));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getTimeRemaining(endTime));
    }, 1000);
    return () => clearInterval(interval);
  }, [endTime]);

  if (time.total <= 0) {
    return <span className={styles.ended}>Auction Ended</span>;
  }

  const pad = (n: number) => String(n).padStart(2, '0');

  if (compact) {
    return (
      <span className={styles.compact}>
        {pad(time.hours)}:{pad(time.minutes)}:{pad(time.seconds)} remaining
      </span>
    );
  }

  return (
    <div className={clsx(styles.timer, large && styles.timerLarge)}>
      <div className={styles.timeUnit}>
        <span className={styles.timeValue}>{pad(time.hours)}</span>
        <span className={styles.timeLabel}>HRS</span>
      </div>
      <span className={styles.colon}>:</span>
      <div className={styles.timeUnit}>
        <span className={styles.timeValue}>{pad(time.minutes)}</span>
        <span className={styles.timeLabel}>MIN</span>
      </div>
      <span className={styles.colon}>:</span>
      <div className={styles.timeUnit}>
        <span className={styles.timeValue}>{pad(time.seconds)}</span>
        <span className={styles.timeLabel}>SEC</span>
      </div>
    </div>
  );
}
