import Image from "next/image";

export default function Search() {
  return (
    <div className="search">
      <div className="searchbar">
        <input type="text" placeholder="Type movie title here..." />
        <Image
          className="searchIcon"
          width={50}
          height={50}
          src="/search-icon.png"
        />
      </div>
    </div>
  );
}
