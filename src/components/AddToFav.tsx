"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { type Movie } from "@/types";

export default function AddToFav({
  movieId,
  title,
  image,
  overview,
  releaseDate,
  voteCount,
}: Movie) {
  const [isFav, setIsFav] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { isSignedIn, user, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    setIsLoading(true);
    if (isLoaded && isSignedIn && user) {
      setIsFav(
        ((user.publicMetadata?.favs as string[]) ?? [])?.includes(movieId)
      );
      setIsLoading(false);
    } else setIsLoading(false);
  }, [movieId, isLoaded, isSignedIn, user]);

  const handleFavClick = async () => {
    setIsLoading(true);

    if (!isSignedIn) {
      setIsLoading(false);
      router.push("/sign-in");
      return;
    }

    try {
      const res = await fetch("/api/user/fav", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          movieId,
          title,
          overview,
          releaseDate,
          voteCount,
          image,
        }),
      });

      if (res.ok) {
        setIsFav(!isFav);
      } else {
        console.error("Failed to update favorites");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleFavClick}
        className={`p-2 mt-4 px-2 pt-1 border-red-900 rounded border-2  ${
          isFav
            ? "bg-red-300 dark:bg-red-600 hover:bg-red-200"
            : "bg-gray-300 dark:bg-gray-600 hover:bg-green-100"
        }`}
        disabled={isLoading}
      >
        {isLoading
          ? "Loading..."
          : isFav
          ? "Remove from Favorites"
          : "Add to Favorites"}
      </button>
    </div>
  );
}
