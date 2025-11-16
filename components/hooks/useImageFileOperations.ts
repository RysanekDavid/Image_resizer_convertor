// components/hooks/useImageFileOperations.ts

import { useCallback } from "react";

import { ImageItem, ConversionFormat } from "../types";

import { supportedInputMime, createId } from "../utils";

interface UseImageFileOperationsProps {
  images: ImageItem[];

  setImages: React.Dispatch<React.SetStateAction<ImageItem[]>>;

  setGlobalError: React.Dispatch<React.SetStateAction<string | null>>;
}

export const useImageFileOperations = ({
  images,
  setImages,
  setGlobalError,
}: UseImageFileOperationsProps) => {
  const processFiles = useCallback(
    (files: FileList | File[]) => {
      setGlobalError(null);

      const fileArray = Array.from(files);

      const newItems: ImageItem[] = [];

      for (const file of fileArray) {
        if (!file.type.match(supportedInputMime)) {
          setGlobalError("Nahrávat lze pouze obrázky JPG, PNG nebo WebP.");

          continue;
        }

        const previewUrl = URL.createObjectURL(file);

        const defaultFormat: ConversionFormat = "png";

        newItems.push({
          id: createId(),

          file,

          previewUrl,

          outputFormat: defaultFormat,

          convertedUrl: undefined,

          convertedSizeBytes: undefined,

          isConverting: false,

          error: undefined,

          resizeEnabled: false,

          targetWidth: undefined,

          targetHeight: undefined,
        });
      }

      if (newItems.length === 0 && images.length === 0) {
        setGlobalError("Nebyl nahrán žádný validní obrázek.");
      }

      setImages((prev) => [...prev, ...newItems]);
    },
    [images.length, setImages, setGlobalError]
  );

  const handleFormatChange = useCallback(
    (id: string, format: ConversionFormat) => {
      setImages((prev) =>
        prev.map((img) =>
          img.id === id
            ? {
                ...img,

                outputFormat: format,

                convertedUrl: undefined,

                convertedSizeBytes: undefined,

                error: undefined,
              }
            : img
        )
      );
    },
    [setImages]
  );

  const handleResizeToggle = useCallback(
    (id: string) => {
      setImages((prev) =>
        prev.map((img) =>
          img.id === id
            ? {
                ...img,

                resizeEnabled: !img.resizeEnabled,
              }
            : img
        )
      );
    },
    [setImages]
  );

  const handleResizeInputChange = useCallback(
    (id: string, field: "width" | "height", value: string) => {
      const numeric = parseInt(value, 10);

      const cleanValue =
        Number.isFinite(numeric) && numeric > 0 ? numeric : undefined;

      setImages((prev) =>
        prev.map((img) => {
          if (img.id !== id) return img;

          if (field === "width") {
            return {
              ...img,

              targetWidth: cleanValue,

              convertedUrl: undefined,

              convertedSizeBytes: undefined,

              error: undefined,
            };
          } else {
            return {
              ...img,

              targetHeight: cleanValue,

              convertedUrl: undefined,

              convertedSizeBytes: undefined,

              error: undefined,
            };
          }
        })
      );
    },
    [setImages]
  );

  const handleRemoveImage = useCallback(
    (id: string) => {
      setImages((prev) => {
        const toRemove = prev.find((img) => img.id === id);

        if (toRemove) {
          URL.revokeObjectURL(toRemove.previewUrl);

          if (toRemove.convertedUrl) {
            URL.revokeObjectURL(toRemove.convertedUrl);
          }
        }

        return prev.filter((img) => img.id !== id);
      });
    },
    [setImages]
  );

  const handleClearAll = useCallback(() => {
    setImages((prev) => {
      prev.forEach((img) => {
        URL.revokeObjectURL(img.previewUrl);

        if (img.convertedUrl) {
          URL.revokeObjectURL(img.convertedUrl);
        }
      });

      return [];
    });

    setGlobalError(null);
  }, [setImages, setGlobalError]);

  const handleSetFormatForAll = useCallback(
    (format: ConversionFormat) => {
      setImages((prev) =>
        prev.map((img) => ({
          ...img,

          outputFormat: format,

          convertedUrl: img.convertedUrl
            ? (() => {
                URL.revokeObjectURL(img.convertedUrl!);

                return undefined;
              })()
            : undefined,

          convertedSizeBytes: undefined,

          error: undefined,
        }))
      );
    },
    [setImages]
  );

  const handleResizeForAll = useCallback(
    (enabled: boolean, width?: number, height?: number) => {
      setImages((prev) =>
        prev.map((img) => ({
          ...img,

          resizeEnabled: enabled,

          targetWidth: enabled ? width : undefined,

          targetHeight: enabled ? height : undefined,

          convertedUrl: img.convertedUrl
            ? (() => {
                URL.revokeObjectURL(img.convertedUrl!);

                return undefined;
              })()
            : undefined,

          convertedSizeBytes: undefined,

          error: undefined,
        }))
      );
    },
    [setImages]
  );

  return {
    processFiles,
    handleFormatChange,
    handleResizeToggle,
    handleResizeInputChange,
    handleRemoveImage,
    handleClearAll,
    handleSetFormatForAll,
    handleResizeForAll,
  };
};

