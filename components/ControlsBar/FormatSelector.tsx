// components/ControlsBar/FormatSelector.tsx

import React from "react";

import { ConversionFormat } from "../types";

interface FormatSelectorProps {
  currentFormat?: ConversionFormat;

  onFormatChangeForAll: (format: ConversionFormat) => void;
}

export const FormatSelector = ({
  currentFormat,
  onFormatChangeForAll,
}: FormatSelectorProps): React.ReactElement => {
  return (
    <div
      style={{
        display: "flex",
        gap: "0.5rem",
        alignItems: "center",
      }}
    >
      <label
        htmlFor="global-format-select"
        style={{
          fontSize: "0.85rem",
          color: "#c0c0c0",
          fontWeight: 500,
        }}
      >
        Formát pro všechny:
      </label>
      <select
        id="global-format-select"
        value={currentFormat || "png"}
        onChange={(e) => {
          if (e.target.value) {
            onFormatChangeForAll(e.target.value as ConversionFormat);
          }
        }}
        style={{
          padding: "0.4rem 0.6rem",
          fontSize: "0.85rem",
          borderRadius: "6px",
          border: "1px solid #555555",
          backgroundColor: "#1a1a1a",
          color: "#e5e5e5",
          cursor: "pointer",
        }}
      >
        <option value="png">PNG</option>
        <option value="webp">WebP</option>
        <option value="jpeg">JPEG</option>
      </select>
    </div>
  );
};

