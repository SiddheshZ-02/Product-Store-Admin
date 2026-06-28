import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "sonner";
import AuthListener from "@/components/common/AuthListener";
import AuthInitializer from "@/components/common/AuthInitializer";
import type { ReactNode } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      staleTime: 30000, // 30 seconds
      gcTime: 600000, // 10 minutes
    },
  },
});

interface Props {
  children: ReactNode;
}

export default function AppProviders({ children }: Props) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="wineerp-theme">
        <TooltipProvider>
          <AuthInitializer />
          <AuthListener />
          {children}
          <Toaster richColors position="top-right" />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
