import { scryptSync, timingSafeEqual } from 'node:crypto';
export function hashPassword(password, salt) {
    return scryptSync(password, salt, 64).toString('hex');
}
export function passwordMatches(password, expectedHex, salt) {
    if (!/^[a-f\d]{128}$/i.test(expectedHex))
        return false;
    const actual = scryptSync(password, salt, 64);
    return timingSafeEqual(actual, Buffer.from(expectedHex, 'hex'));
}
//# sourceMappingURL=password.js.map