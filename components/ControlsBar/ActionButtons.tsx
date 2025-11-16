// components/ControlsBar/ActionButtons.tsx

import React from "react";

interface ActionButtonsProps {
  hasConvertedImages: boolean;

  isCreatingZip: boolean;

  onConvertAll: () => void;

  onDownloadAllAsZip: () => void;

  onClearAll: () => void;
}

export const ActionButtons = ({
  hasConvertedImages,
  isCreatingZip,
  onConvertAll,
  onDownloadAllAsZip,
  onClearAll,
}: ActionButtonsProps): React.ReactElement => {
  return (
    <div
      style={{
        display: "flex",
        gap: "0.5rem",
        alignItems: "center",
      }}
    >
      <button
        type="button"
        onClick={onConvertAll}
        style={{
          padding: "0.5rem 1rem",
          borderRadius: "999px",
          border: "none",
          cursor: "pointer",
          fontWeight: 600,
          fontSize: "0.9rem",
          background:
            "linear-gradient(90deg, rgba(59,130,246,1) 0%, rgba(96,165,250,1) 100%)",
          color: "#ffffff",
        }}
      >
        Převést všechny
      </button>
      <button
        type="button"
        onClick={onDownloadAllAsZip}
        disabled={isCreatingZip || !hasConvertedImages}
        style={{
          padding: "0.5rem 1rem",
          borderRadius: "999px",
          border: "none",
          cursor: isCreatingZip || !hasConvertedImages ? "default" : "pointer",
          fontWeight: 600,
          fontSize: "0.9rem",
          background: isCreatingZip || !hasConvertedImages
            ? "#444444"
            : "linear-gradient(90deg, rgba(34,197,94,1) 0%, rgba(74,222,128,1) 100%)",
          color: "#ffffff",
          opacity: isCreatingZip || !hasConvertedImages ? 0.6 : 1,
        }}
      >
        {isCreatingZip ? "Vytvářím ZIP..." : "Stáhnout vše jako ZIP"}
      </button>
      <button
        type="button"
        onClick={onClearAll}
        style={{
          padding: "0.5rem 1rem",
          borderRadius: "999px",
          border: "1px solid #555555",
          cursor: "pointer",
          fontWeight: 600,
          fontSize: "0.9rem",
          backgroundColor: "#1a1a1a",
          color: "#c0c0c0",
        }}
      >
        Nová konverze
      </button>
    </div>
  );
};

