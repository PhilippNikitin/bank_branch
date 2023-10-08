import { ReactNode } from "react";
import { QueryClientProvider } from "react-query";
import { queryClient } from "@/shared/lib";
type QueryClientProviderType = {
  children: ReactNode;
};
export const QueryProvider = (props: QueryClientProviderType) => {
  const { children } = props;
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
