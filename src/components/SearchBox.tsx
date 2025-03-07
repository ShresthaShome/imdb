"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBox() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    router.push(`/search/${search}`);
  };

  return (
    <form
      className="flex justify-between px-5 max-w-6xl mx-auto gap-1"
      onSubmit={(e) => handleSubmit(e)}
    >
      <input
        type="text"
        placeholder="Search keywords..."
        className="w-full h-14 rounded-md border-2  placeholder-gray-500 outline-none bg-transparent flex-1 mt-4 pl-5 placeholder-shown:border-gray-400 border-amber-200"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <button
        className="mt-4 px-2 pb-1 border-red-900 rounded-md border-2 hover:text-amber-500 hover:bg-amber-100  disabled:text-gray-400 disabled:border-gray-400 disabled:bg-white"
        disabled={search === ""}
      >
        Search
      </button>
    </form>
  );
}
