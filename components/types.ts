// components/types.ts

export type ConversionFormat = "webp" | "jpeg" | "png";



export interface ImageItem {

  id: string;

  file: File;

  previewUrl: string;

  outputFormat: ConversionFormat;

  convertedUrl?: string;

  convertedSizeBytes?: number;

  isConverting: boolean;

  error?: string;

  // resize nastavení

  resizeEnabled?: boolean;

  targetWidth?: number;

  targetHeight?: number;

}

