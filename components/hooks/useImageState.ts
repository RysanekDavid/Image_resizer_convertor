// components/hooks/useImageState.ts

import { useState } from "react";

import { ImageItem } from "../types";

export const useImageState = () => {
  const [images, setImages] = useState<ImageItem[]>([]);

  const [globalError, setGlobalError] = useState<string | null>(null);

  const [quality, setQuality] = useState<number>(0.8);

  const [isDragOver, setIsDragOver] = useState<boolean>(false);

  const [isCreatingZip, setIsCreatingZip] = useState<boolean>(false);

  const hasConvertedImages =
    images.filter((img) => img.convertedUrl && !img.isConverting).length > 0;

  return {
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
  };
};

