import { PORT } from "../env";
import app from "./app";

app.listen(PORT, () => {
  console.log(`Listening: http://localhost:${PORT}`);
});
