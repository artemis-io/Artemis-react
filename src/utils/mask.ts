export function MascaraRg(v0: any, errChar = '?') {
  const v = v0.toUpperCase().replace(/[^\dX]/g, '');
  return v.length === 8 || v.length === 9
    ? v.replace(/^(\d{1,2})(\d{3})(\d{3})([\dX])$/, '$1.$2.$3-$4')
    : errChar + v0;
}

