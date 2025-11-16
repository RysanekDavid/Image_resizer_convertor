// components/hooks/useImageDragDrop.ts

import { useCallback } from "react";

interface UseImageDragDropProps {
  isDragOver: boolean;

  setIsDragOver: React.Dispatch<React.SetStateAction<boolean>>;

  processFiles: (files: FileList | File[]) => void;
}

export const useImageDragDrop = ({
  isDragOver,
  setIsDragOver,
  processFiles,
}: UseImageDragDropProps) => {
  const handleDragOver = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();

      e.stopPropagation();

      if (!isDragOver) setIsDragOver(true);
    },
    [isDragOver, setIsDragOver]
  );

  const handleDragLeave = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();

      e.stopPropagation();

      setIsDragOver(false);
    },
    [setIsDragOver]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();

      e.stopPropagation();

      setIsDragOver(false);

      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        processFiles(e.dataTransfer.files);

        e.dataTransfer.clearData();
      }
    },
    [processFiles, setIsDragOver]
  );

  return {
    handleDragOver,
    handleDragLeave,
    handleDrop,
  };
};

