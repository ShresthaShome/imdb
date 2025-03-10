import mongoose from "mongoose";

let initialised = false;

export const connect = async () => {
  mongoose.set("strictQuery", true);

  if (initialised) {
    console.log("MongoDB already connected!");
    return;
  }
  try {
    await mongoose.connect(
      process.env.MONGODB_URI as string,
      {
        dbName: "imdb-clerk",
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as any // eslint-disable-line @typescript-eslint/no-explicit-any
    );
    initialised = true;
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Error: ", error);
  }
};
