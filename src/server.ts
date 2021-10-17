import App from "./app";
import { PORT } from "./constants/config";

new App().app.listen(process.env.PORT || PORT, () => console.log(`Listening on port ${PORT}`));
