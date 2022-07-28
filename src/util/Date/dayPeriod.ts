interface PeriodProps {
  hour: number;
}

const setDayPeriod = ({ hour }: PeriodProps) => {
  if (hour === 0) {
    return 'noite';
  }
  if (hour >= 1 && hour <= 11) {
    return 'manhã';
  }
  if (hour >= 12 && hour <= 17) {
    return 'tarde';
  }
  if (hour >= 18 && hour <= 23) {
    return 'noite';
  }

  return '';
};

export { setDayPeriod };
