// components/utils.ts

import { ConversionFormat } from "./types";



export const supportedInputMime = /image\/(png|jpg|jpeg|webp)/i;



export const formatToMime: Record<ConversionFormat, string> = {

  webp: "image/webp",

  jpeg: "image/jpeg",

  png: "image/png",

};



export const formatLabel: Record<ConversionFormat, string> = {

  webp: "WebP",

  jpeg: "JPEG",

  png: "PNG",

};



export const formatToExtension: Record<ConversionFormat, string> = {

  webp: "webp",

  jpeg: "jpg",

  png: "png",

};



export const createId = (): string => {

  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {

    // @ts-expect-error – TS nemusí mít randomUUID v typech

    return crypto.randomUUID();

  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;

};



export const formatFileSize = (bytes: number): string => {

  if (!Number.isFinite(bytes) || bytes <= 0) return "0 B";

  const k = 1024;

  const sizes = ["B", "KB", "MB", "GB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  const value = bytes / Math.pow(k, i);

  return `${value.toFixed(1)} ${sizes[i]}`;

};



export const formatSaving = (original: number, converted: number): string => {

  if (!original || !converted) return "";

  const ratio = converted / original;

  const diffPercent = (1 - ratio) * 100;



  if (diffPercent >= 0) {

    return `Úspora přibližně ${diffPercent.toFixed(1)} %`;

  } else {

    return `Navýšení přibližně ${Math.abs(diffPercent).toFixed(1)} %`;

  }

};

