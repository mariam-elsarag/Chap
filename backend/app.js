import express from "express";

// for security
import helmet from "helmet";
import xss from "xss-clean";
import hpp from "hpp";
import mongoSanitize from "express-mongo-sanitize";

const app = express();

// body barser
app.use(express.json());

// for security
app.use(helmet());
app.use(xss());
app.use(hpp());
app.use(mongoSanitize());

export default app;
