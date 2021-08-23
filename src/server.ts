import app from "./app";
import { PORT } from "./constants/config";
app.listen(process.env.PORT || PORT, () => console.log(`Listening on port ${PORT}`));
