/**
 * Utility functions for Persian digits formatting
 */

const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

export function toPersianDigits(value: string | number | undefined | null): string {
  if (value === undefined || value === null) return '';
  return value
    .toString()
    .replace(/[0-9]/g, (digit) => persianDigits[parseInt(digit, 10)]);
}

export function formatPriceTomans(price: number): string {
  return toPersianDigits(price.toLocaleString('en-US'));
}
