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
        dbName: "next-estate",
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as any
    );
    initialised = true;
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Error: ", error);
  }
};
