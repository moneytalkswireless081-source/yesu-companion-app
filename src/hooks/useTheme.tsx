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
  spiritual: {
    '--background': '240 20% 98%',
    '--foreground': '220 15% 15%',
    '--card': '0 0% 100%',
    '--card-foreground': '220 15% 15%',
    '--popover': '0 0% 100%',
    '--popover-foreground': '220 15% 15%',
    '--primary': '260 85% 45%',
    '--primary-foreground': '0 0% 98%',
    '--secondary': '290 60% 65%',
    '--secondary-foreground': '0 0% 98%',
    '--muted': '240 20% 96%',
    '--muted-foreground': '220 10% 45%',
    '--accent': '270 70% 92%',
    '--accent-foreground': '220 15% 15%',
    '--destructive': '0 84% 55%',
    '--destructive-foreground': '0 0% 98%',
    '--border': '240 20% 88%',
    '--input': '240 20% 94%',
    '--ring': '260 85% 45%',
  },
  modern: {
    '--background': '0 0% 100%',
    '--foreground': '0 0% 5%',
    '--card': '0 0% 100%',
    '--card-foreground': '0 0% 5%',
    '--popover': '0 0% 100%',
    '--popover-foreground': '0 0% 5%',
    '--primary': '200 100% 50%',
    '--primary-foreground': '0 0% 100%',
    '--secondary': '120 50% 50%',
    '--secondary-foreground': '0 0% 100%',
    '--muted': '0 0% 96%',
    '--muted-foreground': '0 0% 40%',
    '--accent': '180 100% 90%',
    '--accent-foreground': '0 0% 5%',
    '--destructive': '0 84% 55%',
    '--destructive-foreground': '0 0% 98%',
    '--border': '0 0% 90%',
    '--input': '0 0% 94%',
    '--ring': '200 100% 50%',
  },
  auto: {} // Will be set based on system preference
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
    root.classList.remove('light', 'dark', 'spiritual', 'modern');
    root.classList.add(selectedTheme);

  }, [settings.theme, settings.fontSize]);

  const setTheme = (theme: typeof settings.theme) => {
    updateSettings({ theme });
  };

  return { theme: settings.theme, setTheme };
};