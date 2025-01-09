import { ApiResponse } from "./types";

export const callApi = async (
  params: URLSearchParams
): Promise<ApiResponse> => {
  try {
    const response = await fetch(
      `https://itunes.apple.com/search?${params.toString()}`
    );
    if (!response.ok) {
      return { error: `Response status: ${response.status}` };
    }
    const json = await response.json();
    return { response: json };
  } catch (error) {
    return { error: error.message };
  }
};

export const formatDuration = (
  milliseconds: number | undefined
): string | undefined => {
  if (!milliseconds) {
    return;
  }

  const SEPARATOR = ":";

  const seconds = Math.floor((milliseconds / 1000) % 60);
  const minutes = Math.floor((milliseconds / 1000 / 60) % 60);
  const hours = Math.floor((milliseconds / 1000 / 60 / 60) % 24);

  const convertToString = (value: number) => value.toString().padStart(2, "0");

  return `${convertToString(hours)}${SEPARATOR}${convertToString(
    minutes
  )}${SEPARATOR}${convertToString(seconds)}`;
};

export const formatDate = (date: string | undefined): string | undefined => {
  if (!date) {
    return;
  }

  const dateVal = new Date(date);
  return dateVal.toLocaleDateString();
};

export const getHostName = (url: string | undefined): string | undefined => {
  if (!url) {
    return;
  }
  const urlVal = new URL(url);
  return urlVal.hostname;
};
