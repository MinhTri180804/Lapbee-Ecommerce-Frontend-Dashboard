import { useEffect } from "react";
import "./App.css";
import { Routes } from "@/routes";
import { useErrorCodesStore } from "./store/errorCodes";
import * as errorCodesApi from "@/apis/errorCodes/api";

function App() {
  const updateErrorCodes = useErrorCodesStore.use.updateData();

  useEffect(() => {
    const fetchErrorCodes = async () => {
      const data = await errorCodesApi.getErrorCodes();
      updateErrorCodes(data);
    };

    fetchErrorCodes();
  });

  return <Routes />;
}

export default App;
