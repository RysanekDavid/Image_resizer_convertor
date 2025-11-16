// components/hooks/useImageDownload.ts

import { useCallback } from "react";

import { ImageItem } from "../types";

import { formatToExtension } from "../utils";

interface UseImageDownloadProps {
  images: ImageItem[];

  setGlobalError: React.Dispatch<React.SetStateAction<string | null>>;

  setIsCreatingZip: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useImageDownload = ({
  images,
  setGlobalError,
  setIsCreatingZip,
}: UseImageDownloadProps) => {
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

        const fileName = `${item.file.name.replace(/\.[^/.]+$/, "")}_${
          item.outputFormat
        }.${formatToExtension[item.outputFormat]}`;

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
  }, [images, setGlobalError, setIsCreatingZip]);

  return {
    handleDownloadAllAsZip,
  };
};

