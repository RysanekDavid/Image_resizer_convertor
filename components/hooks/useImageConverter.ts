// components/hooks/useImageConverter.ts

import { useImageState } from "./useImageState";

import { useImageFileOperations } from "./useImageFileOperations";

import { useImageConversion } from "./useImageConversion";

import { useImageDownload } from "./useImageDownload";

import { useImageDragDrop } from "./useImageDragDrop";

export const useImageConverter = () => {
  const {
    images,
    setImages,
    globalError,
    setGlobalError,
    quality,
    setQuality,
    isDragOver,
    setIsDragOver,
    isCreatingZip,
    setIsCreatingZip,
    hasConvertedImages,
  } = useImageState();

  const {
    processFiles,
    handleFormatChange,
    handleResizeToggle,
    handleResizeInputChange,
    handleRemoveImage,
    handleClearAll,
    handleSetFormatForAll,
    handleResizeForAll,
  } = useImageFileOperations({
    images,
    setImages,
    setGlobalError,
  });

  const { convertSingleImage, handleConvertAll } = useImageConversion({
    images,
    setImages,
    quality,
  });

  const { handleDownloadAllAsZip } = useImageDownload({
    images,
    setGlobalError,
    setIsCreatingZip,
  });

  const { handleDragOver, handleDragLeave, handleDrop } = useImageDragDrop({
    isDragOver,
    setIsDragOver,
    processFiles,
  });

  return {
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
  };
};
