import connectDB from "./config/db.js";
import "./config/dotenv.js";
import httpServer from "./config/http.js";

const bootstrap = async () => {
  await connectDB(process.env.MONGODB_URL);
  httpServer.listen(process.env.PORT, () => {
    console.log(`Server ready on http://localhost:${process.env.PORT}`);
  });
};

bootstrap();
