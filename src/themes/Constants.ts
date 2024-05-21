import { kHeight } from 'src/common/constants';
import { hasNotch } from 'src/common/devices';
import { fontScale, scale } from 'src/common/scale';

export const MINIPLAYER_HEIGHT = hasNotch() ? scale(60) : scale(50);
export const FULLSCREEN_HEIGHT = kHeight - MINIPLAYER_HEIGHT;

export default {
  scale5: scale(5),
  scale10: scale(10),
  scale15: scale(15),
  scale20: scale(20),
  scale25: scale(25),
  scale30: scale(30),
  scale35: scale(35),
  scale40: scale(40),
  scale50: scale(50),
  scale60: scale(60),
  scale70: scale(70),
  scale80: scale(80),
  scale90: scale(90),
  scale100: scale(100),
  scale110: scale(110),
  scale120: scale(120),
  scale130: scale(130),
  scale140: scale(140),
  scale150: scale(150),
  fontScale10: fontScale(10),
  fontScale12: fontScale(12),
  fontScale11: fontScale(11),
  fontScale14: fontScale(14),
  fontScale16: fontScale(16),
  fontScale18: fontScale(18),
};
