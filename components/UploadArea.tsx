// components/UploadArea.tsx

import React, { ChangeEvent, DragEvent } from "react";



interface UploadAreaProps {

  onFilesSelected: (files: FileList | File[]) => void;

  isDragOver: boolean;

  onDragOver: (e: DragEvent<HTMLDivElement>) => void;

  onDragLeave: (e: DragEvent<HTMLDivElement>) => void;

  onDrop: (e: DragEvent<HTMLDivElement>) => void;

}



export const UploadArea = ({

  onFilesSelected,

  isDragOver,

  onDragOver,

  onDragLeave,

  onDrop,

}: UploadAreaProps): React.ReactElement => {

  const handleFilesSelected = (e: ChangeEvent<HTMLInputElement>) => {

    const fileList = e.target.files;

    if (!fileList || fileList.length === 0) return;

    onFilesSelected(fileList);

    e.target.value = "";

  };



  return (

    <div

      onDrop={onDrop}

      onDragOver={onDragOver}

      onDragLeave={onDragLeave}

      style={{

        marginBottom: "1.5rem",

        padding: "1.25rem 1rem 1.5rem",

        borderRadius: "10px",

        backgroundColor: isDragOver ? "#3a3a4a" : "#252525",

        border: isDragOver

          ? "2px dashed #3b82f6"

          : "2px dashed #555555",

        transition: "background-color 0.15s ease, border-color 0.15s ease",

      }}

    >

      <label

        htmlFor="multi-image-input"

        style={{

          display: "block",

          marginBottom: "0.35rem",

          fontWeight: 600,

          fontSize: "0.95rem",

          color: "#c0c0c0",

        }}

      >

        Nahrát obrázky

      </label>

      <input

        id="multi-image-input"

        type="file"

        accept="image/png,image/jpeg,image/jpg,image/webp"

        multiple

        onChange={handleFilesSelected}

      />

      <p

        style={{

          marginTop: "0.5rem",

          marginBottom: "0.25rem",

          fontSize: "0.85rem",

          color: "#b0b0b0",

        }}

      >

        Podporované formáty: JPG, JPEG, PNG, WebP. Můžeš nahrát více souborů

        najednou, nebo je sem jednoduše přetáhnout.

      </p>

      <p

        style={{

          margin: 0,

          fontSize: "0.8rem",

          color: "#909090",

        }}

      >

        Přetáhni obrázky do této oblasti pro rychlé nahrání.

      </p>

    </div>

  );

};

