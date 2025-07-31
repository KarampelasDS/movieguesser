import Image from "next/image";
import Fuse from "fuse.js";
import { useEffect, useRef, useState } from "react";
import SearchResult from "./SearchResult";

export default function Search(props) {
  const inputRef = useRef(null);
  const [query, setQuery] = useState("");
  const [searchlist, setSearchlist] = useState([]);

  const fuseOptions = {
    isCaseSensitive: false,
    // includeScore: false,
    // ignoreDiacritics: false,
    // shouldSort: true,
    includeMatches: false,
    findAllMatches: false,
    // minMatchCharLength: 1,
    // location: 0,
    threshold: 0.5,
    distance: 100,
    // useExtendedSearch: false,
    // ignoreLocation: false,
    // ignoreFieldNorm: false,
    // fieldNormWeight: 1,
    keys: ["title"],
  };

  useEffect(() => {
    console.log("useEffect:",searchlist);
  }, [searchlist]);

  const fuse = new Fuse(props.searchlist, fuseOptions);

  function searchMovies(query) {
    if (!query) {
      return;
    }
    const result = fuse.search(query);
    console.log(result.map((item) => item.item));
    setSearchlist(result.map((item) => item.item));
  }

  async function SearchMovie(query) {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=true&language=en-US&page=1`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_KEY}`,
            accept: "application/json"
          }
        }
      );
  
      if (!res.ok) {
        throw new Error("Search Server Error");
      }
      const data = await res.json();
      console.log("TMDB:", data);
      setSearchlist(data.results.map((item) => item));
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  }

  return (
    <>
      <div className="search">
        <div className="searchbar">
          <input
            type="text"
            placeholder="Type movie title here..."
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              SearchMovie(e.target.value);
            }}
          />
          <Image
            className="searchIcon"
            width={50}
            height={50}
            src="/search-icon.png"
            onClick={() => SearchMovie(query)}
          />
        </div>
      </div>
      {searchlist.length > 0 ? (
        <div>
          {searchlist.map((movie, index) => (
            <SearchResult
              key={index}
              title={movie.title}
              year={movie.release_date}
              image={movie.poster_path}
            />
          ))}
        </div>
      ) : (
        query != "" && <div className="search-no-results">No results found</div>
      )}
    </>
  );
}
