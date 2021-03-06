import { app } from "./app.mjs";
import http from "http";
import { setupSocketServer } from "./socketServer/setupSocketServer.mjs";

const PORT = 8080;

const httpServer = http.createServer(app);

setupSocketServer(httpServer);

httpServer.listen(PORT, () => console.info(`Listening on port: ${PORT}`));
