import React from 'react';
import { cn } from '@/lib/utils';
import { useAppStore } from '@/stores/useAppStore';
import { 
  BookOpen, 
  Heart, 
  Users, 
  Calendar,
  Settings
} from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  { id: 'daily', label: 'Daily', icon: Heart },
  { id: 'study', label: 'Study', icon: BookOpen },
  { id: 'community', label: 'Community', icon: Users },
  { id: 'events', label: 'Events', icon: Calendar },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export const BottomNav = () => {
  const { activeTab, setActiveTab } = useAppStore();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-soft z-50">
      <div className="flex items-center justify-around px-2 py-1">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          const Icon = item.icon;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "flex flex-col items-center justify-center p-3 rounded-lg transition-smooth min-w-0 flex-1",
                isActive 
                  ? "text-primary bg-primary/10" 
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              )}
            >
              <Icon className={cn("h-5 w-5 mb-1", isActive && "scale-110")} />
              <span className="text-xs font-medium truncate">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};