// components/ControlsBar.tsx

import React from "react";

import { ConversionFormat } from "./types";



interface ControlsBarProps {

  imagesCount: number;

  hasConvertedImages: boolean;

  isCreatingZip: boolean;

  onFormatChangeForAll: (format: ConversionFormat) => void;

  onResizeForAll: (enabled: boolean, width?: number, height?: number) => void;

  onConvertAll: () => void;

  onDownloadAllAsZip: () => void;

}



export const ControlsBar = ({

  imagesCount,

  hasConvertedImages,

  isCreatingZip,

  onFormatChangeForAll,

  onResizeForAll,

  onConvertAll,

  onDownloadAllAsZip,

}: ControlsBarProps): React.ReactElement => {

  const [resizeEnabled, setResizeEnabled] = React.useState<boolean>(false);

  const [resizeWidth, setResizeWidth] = React.useState<string>("");

  const [resizeHeight, setResizeHeight] = React.useState<string>("");



  const handleResizeApply = () => {

    const width = resizeWidth ? parseInt(resizeWidth, 10) : undefined;

    const height = resizeHeight ? parseInt(resizeHeight, 10) : undefined;

    const validWidth = width && Number.isFinite(width) && width > 0 ? width : undefined;

    const validHeight = height && Number.isFinite(height) && height > 0 ? height : undefined;

    onResizeForAll(resizeEnabled, validWidth, validHeight);

  };



  const handleResizeToggle = (enabled: boolean) => {

    setResizeEnabled(enabled);

    if (!enabled) {

      setResizeWidth("");

      setResizeHeight("");

      onResizeForAll(false);

    }

  };

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

        <p

          style={{

            margin: 0,

            fontSize: "0.95rem",

            color: "#c0c0c0",

          }}

        >

          Nahráno obrázků: <strong>{imagesCount}</strong>

        </p>

        <div

          style={{

            display: "flex",

            gap: "0.75rem",

            alignItems: "center",

            flexWrap: "wrap",

          }}

        >

          <div

            style={{

              display: "flex",

              gap: "0.75rem",

              alignItems: "center",

              flexWrap: "wrap",

            }}

          >

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

              defaultValue="png"

              onChange={(e) => {

                if (e.target.value) {

                  onFormatChangeForAll(e.target.value as ConversionFormat);

                  e.target.value = "png";

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

                  onChange={(e) => handleResizeToggle(e.target.checked)}

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

                    onChange={(e) => setResizeWidth(e.target.value)}

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

                    onChange={(e) => setResizeHeight(e.target.value)}

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

                    onClick={handleResizeApply}

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

          </div>

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

          </div>

        </div>

      </div>

    </div>

  );

};

