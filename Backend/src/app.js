const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [
    "http://localhost:5173",

    // Production
    "https://interview-ai-yt-new.vercel.app",

    // Other known Vercel domains
    "https://interview-ai-yt-alpha.vercel.app",
];

// CORS configuration
app.use(
    cors({
        origin: function (origin, callback) {
            // Allow requests without an Origin
            // e.g. Postman, server-to-server requests
            if (!origin) {
                return callback(null, true);
            }

            // Allow exact domains
            if (allowedOrigins.includes(origin)) {
                return callback(null, true);
            }

            // Allow Vercel preview deployments
            if (
                /^https:\/\/interview-ai-yt-[a-z0-9-]+\.vercel\.app$/i.test(origin)
            ) {
                return callback(null, true);
            }

            console.log("CORS blocked:", origin);

            return callback(new Error("Not allowed by CORS"));
        },

        credentials: true,
    })
);

/* Routes */
const authRouter = require("./routes/auth.routes");
const interviewRouter = require("./routes/interview.routes");

/* Using routes */
app.use("/api/auth", authRouter);
app.use("/api/interview", interviewRouter);

module.exports = app;
