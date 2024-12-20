```typescript
import { ASSETS } from './assets';

export const STYLES = {
  FLAG_LINE: {
    container: 'relative w-full h-[3px] flex items-center',
    stripe: {
      red: `w-1/3 h-full bg-[${ASSETS.GHANA_FLAG_COLORS.red}]`,
      yellow: `w-1/3 h-full bg-[${ASSETS.GHANA_FLAG_COLORS.yellow}]`,
      green: `w-1/3 h-full bg-[${ASSETS.GHANA_FLAG_COLORS.green}]`
    }
  },
  THEME: {
    primary: {
      light: ASSETS.GHANA_FLAG_COLORS.yellow,
      dark: ASSETS.GHANA_FLAG_COLORS.yellow,
    },
    secondary: {
      light: ASSETS.GHANA_FLAG_COLORS.green,
      dark: ASSETS.GHANA_FLAG_COLORS.green,
    },
    accent: {
      light: ASSETS.GHANA_FLAG_COLORS.red,
      dark: ASSETS.GHANA_FLAG_COLORS.red,
    }
  }
} as const;
```