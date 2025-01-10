import React from "react";

import "../styles/App.scss";
import { ITunesSearchApiResponse, Track } from "./types";
import { callApi, formatDate, formatDuration, getHostName } from "./utils";

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [searchResult, setSearchResult] =
    React.useState<ITunesSearchApiResponse>();
  const [searchError, setSearchError] = React.useState("");

  const runSearch = () => {
    const params = new URLSearchParams({ term: searchTerm });

    setIsLoading(true);

    callApi(params).then((response) => {
      setIsLoading(false);

      if (response.error) {
        setSearchError(response.error);
        setSearchResult(undefined);
      } else {
        setSearchError("");
        setSearchResult(response.response);
      }
    });
  };

  const handleChangeSearchTerm = (value: string) => {
    if (!value.length) {
      setSearchError("");
      setSearchResult(undefined);
    }
    setSearchTerm(value);
  };

  const handleKeyPress = (value: string) => {
    if (value === "Enter" && searchTerm?.length) {
      runSearch();
    }
  };

  const getSearchResult = () => {
    if (isLoading) {
      return <h2 className="result-header">Loading...</h2>;
    }

    if (searchError) {
      return <p className="result-header">Search error: {searchError}</p>;
    }

    if (searchResult?.results?.length) {
      return (
        <table>
          <caption>
            <h2>{`Search results${
              searchResult?.resultCount ? ` (${searchResult.resultCount})` : ""
            }:`}</h2>
          </caption>
          <thead>
            <tr>
              <th>Type</th>
              <th>Track name</th>
              <th>Artist</th>
              <th>Track time</th>
              <th>Track price</th>
              <th>Release date</th>
              <th>Primary genre</th>
              <th>Country</th>
              <th>View URL</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {searchResult.results.map((item: Track, index: number) => (
              <tr key={(item.trackId ?? index).toString()}>
                <td>{item.wrapperType}</td>
                <td>{item.trackName}</td>
                <td>{item.artistName}</td>
                <td>{formatDuration(item.trackTimeMillis)}</td>
                <td>
                  {item.trackPrice ? `${item.trackPrice} ${item.currency}` : ""}
                </td>
                <td>{formatDate(item.releaseDate)}</td>
                <td>{item.primaryGenreName}</td>
                <td>{item.country}</td>
                <td className="track-url">
                  {item.trackViewUrl && (
                    <a href={item.trackViewUrl}>
                      {getHostName(item.trackViewUrl)}
                    </a>
                  )}
                </td>
                <td>{item.shortDescription}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }

    return (
      <p className="result-header">{`Search results: ${
        searchResult?.resultCount ?? 0
      }`}</p>
    );
  };

  const renderResult = React.useMemo(() => {
    if (isLoading || searchResult || searchError) {
      return <div className="search-results">{getSearchResult()}</div>;
    }
  }, [isLoading, searchResult, searchError]);

  return (
    <>
      <h1>iTunes search app</h1>
      <search>
        <input
          type="search"
          value={searchTerm}
          placeholder="Type text to search"
          onChange={(e) => handleChangeSearchTerm(e.target.value)}
          onKeyDown={(e) => handleKeyPress(e.key)}
        />
        <button
          type="button"
          disabled={!searchTerm?.length}
          onClick={runSearch}
        >
          Search
        </button>
      </search>
      {renderResult}
    </>
  );
};

export default App;
