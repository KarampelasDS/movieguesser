import Image from "next/image";
import Fuse from "fuse.js";
import { useEffect, useRef, useState } from "react";
import SearchResult from "./SearchResult";

export default function Search(props) {
  const inputRef = useRef(null);
  const [query, setQuery] = useState("");
  const [searchlist, setSearchlist] = useState([]);
  const [debounced, setDebounced] = useState("");

  async function SearchMovie(query) {
    if (!debounced) return;
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_KEY}`,
            accept: "application/json",
          },
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

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounced(query);
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  useEffect(() => {
    if (debounced) {
      SearchMovie(debounced);
    }
  }, [debounced]);

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
