// components/hooks/useImageConversion.ts

import { useCallback } from "react";

import { ImageItem } from "../types";

import { formatToMime } from "../utils";

interface UseImageConversionProps {
  images: ImageItem[];

  setImages: React.Dispatch<React.SetStateAction<ImageItem[]>>;

  quality: number;
}

export const useImageConversion = ({
  images,
  setImages,
  quality,
}: UseImageConversionProps) => {
  const convertSingleImage = useCallback(
    (item: ImageItem) => {
      const mimeType = formatToMime[item.outputFormat];

      setImages((prev) =>
        prev.map((img) =>
          img.id === item.id
            ? { ...img, isConverting: true, error: undefined }
            : img
        )
      );

      const imgEl = new Image();

      imgEl.onload = () => {
        try {
          const originalWidth = imgEl.naturalWidth || imgEl.width;

          const originalHeight = imgEl.naturalHeight || imgEl.height;

          let destWidth = originalWidth;

          let destHeight = originalHeight;

          if (item.resizeEnabled) {
            const hasW = typeof item.targetWidth === "number";

            const hasH = typeof item.targetHeight === "number";

            const aspect = originalWidth / originalHeight;

            if (hasW && hasH) {
              destWidth = item.targetWidth!;

              destHeight = item.targetHeight!;
            } else if (hasW && !hasH) {
              destWidth = item.targetWidth!;

              destHeight = Math.round(destWidth / aspect);
            } else if (!hasW && hasH) {
              destHeight = item.targetHeight!;

              destWidth = Math.round(destHeight * aspect);
            }
          }

          const canvas = document.createElement("canvas");

          canvas.width = destWidth;

          canvas.height = destHeight;

          const ctx = canvas.getContext("2d");

          if (!ctx) {
            setImages((prev) =>
              prev.map((img) =>
                img.id === item.id
                  ? {
                      ...img,

                      isConverting: false,

                      error: "Nepodařilo se získat 2D kontext canvasu.",
                    }
                  : img
              )
            );

            return;
          }

          ctx.drawImage(imgEl, 0, 0, destWidth, destHeight);

          const needsQuality =
            item.outputFormat === "jpeg" || item.outputFormat === "webp";

          canvas.toBlob(
            (blob) => {
              if (!blob) {
                setImages((prev) =>
                  prev.map((img) =>
                    img.id === item.id
                      ? {
                          ...img,

                          isConverting: false,

                          error:
                            "Konverze do vybraného formátu není podporována.",
                        }
                      : img
                  )
                );

                return;
              }

              const newBlobUrl = URL.createObjectURL(blob);

              const newSize = blob.size;

              setImages((prev) =>
                prev.map((img) => {
                  if (img.id !== item.id) return img;

                  if (img.convertedUrl) {
                    URL.revokeObjectURL(img.convertedUrl);
                  }

                  return {
                    ...img,

                    convertedUrl: newBlobUrl,

                    convertedSizeBytes: newSize,

                    isConverting: false,

                    error: undefined,
                  };
                })
              );
            },

            mimeType,

            needsQuality ? quality : undefined
          );
        } catch (err) {
          console.error(err);

          setImages((prev) =>
            prev.map((img) =>
              img.id === item.id
                ? {
                    ...img,

                    isConverting: false,

                    error: "Při konverzi došlo k chybě.",
                  }
                : img
            )
          );
        }
      };

      imgEl.onerror = () => {
        setImages((prev) =>
          prev.map((img) =>
            img.id === item.id
              ? {
                  ...img,

                  isConverting: false,

                  error: "Obrázek se nepodařilo načíst.",
                }
              : img
          )
        );
      };

      imgEl.src = item.previewUrl;
    },
    [setImages, quality]
  );

  const handleConvertAll = useCallback(() => {
    images.forEach((item) => {
      convertSingleImage(item);
    });
  }, [images, convertSingleImage]);

  return {
    convertSingleImage,
    handleConvertAll,
  };
};

