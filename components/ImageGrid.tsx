// components/ImageGrid.tsx

import React from "react";

import { ImageItem, ConversionFormat } from "./types";

import { ImageCard } from "./ImageCard";



interface ImageGridProps {

  images: ImageItem[];

  onFormatChange: (id: string, format: ConversionFormat) => void;

  onResizeToggle: (id: string) => void;

  onResizeInputChange: (

    id: string,

    field: "width" | "height",

    value: string

  ) => void;

  onConvert: (item: ImageItem) => void;

  onRemove: (id: string) => void;

}



export const ImageGrid = ({

  images,

  onFormatChange,

  onResizeToggle,

  onResizeInputChange,

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

          onResizeToggle={onResizeToggle}

          onResizeInputChange={onResizeInputChange}

          onConvert={onConvert}

          onRemove={onRemove}

        />

      ))}

    </div>

  );

};

