// components/ImageConverter.tsx

import React from "react";

import { ConversionFormat } from "./types";

import { useImageConverter } from "./hooks/useImageConverter";

import { UploadArea } from "./UploadArea";

import { QualitySlider } from "./QualitySlider";

import { ControlsBar } from "./ControlsBar/ControlsBar";

import { ImageGrid } from "./ImageGrid";

import { ResizePanel } from "./ResizePanel";

import { StatisticsBar } from "./StatisticsBar";

import { ErrorMessage } from "./ErrorMessage";

import { EmptyState } from "./EmptyState";

import { SelectStyles } from "./SelectStyles";

export const ImageConverter = (): React.ReactElement => {
  const {
    images,

    globalError,

    quality,

    setQuality,

    isDragOver,

    isCreatingZip,

    hasConvertedImages,

    processFiles,

    handleFormatChange,

    handleResizeToggle,

    handleResizeInputChange,

    convertSingleImage,

    handleConvertAll,

    handleRemoveImage,

    handleClearAll,

    handleSetFormatForAll,

    handleResizeForAll,

    handleDownloadAllAsZip,

    handleDragOver,

    handleDragLeave,

    handleDrop,
  } = useImageConverter();

  return (
    <section>
      <SelectStyles />

      <UploadArea
        onFilesSelected={processFiles}
        isDragOver={isDragOver}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      />

      <QualitySlider quality={quality} onQualityChange={setQuality} />

      {globalError && <ErrorMessage message={globalError} />}

      {images.length > 0 && (
        <ControlsBar
          imagesCount={images.length}
          hasConvertedImages={hasConvertedImages}
          isCreatingZip={isCreatingZip}
          currentFormat={
            images.length > 0
              ? (() => {
                  const formats = images.map((img) => img.outputFormat);
                  const formatCounts = formats.reduce((acc, format) => {
                    acc[format] = (acc[format] || 0) + 1;
                    return acc;
                  }, {} as Record<ConversionFormat, number>);
                  const mostCommon = Object.entries(formatCounts).sort(
                    (a, b) => b[1] - a[1]
                  )[0]?.[0] as ConversionFormat | undefined;
                  return mostCommon;
                })()
              : undefined
          }
          onFormatChangeForAll={handleSetFormatForAll}
          onResizeForAll={handleResizeForAll}
          onConvertAll={handleConvertAll}
          onDownloadAllAsZip={handleDownloadAllAsZip}
          onClearAll={handleClearAll}
        />
      )}

      {images.length === 0 && <EmptyState />}

      {images.length > 0 && (
        <>
          <StatisticsBar images={images} />
          <ResizePanel
            images={images}
            onResizeToggle={handleResizeToggle}
            onResizeInputChange={handleResizeInputChange}
          />
          <ImageGrid
            images={images}
            onFormatChange={handleFormatChange}
            onConvert={convertSingleImage}
            onRemove={handleRemoveImage}
          />
        </>
      )}
    </section>
  );
};
