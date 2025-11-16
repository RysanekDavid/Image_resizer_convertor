// components/ControlsBar/ControlsBar.tsx

import React from "react";

import { ConversionFormat } from "../types";

import { FormatSelector } from "./FormatSelector";

import { ResizeControls } from "./ResizeControls";

import { ActionButtons } from "./ActionButtons";

interface ControlsBarProps {
  imagesCount: number;

  hasConvertedImages: boolean;

  isCreatingZip: boolean;

  currentFormat?: ConversionFormat;

  onFormatChangeForAll: (format: ConversionFormat) => void;

  onResizeForAll: (enabled: boolean, width?: number, height?: number) => void;

  onConvertAll: () => void;

  onDownloadAllAsZip: () => void;

  onClearAll: () => void;
}

export const ControlsBar = ({
  imagesCount,
  hasConvertedImages,
  isCreatingZip,
  currentFormat,
  onFormatChangeForAll,
  onResizeForAll,
  onConvertAll,
  onDownloadAllAsZip,
  onClearAll,
}: ControlsBarProps): React.ReactElement => {
  const [resizeEnabled, setResizeEnabled] = React.useState<boolean>(false);

  const [resizeWidth, setResizeWidth] = React.useState<string>("");

  const [resizeHeight, setResizeHeight] = React.useState<string>("");

  const handleResizeApply = () => {
    const width = resizeWidth ? parseInt(resizeWidth, 10) : undefined;

    const height = resizeHeight ? parseInt(resizeHeight, 10) : undefined;

    const validWidth =
      width && Number.isFinite(width) && width > 0 ? width : undefined;

    const validHeight =
      height && Number.isFinite(height) && height > 0 ? height : undefined;

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
            <FormatSelector
              currentFormat={currentFormat}
              onFormatChangeForAll={onFormatChangeForAll}
            />

            <ResizeControls
              resizeEnabled={resizeEnabled}
              resizeWidth={resizeWidth}
              resizeHeight={resizeHeight}
              onResizeToggle={handleResizeToggle}
              onResizeWidthChange={setResizeWidth}
              onResizeHeightChange={setResizeHeight}
              onResizeApply={handleResizeApply}
            />
          </div>

          <ActionButtons
            hasConvertedImages={hasConvertedImages}
            isCreatingZip={isCreatingZip}
            onConvertAll={onConvertAll}
            onDownloadAllAsZip={onDownloadAllAsZip}
            onClearAll={onClearAll}
          />
        </div>
      </div>
    </div>
  );
};

