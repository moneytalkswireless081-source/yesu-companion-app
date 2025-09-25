import { useEffect } from 'react';
import { useAppStore } from '@/stores/useAppStore';

const themes = {
  light: {
    '--background': '210 40% 98%',
    '--foreground': '220 15% 20%',
    '--card': '0 0% 100%',
    '--card-foreground': '220 15% 20%',
    '--popover': '0 0% 100%',
    '--popover-foreground': '220 15% 20%',
    '--primary': '214 85% 40%',
    '--primary-foreground': '0 0% 98%',
    '--secondary': '38 90% 55%',
    '--secondary-foreground': '220 15% 20%',
    '--muted': '210 40% 96%',
    '--muted-foreground': '220 10% 50%',
    '--accent': '195 75% 92%',
    '--accent-foreground': '220 15% 20%',
    '--destructive': '0 84% 55%',
    '--destructive-foreground': '0 0% 98%',
    '--border': '210 30% 90%',
    '--input': '210 30% 94%',
    '--ring': '214 85% 40%',
  },
  dark: {
    '--background': '222 84% 5%',
    '--foreground': '210 40% 98%',
    '--card': '222 84% 5%',
    '--card-foreground': '210 40% 98%',
    '--popover': '222 84% 5%',
    '--popover-foreground': '210 40% 98%',
    '--primary': '210 40% 98%',
    '--primary-foreground': '222 47% 11%',
    '--secondary': '217 33% 18%',
    '--secondary-foreground': '210 40% 98%',
    '--muted': '217 33% 18%',
    '--muted-foreground': '215 20% 65%',
    '--accent': '217 33% 18%',
    '--accent-foreground': '210 40% 98%',
    '--destructive': '0 63% 31%',
    '--destructive-foreground': '210 40% 98%',
    '--border': '217 33% 18%',
    '--input': '217 33% 18%',
    '--ring': '213 27% 84%',
  },
  ocean: {
    '--background': '200 30% 98%',
    '--foreground': '210 20% 15%',
    '--card': '200 50% 96%',
    '--card-foreground': '210 20% 15%',
    '--popover': '200 50% 96%',
    '--popover-foreground': '210 20% 15%',
    '--primary': '195 100% 45%',
    '--primary-foreground': '0 0% 98%',
    '--secondary': '185 60% 55%',
    '--secondary-foreground': '0 0% 98%',
    '--muted': '200 25% 92%',
    '--muted-foreground': '200 10% 45%',
    '--accent': '190 80% 88%',
    '--accent-foreground': '210 20% 15%',
    '--destructive': '350 85% 55%',
    '--destructive-foreground': '0 0% 98%',
    '--border': '200 20% 85%',
    '--input': '200 20% 90%',
    '--ring': '195 100% 45%',
  },
  forest: {
    '--background': '125 20% 97%',
    '--foreground': '140 15% 20%',
    '--card': '120 30% 94%',
    '--card-foreground': '140 15% 20%',
    '--popover': '120 30% 94%',
    '--popover-foreground': '140 15% 20%',
    '--primary': '135 60% 35%',
    '--primary-foreground': '0 0% 98%',
    '--secondary': '85 45% 50%',
    '--secondary-foreground': '0 0% 98%',
    '--muted': '125 15% 90%',
    '--muted-foreground': '125 8% 45%',
    '--accent': '115 50% 85%',
    '--accent-foreground': '140 15% 20%',
    '--destructive': '0 84% 55%',
    '--destructive-foreground': '0 0% 98%',
    '--border': '125 15% 82%',
    '--input': '125 15% 88%',
    '--ring': '135 60% 35%',
  },
  sunset: {
    '--background': '25 25% 97%',
    '--foreground': '15 20% 20%',
    '--card': '20 35% 95%',
    '--card-foreground': '15 20% 20%',
    '--popover': '20 35% 95%',
    '--popover-foreground': '15 20% 20%',
    '--primary': '15 85% 55%',
    '--primary-foreground': '0 0% 98%',
    '--secondary': '35 75% 60%',
    '--secondary-foreground': '0 0% 98%',
    '--muted': '25 20% 90%',
    '--muted-foreground': '25 10% 45%',
    '--accent': '40 60% 88%',
    '--accent-foreground': '15 20% 20%',
    '--destructive': '0 84% 55%',
    '--destructive-foreground': '0 0% 98%',
    '--border': '25 20% 82%',
    '--input': '25 20% 88%',
    '--ring': '15 85% 55%',
  },
  royal: {
    '--background': '270 15% 98%',
    '--foreground': '260 20% 15%',
    '--card': '270 25% 95%',
    '--card-foreground': '260 20% 15%',
    '--popover': '270 25% 95%',
    '--popover-foreground': '260 20% 15%',
    '--primary': '260 80% 50%',
    '--primary-foreground': '0 0% 98%',
    '--secondary': '295 55% 65%',
    '--secondary-foreground': '0 0% 98%',
    '--muted': '270 12% 92%',
    '--muted-foreground': '270 8% 45%',
    '--accent': '280 50% 90%',
    '--accent-foreground': '260 20% 15%',
    '--destructive': '0 84% 55%',
    '--destructive-foreground': '0 0% 98%',
    '--border': '270 12% 85%',
    '--input': '270 12% 90%',
    '--ring': '260 80% 50%',
  },
  minimal: {
    '--background': '0 0% 99%',
    '--foreground': '0 0% 10%',
    '--card': '0 0% 97%',
    '--card-foreground': '0 0% 10%',
    '--popover': '0 0% 97%',
    '--popover-foreground': '0 0% 10%',
    '--primary': '0 0% 15%',
    '--primary-foreground': '0 0% 98%',
    '--secondary': '0 0% 85%',
    '--secondary-foreground': '0 0% 20%',
    '--muted': '0 0% 94%',
    '--muted-foreground': '0 0% 45%',
    '--accent': '0 0% 90%',
    '--accent-foreground': '0 0% 10%',
    '--destructive': '0 84% 55%',
    '--destructive-foreground': '0 0% 98%',
    '--border': '0 0% 87%',
    '--input': '0 0% 91%',
    '--ring': '0 0% 15%',
  },
};

export const useTheme = () => {
  const { settings, updateSettings } = useAppStore();

  useEffect(() => {
    const root = document.documentElement;
    let selectedTheme = settings.theme;

    // Handle auto theme
    if (selectedTheme === 'auto') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      selectedTheme = prefersDark ? 'dark' : 'light';
    }

    // Apply theme variables
    const themeVars = themes[selectedTheme as keyof typeof themes];
    if (themeVars) {
      Object.entries(themeVars).forEach(([key, value]) => {
        root.style.setProperty(key, value);
      });
    }

    // Apply font size
    const fontSizeMap = {
      small: '14px',
      medium: '16px',
      large: '18px'
    };
    root.style.fontSize = fontSizeMap[settings.fontSize];

    // Update theme class for dark mode compatibility
    root.classList.remove('light', 'dark', 'ocean', 'forest', 'sunset', 'royal', 'minimal');
    root.classList.add(selectedTheme);

  }, [settings.theme, settings.fontSize]);

  const setTheme = (theme: typeof settings.theme) => {
    updateSettings({ theme });
  };

  return { theme: settings.theme, setTheme };
};