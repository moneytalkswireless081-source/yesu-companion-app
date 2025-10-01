import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BottomNav } from "@/components/ui/bottom-nav";
import { useAppStore } from "@/stores/useAppStore";
import { useTheme } from "@/hooks/useTheme";
import { usePushNotifications } from "@/hooks/usePushNotifications";
import { DailyPage } from "@/pages/DailyPage";
import { StudyPage } from "@/pages/StudyPage";
import { CommunityPage } from "@/pages/CommunityPage";
import { MarriagePage } from "@/pages/MarriagePage";
import { CounselingPage } from "@/pages/CounselingPage";
import { DonationsPage } from "@/pages/DonationsPage";
import { EventsPage } from "@/pages/EventsPage";
import { AdminPage } from "@/pages/AdminPage";
import { SettingsPage } from "@/pages/SettingsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const MainApp = () => {
  const { activeTab } = useAppStore();
  
  // Initialize theme system
  useTheme();
  
  // Initialize push notifications
  usePushNotifications();

  const renderPage = () => {
    switch (activeTab) {
      case 'daily':
        return <DailyPage />;
      case 'study':
        return <StudyPage />;
      case 'community':
        return <CommunityPage />;
      case 'marriage':
        return <MarriagePage />;
      case 'counseling':
        return <CounselingPage />;
      case 'donations':
        return <DonationsPage />;
      case 'events':
        return <EventsPage />;
      case 'admin':
        return <AdminPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <DailyPage />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="relative">
        {renderPage()}
      </main>
      <BottomNav />
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainApp />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
