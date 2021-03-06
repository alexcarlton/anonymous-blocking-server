import { app } from "./app.mjs";
import http from "http";
import { setupSocketServer } from "./setupSocketServer.mjs";

const PORT = 8080;

const httpServer = http.createServer(app);

setupSocketServer(httpServer);

httpServer.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
