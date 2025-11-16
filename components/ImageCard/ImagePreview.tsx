// components/ImageCard/ImagePreview.tsx

import React from "react";

interface ImagePreviewProps {
  previewUrl: string;

  fileName: string;
}

export const ImagePreview = ({
  previewUrl,
  fileName,
}: ImagePreviewProps): React.ReactElement => {
  return (
    <div
      style={{
        width: "96px",
        height: "96px",
        borderRadius: "8px",
        overflow: "hidden",
        border: "1px solid #444444",
        flexShrink: 0,
        backgroundColor: "#1a1a1a",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img
        src={previewUrl}
        alt={fileName}
        style={{
          maxWidth: "100%",
          maxHeight: "100%",
          objectFit: "contain",
        }}
      />
    </div>
  );
};

