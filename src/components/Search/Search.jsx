import Image from "next/image";
import Fuse from "fuse.js";
import { useRef, useState } from "react";

export default function Search(props) {
  const inputRef = useRef(null);
  const [query, setQuery] = useState("");

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

  const fuse = new Fuse(props.searchlist, fuseOptions);

  function searchMovies(query) {
    if (!query) {
      return;
    }
    const result = fuse.search(query);
    console.log(result.map((item) => item.item));
  }

  return (
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
          onClick={() => searchMovies(query)}
        />
      </div>
    </div>
  );
}
