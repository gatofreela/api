import body from "body-parser";
import colors from "colors";
import cors from "cors";
import "#db/prisma";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import $dev from "#routes/dev";
import { logger } from "#functions/logger";
import { join } from 'node:path';
const app = express();

app.use(
  express.urlencoded({
    extended: false,
  }),
);
app.use(cors());
app.use(helmet());
app.use(body.json());
app.use(
  morgan("combined", {
    stream: {
      write: (x) => logger.info(x.trim()),
    },
  }),
);

app.use("/dev", $dev);

app.listen(process.env.PORT, () => {
  return logger.info(`Server running: http://localhost:${process.env.PORT}`);
});

export default app;
