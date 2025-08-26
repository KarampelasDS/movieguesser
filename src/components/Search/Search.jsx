import Image from "next/image";
import Fuse from "fuse.js";
import { useEffect, useRef, useState } from "react";
import SearchResult from "./SearchResult";
import useGameManager from "@/store/useGameManager";
import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";

export default function Search(props) {
  const inputRef = useRef(null);
  const [query, setQuery] = useState("");
  const [searchlist, setSearchlist] = useState([]);
  const [debounced, setDebounced] = useState("");
  const attempts = useGameManager((state) => state.currentAttempts);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(null);

  useEffect(() => {
    setQuery("");
  }, [attempts]);

  useEffect(() => {
    SearchMovie(query);
  }, [page]);

  async function SearchMovie(query) {
    if (!debounced) return;
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=${page}`,
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
      setMaxPage(data.total_pages);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounced(query);
      setPage(1);
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  useEffect(() => {
    if (!debounced) {
      setSearchlist([]); // Clear results immediately if query is empty
      return;
    }
    SearchMovie(debounced);
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
              tmdbid={movie.id}
            />
          ))}
        </div>
      ) : (
        query != "" && <div className="search-no-results">No results found</div>
      )}
      {searchlist.length > 0 && (
        <div className="pagination-controls">
          <button
            disabled={page <= 1}
            onClick={() => {
              if (page <= 1) return;
              setPage(page - 1);
            }}
          >
            <GrFormPreviousLink />
          </button>
          <span>{page} </span>
          <button
            disabled={maxPage == page || page == 10}
            onClick={() => {
              setPage(page + 1);
            }}
          >
            <GrFormNextLink />
          </button>
        </div>
      )}
    </>
  );
}
