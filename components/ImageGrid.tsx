// components/ImageGrid.tsx

import React from "react";

import { ImageItem, ConversionFormat } from "./types";

import { ImageCard } from "./ImageCard/ImageCard";

interface ImageGridProps {
  images: ImageItem[];

  onFormatChange: (id: string, format: ConversionFormat) => void;

  onConvert: (item: ImageItem) => void;

  onRemove: (id: string) => void;
}

export const ImageGrid = ({
  images,
  onFormatChange,
  onConvert,
  onRemove,
}: ImageGridProps): React.ReactElement => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: "1rem",
      }}
    >
      {images.map((item) => (
        <ImageCard
          key={item.id}
          item={item}
          onFormatChange={onFormatChange}
          onConvert={onConvert}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
};
