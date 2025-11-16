// components/ImageCard/ImageInfo.tsx

import React from "react";

import { ImageItem, ConversionFormat } from "../types";

import { formatFileSize, formatSaving, formatLabel } from "../utils";

interface ImageInfoProps {
  item: ImageItem;

  onFormatChange: (id: string, format: ConversionFormat) => void;
}

export const ImageInfo = ({
  item,
  onFormatChange,
}: ImageInfoProps): React.ReactElement => {
  const originalSize = item.file.size;

  const convertedSize = item.convertedSizeBytes;

  const savingText =
    convertedSize != null ? formatSaving(originalSize, convertedSize) : "";

  return (
    <div style={{ flex: 1, minWidth: 0 }}>
      <p
        style={{
          margin: 0,
          fontWeight: 600,
          fontSize: "0.95rem",
          wordBreak: "break-all",
          color: "#e5e5e5",
        }}
      >
        {item.file.name}
      </p>

      <p
        style={{
          margin: "0.15rem 0 0.2rem",
          fontSize: "0.8rem",
          color: "#b0b0b0",
        }}
      >
        Původní velikost: <strong>{formatFileSize(originalSize)}</strong>
      </p>

      {convertedSize != null && (
        <p
          style={{
            margin: "0 0 0.4rem",
            fontSize: "0.8rem",
            color: "#b0b0b0",
          }}
        >
          Nová velikost: <strong>{formatFileSize(convertedSize)}</strong>
          {savingText && (
            <>
              {" "}
              · <span>{savingText}</span>
            </>
          )}
        </p>
      )}

      <label
        style={{
          display: "block",
          fontSize: "0.8rem",
          marginBottom: "0.15rem",
          color: "#c0c0c0",
        }}
      >
        Cílový formát:
      </label>

      <select
        value={item.outputFormat}
        onChange={(ev) =>
          onFormatChange(item.id, ev.target.value as ConversionFormat)
        }
        style={{
          width: "100%",
          padding: "0.35rem 0.5rem",
          fontSize: "0.85rem",
          borderRadius: "6px",
          border: "1px solid #555555",
          backgroundColor: "#1a1a1a",
          color: "#e5e5e5",
        }}
      >
        <option value="png">PNG (bezstrátové)</option>
        <option value="webp">WebP (často menší, moderní)</option>
        <option value="jpeg">JPEG (fotky, ztrátová)</option>
      </select>
    </div>
  );
};

