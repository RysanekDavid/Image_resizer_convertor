// components/StatisticsBar.tsx

import React from "react";

import { ImageItem } from "./types";

import { formatFileSize, formatSaving } from "./utils";

interface StatisticsBarProps {
  images: ImageItem[];
}

export const StatisticsBar = ({
  images,
}: StatisticsBarProps): React.ReactElement => {
  const convertedImages = images.filter(
    (img) => img.convertedUrl && img.convertedSizeBytes != null
  );

  if (convertedImages.length === 0) {
    return <></>;
  }

  const totalOriginalSize = convertedImages.reduce(
    (sum, img) => sum + img.file.size,
    0
  );

  const totalConvertedSize = convertedImages.reduce(
    (sum, img) => sum + (img.convertedSizeBytes || 0),
    0
  );

  const savingText = formatSaving(totalOriginalSize, totalConvertedSize);

  return (
    <div
      style={{
        marginBottom: "1rem",
        padding: "0.75rem 1rem",
        borderRadius: "10px",
        backgroundColor: "#252525",
        border: "1px solid #444444",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "1rem",
          flexWrap: "wrap",
        }}
      >
        <div>
          <p
            style={{
              margin: 0,
              fontSize: "0.85rem",
              color: "#b0b0b0",
              marginBottom: "0.25rem",
            }}
          >
            Celkem zkonvertováno: <strong>{convertedImages.length}</strong>{" "}
            obrázků
          </p>
          <p
            style={{
              margin: 0,
              fontSize: "0.9rem",
              color: "#c0c0c0",
              fontWeight: 500,
            }}
          >
            Původní velikost: <strong>{formatFileSize(totalOriginalSize)}</strong>
          </p>
        </div>

        <div style={{ textAlign: "right" }}>
          <p
            style={{
              margin: 0,
              fontSize: "0.9rem",
              color: "#c0c0c0",
              fontWeight: 500,
            }}
          >
            Nová velikost: <strong>{formatFileSize(totalConvertedSize)}</strong>
          </p>
          {savingText && (
            <p
              style={{
                margin: "0.25rem 0 0",
                fontSize: "0.95rem",
                color: "#4ade80",
                fontWeight: 600,
              }}
            >
              {savingText}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

