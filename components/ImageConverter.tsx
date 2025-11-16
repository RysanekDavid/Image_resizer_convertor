// components/ImageConverter.tsx

import React from "react";

import { useImageConverter } from "./hooks/useImageConverter";

import { UploadArea } from "./UploadArea";

import { QualitySlider } from "./QualitySlider";

import { ControlsBar } from "./ControlsBar";

import { ImageGrid } from "./ImageGrid";

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
          onFormatChangeForAll={handleSetFormatForAll}
          onResizeForAll={handleResizeForAll}
          onConvertAll={handleConvertAll}
          onDownloadAllAsZip={handleDownloadAllAsZip}
        />
      )}

      {images.length === 0 && <EmptyState />}

      {images.length > 0 && (
        <ImageGrid
          images={images}
          onFormatChange={handleFormatChange}
          onResizeToggle={handleResizeToggle}
          onResizeInputChange={handleResizeInputChange}
          onConvert={convertSingleImage}
          onRemove={handleRemoveImage}
        />
      )}
    </section>
  );
};
