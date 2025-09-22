import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";
import SearchResult from "./SearchResult";
import useGameManager from "@/store/useGameManager";

export default function Search() {
  const inputRef = useRef(null);
  const [query, setQuery] = useState("");
  const [debounced, setDebounced] = useState("");
  const [searchlist, setSearchlist] = useState([]);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(null);
  const attempts = useGameManager((state) => state.currentAttempts);
  const scrollToTop = useGameManager((state) => state.scrollToTop);

  const blacklist = [
    "porn",
    "porno",
    "pornography",
    "xxx",
    "erotic",
    "erotica",
    "nude",
    "nudity",
    "naked",
    "sex",
    "sexual",
    "fetish",
    "fetishes",
    "bdsm",
    "bondage",
    "kink",
    "hentai",
    "softcore",
    "playboy",
    "camgirl",
    "cam boy",
    "striptease",
    "erotism",
    "milf",
    "barely legal",
    "spanking",
    "lingerie",
    "provocative",
    "seduction",
    "orgy",
    "squirt",
    "sexually explicit",
    "fetishistic",
    "masturbation",
    "intercourse",
    "adult film",
    "sex tape",
    "sexual activity",
    "naughties",
    "tits",
    "boobs",
    "cunnilingus",
    "fellatio",
    "oral sex",
    "anal sex",
    "bondage",
    "dominatrix",
    "submissive",
    "pornstar",
    "threesome",
    "orgasm",
    "playmate",
    "fetishism",
    "eroticism",
    "sexualized",
    "nude photo",
    "pornographic",
    "adult content",
    "nun in rope hell",
    "nude beach",
    "adultery alumni association",
  ];

  // Reset on new attempt
  useEffect(() => {
    setQuery("");
    setDebounced("");
    setPage(1);
    inputRef.current.focus();
    scrollToTop();
  }, [attempts]);

  // Debounce input changes
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounced(query.trim());
      setPage(1);
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  // Fetch movies when debounced query or page changes
  useEffect(() => {
    if (!debounced) {
      setSearchlist([]);
      return;
    }

    async function fetchMovies() {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/search/movie?query=${debounced}&include_adult=false&language=en-US&page=${page}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_KEY}`,
              accept: "application/json",
            },
          }
        );

        if (!res.ok) throw new Error("Search Server Error");

        const data = await res.json();

        const filteredResults = data.results
          .filter((item) => {
            const title = (item.title || item.name || "").toLowerCase();
            return !blacklist.some((word) => title.includes(word));
          })
          .sort((a, b) => b.popularity - a.popularity);

        setSearchlist(filteredResults);
        setMaxPage(data.total_pages);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    }

    fetchMovies();
  }, [debounced, page]);

  return (
    <>
      <div className="search">
        <div className="searchbar">
          <input
            type="text"
            placeholder="Type movie title here..."
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Image
            className="searchIcon"
            width={50}
            height={50}
            src="/search-icon.png"
            alt="Search"
            onClick={() => setDebounced(query.trim())}
          />
        </div>
      </div>

      {searchlist.length > 0 && query !== "" ? (
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
        query !== "" && (
          <div className="search-no-results">No results found</div>
        )
      )}

      {searchlist.length > 0 && query !== "" && (
        <div className="pagination-controls">
          <button
            disabled={page <= 1}
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          >
            <GrFormPreviousLink />
          </button>
          <span>{page}</span>
          <button
            disabled={page >= maxPage || page >= 10}
            onClick={() => setPage((prev) => prev + 1)}
          >
            <GrFormNextLink />
          </button>
        </div>
      )}
    </>
  );
}
