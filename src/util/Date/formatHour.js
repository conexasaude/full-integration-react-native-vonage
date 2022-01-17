function formatarHora(str) {
  if (
    str.slice(0, 2) === '05' ||
    str.slice(0, 2) === '06' ||
    str.slice(0, 2) === '07' ||
    str.slice(0, 2) === '08' ||
    str.slice(0, 2) === '09' ||
    str.slice(0, 2) === '10' ||
    str.slice(0, 2) === '11'
  ) {
    return `${str} da manhã.`;
  }
  if (
    str.slice(0, 2) === '12' ||
    str.slice(0, 2) === '13' ||
    str.slice(0, 2) === '14' ||
    str.slice(0, 2) === '15' ||
    str.slice(0, 2) === '16' ||
    str.slice(0, 2) === '17'
  ) {
    return `${str} da tarde.`;
  }
  return `${str} da noite.`;
}

export { formatarHora };
