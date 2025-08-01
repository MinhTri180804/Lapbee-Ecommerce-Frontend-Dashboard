import { useEffect } from "react";
import "./App.css";
import { Routes } from "@/routes";
import { useErrorCodesStore } from "./store/errorCodes";
import * as errorCodesApi from "@/apis/errorCodes/api";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";

const queryClient = new QueryClient();

function App() {
  const updateErrorCodes = useErrorCodesStore.use.updateData();

  useEffect(() => {
    const fetchErrorCodes = async () => {
      const data = await errorCodesApi.getErrorCodes();
      updateErrorCodes(data);
    };

    fetchErrorCodes();
  }, [updateErrorCodes]);

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-center" />
      <Routes />
    </QueryClientProvider>
  );
}

export default App;
