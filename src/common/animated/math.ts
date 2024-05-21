
/**
 * Convert boolean to 0 or 1 on UI thead
 */
export const sharedBin = (value: boolean): 0 | 1 => {
    'worklet';
    return value ? 1 : 0;
  };