import cors from 'cors'
const allowedOrigins: string[] = [
    "http://localhost:3000",
    "http://localhost:3001",
    "https://merine-business.vercel.app",
    "http://localhost:5173",
    "https://merine-admin.vercel.app",
    "https://www.merinbd.com",
    "https://admin.merinbd.com"

];

export const corsOptions: cors.CorsOptions = {
    origin: (origin: string | undefined, callback: (error: Error | null, allow?: boolean) => void) => {
        if (allowedOrigins.indexOf(origin!) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
    credentials: true,
    optionsSuccessStatus: 200,
};


3