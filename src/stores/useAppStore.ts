import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  email?: string;
  displayName?: string;
  avatar?: string;
  isAnonymous: boolean;
}

interface NotificationSettings {
  dailyNotifications: boolean;
  dailyTime: string;
  communityUpdates: boolean;
  eventReminders: boolean;
}

interface AppSettings {
  theme: 'light' | 'dark' | 'auto' | 'spiritual' | 'modern';
  fontSize: 'small' | 'medium' | 'large';
  language: string;
  offlineMode: boolean;
}

interface AppState {
  // User state
  user: User | null;
  isAuthenticated: boolean;
  
  // App settings
  settings: AppSettings;
  notifications: NotificationSettings;
  
  // UI state
  activeTab: string;
  isOffline: boolean;
  
  // Actions
  setUser: (user: User | null) => void;
  setAuthenticated: (status: boolean) => void;
  updateSettings: (settings: Partial<AppSettings>) => void;
  updateNotifications: (notifications: Partial<NotificationSettings>) => void;
  setActiveTab: (tab: string) => void;
  setOfflineStatus: (status: boolean) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // Initial state
      user: null,
      isAuthenticated: false,
      
      settings: {
        theme: 'spiritual',
        fontSize: 'medium',
        language: 'en',
        offlineMode: true,
      },
      
      notifications: {
        dailyNotifications: true,
        dailyTime: '08:00',
        communityUpdates: true,
        eventReminders: true,
      },
      
      activeTab: 'daily',
      isOffline: false,
      
      // Actions
      setUser: (user) => set({ user }),
      setAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
      
      updateSettings: (newSettings) =>
        set((state) => ({
          settings: { ...state.settings, ...newSettings }
        })),
        
      updateNotifications: (newNotifications) =>
        set((state) => ({
          notifications: { ...state.notifications, ...newNotifications }
        })),
        
      setActiveTab: (activeTab) => set({ activeTab }),
      setOfflineStatus: (isOffline) => set({ isOffline }),
    }),
    {
      name: 'yesuapp-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        settings: state.settings,
        notifications: state.notifications,
      }),
    }
  )
);