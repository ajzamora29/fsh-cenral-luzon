import React, { useState } from "react";
import Sidebar from "./components/common/Sidebar";
import ExecutiveHome from "./pages/ExecutiveHome";
import MarketOverview from "./pages/MarketOverview";
import PricePredictions from "./pages/PricePredictions";
import ImportData from "./pages/ImportData";
import ExportReport from "./pages/ExportReport";
import Settings from "./pages/Settings";

function App() {
  const [page, setPage] = useState("home");

  const renderPage = () => {
    switch (page) {
      case "home":
        return <ExecutiveHome goTo={setPage} />;
      case "market":
        return <MarketOverview goTo={setPage} />;
      case "predictions":
        return <PricePredictions goTo={setPage} />;
      case "import":
        return <ImportData goTo={setPage} />;
      case "export":
        return <ExportReport goTo={setPage} />;
      case "settings":
        return <Settings goTo={setPage} />;
      default:
        return <ExecutiveHome goTo={setPage} />;
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar page={page} goTo={setPage} />
      <div style={{ flex: 1, padding: "0 28px 30px", background: "#F2F6FA", overflow: "auto" }}>
        {renderPage()}
      </div>
    </div>
  );
}

export default App;