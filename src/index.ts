import { PORT } from "../env";
import app from "./app";
import watch from "../watchfile";

console.log("Another change here");





app.listen(PORT, () => {
  console.log(`Listening: http://localhost:${PORT}`);
});

watch();
