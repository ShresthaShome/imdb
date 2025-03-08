import { Metadata } from "next";
import Favorites from "./Favorites";

export const metadata: Metadata = {
  title: "Your Favorite Movies",
};

export default function page() {
  return <Favorites />;
}
