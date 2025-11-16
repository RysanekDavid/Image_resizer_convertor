// components/ImageCard/ImageActions.tsx

import React from "react";

import { ImageItem } from "../types";

import { formatLabel, formatToExtension } from "../utils";

interface ImageActionsProps {
  item: ImageItem;

  onConvert: (item: ImageItem) => void;

  onRemove: (id: string) => void;
}

export const ImageActions = ({
  item,
  onConvert,
  onRemove,
}: ImageActionsProps): React.ReactElement => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: "0.25rem",
        gap: "0.5rem",
        flexWrap: "wrap",
      }}
    >
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <button
          type="button"
          onClick={() => onConvert(item)}
          disabled={item.isConverting}
          style={{
            padding: "0.35rem 0.9rem",
            borderRadius: "999px",
            border: "none",
            cursor: item.isConverting ? "default" : "pointer",
            fontSize: "0.85rem",
            fontWeight: 600,
            backgroundColor: item.isConverting ? "#444444" : "#2563eb",
            color: item.isConverting ? "#909090" : "#ffffff",
          }}
        >
          {item.isConverting ? "Převádím..." : "Převést"}
        </button>

        <button
          type="button"
          onClick={() => onRemove(item.id)}
          style={{
            padding: "0.35rem 0.9rem",
            borderRadius: "999px",
            border: "1px solid #555555",
            cursor: "pointer",
            fontSize: "0.85rem",
            fontWeight: 500,
            backgroundColor: "#1a1a1a",
            color: "#c0c0c0",
          }}
        >
          Odebrat
        </button>
      </div>

      {item.convertedUrl && !item.isConverting && (
        <a
          href={item.convertedUrl}
          download={`${item.file.name.replace(/\.[^/.]+$/, "")}_${
            item.outputFormat
          }.${formatToExtension[item.outputFormat]}`}
          style={{
            fontSize: "0.85rem",
            textDecoration: "none",
            fontWeight: 600,
            color: "#4ade80",
          }}
        >
          Stáhnout jako {formatLabel[item.outputFormat]}
        </a>
      )}
    </div>
  );
};

