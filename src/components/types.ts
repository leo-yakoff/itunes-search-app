export interface Track {
  wrapperType?: string;
  trackId?: number;
  trackName?: string;
  artistName?: string;
  trackTimeMillis?: number;
  trackPrice?: number;
  currency?: string;
  releaseDate?: string;
  primaryGenreName?: string;
  country?: string;
  trackViewUrl?: string;
  shortDescription?: string;
}

export interface ITunesSearchApiResponse {
  resultCount?: number;
  results?: Track[];
}

export interface ApiResponse {
  error?: string;
  response?: ITunesSearchApiResponse;
}
