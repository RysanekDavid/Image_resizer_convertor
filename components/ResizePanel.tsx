// components/ResizePanel.tsx

import React from "react";

import { ImageItem } from "./types";

interface ResizePanelProps {
  images: ImageItem[];

  onResizeToggle: (id: string) => void;

  onResizeInputChange: (
    id: string,
    field: "width" | "height",
    value: string
  ) => void;
}

export const ResizePanel = ({
  images,
  onResizeToggle,
  onResizeInputChange,
}: ResizePanelProps): React.ReactElement => {
  const [isExpanded, setIsExpanded] = React.useState<boolean>(false);

  const hasResizeEnabled = images.some((img) => img.resizeEnabled);

  if (images.length === 0) return <></>;

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
          marginBottom: isExpanded ? "0.75rem" : "0",
        }}
      >
        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            fontSize: "0.9rem",
            color: "#c0c0c0",
            cursor: "pointer",
            fontWeight: 500,
          }}
        >
          <input
            type="checkbox"
            checked={isExpanded}
            onChange={(e) => setIsExpanded(e.target.checked)}
            style={{ cursor: "pointer" }}
          />
          <span>
            Změnit rozměry jednotlivých obrázků
            {hasResizeEnabled && (
              <span style={{ color: "#4ade80", marginLeft: "0.5rem" }}>
                ({images.filter((img) => img.resizeEnabled).length} aktivní)
              </span>
            )}
          </span>
        </label>
      </div>

      {isExpanded && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "0.75rem",
          }}
        >
          {images.map((item) => (
            <div
              key={item.id}
              style={{
                padding: "0.75rem",
                borderRadius: "8px",
                backgroundColor: "#1a1a1a",
                border: "1px solid #444444",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  marginBottom: "0.5rem",
                }}
              >
                <input
                  type="checkbox"
                  checked={item.resizeEnabled || false}
                  onChange={() => onResizeToggle(item.id)}
                  style={{ cursor: "pointer" }}
                />
                <span
                  style={{
                    fontSize: "0.85rem",
                    color: "#c0c0c0",
                    fontWeight: 500,
                    flex: 1,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                  title={item.file.name}
                >
                  {item.file.name}
                </span>
              </div>

              {item.resizeEnabled && (
                <div
                  style={{
                    display: "flex",
                    gap: "0.5rem",
                    alignItems: "flex-end",
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <label
                      style={{
                        display: "block",
                        fontSize: "0.75rem",
                        color: "#b0b0b0",
                        marginBottom: "0.25rem",
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
                        padding: "0.35rem 0.5rem",
                        fontSize: "0.8rem",
                        borderRadius: "4px",
                        border: "1px solid #555555",
                        backgroundColor: "#252525",
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
                        marginBottom: "0.25rem",
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
                        padding: "0.35rem 0.5rem",
                        fontSize: "0.8rem",
                        borderRadius: "4px",
                        border: "1px solid #555555",
                        backgroundColor: "#252525",
                        color: "#e5e5e5",
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

