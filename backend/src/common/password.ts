import { scryptSync, timingSafeEqual } from 'node:crypto';

export function hashPassword(password: string, salt: string) {
  return scryptSync(password, salt, 64).toString('hex');
}

export function passwordMatches(password: string, expectedHex: string, salt: string) {
  if (!/^[a-f\d]{128}$/i.test(expectedHex)) return false;
  const actual = scryptSync(password, salt, 64);
  return timingSafeEqual(actual, Buffer.from(expectedHex, 'hex'));
}