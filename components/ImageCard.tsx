// components/ImageCard.tsx

import React from "react";

import { ImageItem, ConversionFormat } from "./types";

import {
  formatFileSize,
  formatSaving,
  formatLabel,
  formatToExtension,
} from "./utils";

interface ImageCardProps {
  item: ImageItem;

  onFormatChange: (id: string, format: ConversionFormat) => void;

  onResizeToggle: (id: string) => void;

  onResizeInputChange: (
    id: string,

    field: "width" | "height",

    value: string
  ) => void;

  onConvert: (item: ImageItem) => void;

  onRemove: (id: string) => void;
}

export const ImageCard = ({
  item,

  onFormatChange,

  onResizeToggle,

  onResizeInputChange,

  onConvert,

  onRemove,
}: ImageCardProps): React.ReactElement => {
  const originalSize = item.file.size;

  const convertedSize = item.convertedSizeBytes;

  const savingText =
    convertedSize != null ? formatSaving(originalSize, convertedSize) : "";

  return (
    <article
      style={{
        borderRadius: "10px",

        border: "1px solid #444444",

        padding: "0.75rem",

        backgroundColor: "#1a1a1a",

        display: "flex",

        flexDirection: "column",

        gap: "0.5rem",
      }}
    >
      <div
        style={{
          display: "flex",

          gap: "0.75rem",
        }}
      >
        <div
          style={{
            width: "96px",

            height: "96px",

            borderRadius: "8px",

            overflow: "hidden",

            border: "1px solid #444444",

            flexShrink: 0,

            backgroundColor: "#1a1a1a",

            display: "flex",

            alignItems: "center",

            justifyContent: "center",
          }}
        >
          <img
            src={item.previewUrl}
            alt={item.file.name}
            style={{
              maxWidth: "100%",

              maxHeight: "100%",

              objectFit: "contain",
            }}
          />
        </div>

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

          {/* Resize controls */}

          <div
            style={{
              marginTop: "0.5rem",

              padding: "0.5rem",

              borderRadius: "6px",

              backgroundColor: "#252525",

              border: "1px solid #444444",
            }}
          >
            <label
              style={{
                display: "flex",

                alignItems: "center",

                gap: "0.5rem",

                fontSize: "0.8rem",

                color: "#c0c0c0",

                marginBottom: "0.4rem",

                cursor: "pointer",
              }}
            >
              <input
                type="checkbox"
                checked={item.resizeEnabled || false}
                onChange={() => onResizeToggle(item.id)}
                style={{ cursor: "pointer" }}
              />

              <span>Zmenšit rozměry</span>
            </label>

            {item.resizeEnabled && (
              <div
                style={{
                  display: "flex",

                  gap: "0.5rem",

                  alignItems: "center",
                }}
              >
                <div style={{ flex: 1 }}>
                  <label
                    style={{
                      display: "block",

                      fontSize: "0.75rem",

                      color: "#b0b0b0",

                      marginBottom: "0.2rem",
                    }}
                  >
                    Šířka (px):
                  </label>

                  <input
                    type="number"
                    min={1}
                    value={item.targetWidth || ""}
                    onChange={(e) =>
                      onResizeInputChange(item.id, "width", e.target.value)
                    }
                    placeholder="auto"
                    style={{
                      width: "100%",

                      padding: "0.3rem 0.4rem",

                      fontSize: "0.8rem",

                      borderRadius: "4px",

                      border: "1px solid #555555",

                      backgroundColor: "#1a1a1a",

                      color: "#e5e5e5",
                    }}
                  />
                </div>

                <div style={{ flex: 1 }}>
                  <label
                    style={{
                      display: "block",

                      fontSize: "0.75rem",

                      color: "#b0b0b0",

                      marginBottom: "0.2rem",
                    }}
                  >
                    Výška (px):
                  </label>

                  <input
                    type="number"
                    min={1}
                    value={item.targetHeight || ""}
                    onChange={(e) =>
                      onResizeInputChange(item.id, "height", e.target.value)
                    }
                    placeholder="auto"
                    style={{
                      width: "100%",

                      padding: "0.3rem 0.4rem",

                      fontSize: "0.8rem",

                      borderRadius: "4px",

                      border: "1px solid #555555",

                      backgroundColor: "#1a1a1a",

                      color: "#e5e5e5",
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {item.error && (
        <p
          style={{
            margin: 0,

            fontSize: "0.8rem",

            color: "#ff6b6b",

            backgroundColor: "#4a1a1a",

            borderRadius: "6px",

            padding: "0.3rem 0.4rem",
          }}
        >
          {item.error}
        </p>
      )}

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
    </article>
  );
};
