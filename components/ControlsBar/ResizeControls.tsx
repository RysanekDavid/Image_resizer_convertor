// components/ControlsBar/ResizeControls.tsx

import React from "react";

interface ResizeControlsProps {
  resizeEnabled: boolean;

  resizeWidth: string;

  resizeHeight: string;

  onResizeToggle: (enabled: boolean) => void;

  onResizeWidthChange: (value: string) => void;

  onResizeHeightChange: (value: string) => void;

  onResizeApply: () => void;
}

export const ResizeControls = ({
  resizeEnabled,
  resizeWidth,
  resizeHeight,
  onResizeToggle,
  onResizeWidthChange,
  onResizeHeightChange,
  onResizeApply,
}: ResizeControlsProps): React.ReactElement => {
  return (
    <div
      style={{
        display: "flex",
        gap: "0.5rem",
        alignItems: "center",
        padding: "0.4rem 0.6rem",
        borderRadius: "6px",
        backgroundColor: "#1a1a1a",
        border: "1px solid #555555",
      }}
    >
      <label
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.4rem",
          fontSize: "0.85rem",
          color: "#c0c0c0",
          cursor: "pointer",
        }}
      >
        <input
          type="checkbox"
          checked={resizeEnabled}
          onChange={(e) => onResizeToggle(e.target.checked)}
          style={{ cursor: "pointer" }}
        />
        <span>Resize pro všechny:</span>
      </label>
      {resizeEnabled && (
        <div
          style={{
            display: "flex",
            gap: "0.4rem",
            alignItems: "center",
          }}
        >
          <input
            type="number"
            min={1}
            placeholder="Šířka"
            value={resizeWidth}
            onChange={(e) => onResizeWidthChange(e.target.value)}
            style={{
              width: "70px",
              padding: "0.25rem 0.4rem",
              fontSize: "0.8rem",
              borderRadius: "4px",
              border: "1px solid #555555",
              backgroundColor: "#252525",
              color: "#e5e5e5",
            }}
          />
          <span style={{ color: "#909090", fontSize: "0.8rem" }}>×</span>
          <input
            type="number"
            min={1}
            placeholder="Výška"
            value={resizeHeight}
            onChange={(e) => onResizeHeightChange(e.target.value)}
            style={{
              width: "70px",
              padding: "0.25rem 0.4rem",
              fontSize: "0.8rem",
              borderRadius: "4px",
              border: "1px solid #555555",
              backgroundColor: "#252525",
              color: "#e5e5e5",
            }}
          />
          <button
            type="button"
            onClick={onResizeApply}
            style={{
              padding: "0.25rem 0.5rem",
              borderRadius: "4px",
              fontSize: "0.75rem",
              border: "1px solid #555555",
              backgroundColor: "#2563eb",
              color: "#ffffff",
              cursor: "pointer",
              fontWeight: 500,
            }}
          >
            Použít
          </button>
        </div>
      )}
    </div>
  );
};

