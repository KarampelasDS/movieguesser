export default async function fetchPoster(movieID) {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${movieID}?language=en-US`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_KEY}`,
          accept: "application/json",
        },
      }
    );
    if (!res.ok) {
      throw new Error("Poster Server Error");
    }
    const data = await res.json();
    const poster = data.poster_path;
    console.log("Fetched Poster:", poster);
    return poster;
  } catch (error) {
    console.log(error);
  }
}
