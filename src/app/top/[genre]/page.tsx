import Results from "@/components/Results";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ genre: string }>;
}) {
  const { genre } = await params;

  if (genre !== "rated" && genre !== "trending") return;

  return {
    title: `${genre === "rated" ? "Top Rated" : "Top Trending"}`,
  };
}

const API_KEY = process.env.API_KEY;

export default async function Home({
  params,
}: {
  params: Promise<{ genre: string }>;
}) {
  const { genre } = await params;

  const res = await fetch(
    `https://api.themoviedb.org/3${
      genre === "rated" ? `/movie/top_rated` : `/trending/all/week`
    }?api_key=${API_KEY}&language=en-US&page=1`
  );

  const data = await res.json();
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const results = data.results;

  return (
    <div>
      <Results results={results} />
    </div>
  );
}
