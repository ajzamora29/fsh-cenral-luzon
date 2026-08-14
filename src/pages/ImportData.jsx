// src/pages/ImportData.jsx
import React, { useState, useRef } from "react";
import { COLORS } from "../utils/colors";
import TopBar from "../components/common/TopBar";

export default function ImportData({ goTo }) {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setStatus("idle");
      setMessage("");
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setStatus("error");
      setMessage("Please select a file first.");
      return;
    }

    setIsUploading(true);
    setStatus("uploading");
    setMessage("Uploading...");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:8000/api/import", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        setStatus("success");
        setMessage(`Successfully imported ${result.rows_imported || 0} rows.`);
      } else {
        const error = await response.json();
        setStatus("error");
        setMessage(error.detail || "Upload failed.");
      }
    } catch (error) {
      setStatus("error");
      setMessage("Network error. Please ensure the backend is running.");
    }

    setIsUploading(false);
  };

  const handleDragOver = (e) => { e.preventDefault(); };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && (droppedFile.name.endsWith('.csv') || droppedFile.name.endsWith('.xlsx') || droppedFile.name.endsWith('.xls'))) {
      setFile(droppedFile);
      setStatus("idle");
      setMessage("");
    } else {
      setStatus("error");
      setMessage("Please upload a CSV or Excel file.");
    }
  };

  return (
    <>
      <TopBar />
      <div style={{ maxWidth: 800, margin: "14px auto 0" }}>
        <h1 style={{ fontFamily: "'Jersey 25', sans-serif", fontSize: 38, color: COLORS.accentDeep, margin: "0 0 12px" }}>
          Import Data
        </h1>
        <p style={{ fontFamily: "Sarabun, sans-serif", fontSize: 14.5, color: COLORS.sub, marginBottom: 24 }}>
          Upload historical price data or forecast updates in CSV or Excel format.
        </p>

        <div style={{ background: COLORS.white, borderRadius: 14, padding: "32px", boxShadow: "0 1px 2px rgba(18,35,63,0.05)" }}>
          <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            style={{
              border: `2px dashed ${status === "error" ? COLORS.red : COLORS.accent}`,
              borderRadius: 12,
              padding: "40px 20px",
              textAlign: "center",
              background: status === "error" ? "#FFF5F5" : COLORS.cardBg,
              transition: "all 0.2s ease",
              cursor: "pointer"
            }}
            onClick={() => fileInputRef.current?.click()}
          >
            <div style={{ fontSize: 48, color: COLORS.accent, marginBottom: 12 }}>📄</div>
            <div style={{ fontFamily: "Sarabun, sans-serif", fontSize: 16, fontWeight: 600, color: COLORS.ink }}>
              {file ? file.name : "Drop your file here, or click to browse"}
            </div>
            <div style={{ fontFamily: "Sarabun, sans-serif", fontSize: 13, color: COLORS.sub, marginTop: 4 }}>
              Supports CSV, XLSX, XLS
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv,.xlsx,.xls"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
          </div>

          {file && (
            <div style={{ marginTop: 16, padding: "12px 16px", background: COLORS.cardBg, borderRadius: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontFamily: "Sarabun, sans-serif", fontSize: 14, fontWeight: 600, color: COLORS.ink }}>{file.name}</div>
                <div style={{ fontFamily: "Sarabun, sans-serif", fontSize: 12, color: COLORS.sub }}>{(file.size / 1024).toFixed(1)} KB</div>
              </div>
              <button
                onClick={() => {
                  setFile(null);
                  setStatus("idle");
                  setMessage("");
                  if (fileInputRef.current) fileInputRef.current.value = "";
                }}
                style={{ background: "transparent", border: "none", color: COLORS.red, cursor: "pointer", fontFamily: "Sarabun, sans-serif", fontSize: 13, fontWeight: 600 }}
              >
                Remove
              </button>
            </div>
          )}

          {message && (
            <div style={{ marginTop: 16, padding: "12px 16px", borderRadius: 8, background: status === "success" ? "#DDF3E5" : status === "error" ? "#F8DEDA" : COLORS.cardBg, color: status === "success" ? COLORS.green : status === "error" ? COLORS.red : COLORS.sub, fontFamily: "Sarabun, sans-serif", fontSize: 14 }}>
              {message}
            </div>
          )}

          <button
            onClick={handleUpload}
            disabled={!file || isUploading}
            style={{
              marginTop: 20,
              width: "100%",
              padding: "14px",
              background: file ? `linear-gradient(90deg, ${COLORS.accentDeep}, ${COLORS.accent})` : COLORS.sub,
              color: COLORS.white,
              border: "none",
              borderRadius: 9,
              fontFamily: "Sarabun, sans-serif",
              fontSize: 16,
              fontWeight: 600,
              cursor: file ? "pointer" : "not-allowed",
              opacity: file ? 1 : 0.5,
              transition: "opacity 0.2s ease"
            }}
          >
            {isUploading ? "Uploading..." : "Upload File"}
          </button>
        </div>

        <button
          onClick={() => goTo("home")}
          style={{
            marginTop: 18,
            background: "transparent",
            border: `1.5px solid ${COLORS.accent}`,
            color: COLORS.accentDeep,
            borderRadius: 9,
            padding: "9px 16px",
            fontFamily: "Sarabun, sans-serif",
            fontSize: 13.5,
            fontWeight: 600,
            cursor: "pointer"
          }}
        >
          ← Back to Executive Home
        </button>
      </div>
    </>
  );
}