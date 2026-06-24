import { QueryClient } from "@tanstack/react-query";
import { QueryClientProvider } from "@tanstack/react-query";

// import { ReactNode } from "react";
import AuthListener from "@/components/common/AuthListener";

import { Toaster } from "sonner";

import AuthInitializer from "@/components/common/AuthInitializer";
import type { ReactNode } from "react";

const queryClient = new QueryClient();

interface Props {
  children: ReactNode;
}

export default function AppProviders({ children }: Props) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthInitializer />
      <AuthListener />
      {children}

      <Toaster richColors position="top-right" />
    </QueryClientProvider>
  );
}
