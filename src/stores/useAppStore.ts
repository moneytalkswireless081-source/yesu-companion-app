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
  theme: 'light' | 'dark' | 'auto' | 'ocean' | 'forest' | 'sunset' | 'royal' | 'minimal';
  fontSize: 'small' | 'medium' | 'large';
  language: string;
  offlineMode: boolean;
}

interface StudyProgress {
  [planId: string]: {
    currentDay: number;
    completedLessons: string[];
    lastAccessed: string;
  };
}

interface AppState {
  // User state
  user: User | null;
  isAuthenticated: boolean;
  
  // App settings
  settings: AppSettings;
  notifications: NotificationSettings;
  
  // Study progress
  studyProgress: StudyProgress;
  
  // UI state
  activeTab: string;
  isOffline: boolean;
  
  // Actions
  setUser: (user: User | null) => void;
  setAuthenticated: (status: boolean) => void;
  updateSettings: (settings: Partial<AppSettings>) => void;
  updateNotifications: (notifications: Partial<NotificationSettings>) => void;
  updateStudyProgress: (planId: string, day: number, lessonId: string) => void;
  getStudyProgress: (planId: string) => { currentDay: number; completedLessons: string[]; lastAccessed: string };
  setActiveTab: (tab: string) => void;
  setOfflineStatus: (status: boolean) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      isAuthenticated: false,
      
      settings: {
        theme: 'ocean',
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
      
      studyProgress: {},
      
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
        
      updateStudyProgress: (planId: string, day: number, lessonId: string) =>
        set((state) => ({
          studyProgress: {
            ...state.studyProgress,
            [planId]: {
              currentDay: day,
              completedLessons: [
                ...(state.studyProgress[planId]?.completedLessons || []),
                lessonId
              ].filter((id, index, arr) => arr.indexOf(id) === index),
              lastAccessed: new Date().toISOString(),
            }
          }
        })),
        
      getStudyProgress: (planId: string) => {
        const progress = get().studyProgress[planId];
        return progress || { currentDay: 1, completedLessons: [], lastAccessed: '' };
      },
        
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
        studyProgress: state.studyProgress,
      }),
    }
  )
);