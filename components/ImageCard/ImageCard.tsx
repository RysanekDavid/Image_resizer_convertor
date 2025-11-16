// components/ImageCard/ImageCard.tsx

import React from "react";

import { ImageItem, ConversionFormat } from "../types";

import { ImagePreview } from "./ImagePreview";

import { ImageInfo } from "./ImageInfo";

import { ImageActions } from "./ImageActions";

interface ImageCardProps {
  item: ImageItem;

  onFormatChange: (id: string, format: ConversionFormat) => void;

  onConvert: (item: ImageItem) => void;

  onRemove: (id: string) => void;
}

export const ImageCard = ({
  item,
  onFormatChange,
  onConvert,
  onRemove,
}: ImageCardProps): React.ReactElement => {
  return (
    <article
      style={{
        borderRadius: "10px",
        border: "1px solid #444444",
        padding: "0.75rem",
        backgroundColor: "#1a1a1a",
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "0.75rem",
        }}
      >
        <ImagePreview previewUrl={item.previewUrl} fileName={item.file.name} />

        <ImageInfo item={item} onFormatChange={onFormatChange} />
      </div>

      {item.error && (
        <p
          style={{
            margin: 0,
            fontSize: "0.8rem",
            color: "#ff6b6b",
            backgroundColor: "#4a1a1a",
            borderRadius: "6px",
            padding: "0.3rem 0.4rem",
          }}
        >
          {item.error}
        </p>
      )}

      <ImageActions item={item} onConvert={onConvert} onRemove={onRemove} />
    </article>
  );
};

