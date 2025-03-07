"use client";

import { useEffect } from "react";

export default function error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.log(error);
  }, [error]);

  return (
    <div className="text-center mt-10">
      <h1>Something went wrong. Please try again later.</h1>

      <button
        className="mt-4 px-2 pb-1 border-red-900 rounded border-2 hover:text-amber-600 hover:bg-amber-200"
        onClick={() => reset()}
      >
        Try Again
      </button>
    </div>
  );
}
