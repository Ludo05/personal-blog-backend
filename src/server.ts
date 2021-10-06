import App from "./app";
import { PORT } from "./constants/config";

new App().app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
