import BN from 'bn.js';
import { config } from '../global';

export const formatLocked = (locked?: string | null): string => {
  if (!locked) {
    return '-';
  }

  return parseFloat(new BN(locked).div(new BN(10).pow(new BN(config.decimal))).toString()).toFixed(0) + ' DOT';
};
