// components/hooks/useImageConverter.ts

import { useCallback, useState } from "react";

import { ImageItem, ConversionFormat } from "../types";

import { supportedInputMime, formatToMime, createId } from "../utils";



export const useImageConverter = () => {

  const [images, setImages] = useState<ImageItem[]>([]);

  const [globalError, setGlobalError] = useState<string | null>(null);

  const [quality, setQuality] = useState<number>(0.8);

  const [isDragOver, setIsDragOver] = useState<boolean>(false);

  const [isCreatingZip, setIsCreatingZip] = useState<boolean>(false);



  const processFiles = useCallback((files: FileList | File[]) => {

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

  }, [images.length]);



  const handleFormatChange = useCallback((id: string, format: ConversionFormat) => {

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

  }, []);



  const handleResizeToggle = useCallback((id: string) => {

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

  }, []);



  const handleResizeInputChange = useCallback((

    id: string,

    field: "width" | "height",

    value: string

  ) => {

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

  }, []);



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

    [quality]

  );



  const handleConvertAll = useCallback(() => {

    images.forEach((item) => {

      convertSingleImage(item);

    });

  }, [images, convertSingleImage]);



  const handleRemoveImage = useCallback((id: string) => {

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

  }, []);



  const handleSetFormatForAll = useCallback((format: ConversionFormat) => {

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

  }, []);



  const handleResizeForAll = useCallback((

    enabled: boolean,

    width?: number,

    height?: number

  ) => {

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

  }, []);



  const handleDownloadAllAsZip = useCallback(async () => {

    const convertedImages = images.filter(

      (img) => img.convertedUrl && !img.isConverting

    );



    if (convertedImages.length === 0) {

      setGlobalError("Nejsou žádné zkonvertované obrázky ke stažení.");

      return;

    }



    setIsCreatingZip(true);

    setGlobalError(null);



    try {

      const JSZip = (await import("jszip")).default;

      const zip = new JSZip();



      const promises = convertedImages.map(async (item) => {

        const response = await fetch(item.convertedUrl!);

        const blob = await response.blob();

        const fileName = `${item.file.name.replace(/\.[^/.]+$/, "")}.${

          item.outputFormat

        }`;

        zip.file(fileName, blob);

      });



      await Promise.all(promises);

      const zipBlob = await zip.generateAsync({ type: "blob" });

      const zipUrl = URL.createObjectURL(zipBlob);

      const link = document.createElement("a");

      link.href = zipUrl;

      link.download = `konvertovane-obrazky-${Date.now()}.zip`;

      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);

      setTimeout(() => URL.revokeObjectURL(zipUrl), 100);

    } catch (error) {

      console.error("Chyba při vytváření ZIP:", error);

      setGlobalError("Nepodařilo se vytvořit ZIP soubor. Zkuste to znovu.");

    } finally {

      setIsCreatingZip(false);

    }

  }, [images]);



  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {

    e.preventDefault();

    e.stopPropagation();

    if (!isDragOver) setIsDragOver(true);

  }, [isDragOver]);



  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {

    e.preventDefault();

    e.stopPropagation();

    setIsDragOver(false);

  }, []);



  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {

    e.preventDefault();

    e.stopPropagation();

    setIsDragOver(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {

      processFiles(e.dataTransfer.files);

      e.dataTransfer.clearData();

    }

  }, [processFiles]);



  const hasConvertedImages =

    images.filter((img) => img.convertedUrl && !img.isConverting).length > 0;



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

    handleSetFormatForAll,

    handleResizeForAll,

    handleDownloadAllAsZip,

    handleDragOver,

    handleDragLeave,

    handleDrop,

  };

};

