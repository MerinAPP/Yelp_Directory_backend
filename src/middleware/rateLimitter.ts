import { RateLimiterMongo } from 'rate-limiter-flexible';
import mongoose from 'mongoose';
import { NextFunction, Request, Response } from 'express';

const maxAttemptsPerDay = 100
const maxAttemptsByIpUsername = 20
const maxAttemptsPerEmail = 100

const rateLimiterOptions = {
    storeClient: mongoose.connection,
    dbName: 'merin-ratelimit',
    blockDuration: 60 * 60 * 24,
};

// Rate limiters
const emailIpBruteLimiter = new RateLimiterMongo({
    ...rateLimiterOptions,
    points: maxAttemptsByIpUsername,
    duration: 60 * 10,
});

const slowerBruteLimiter = new RateLimiterMongo({
    ...rateLimiterOptions,
    points: maxAttemptsPerDay,
    duration: 60 * 60 * 24,
});

const emailBruteLimiter = new RateLimiterMongo({
    ...rateLimiterOptions,
    points: maxAttemptsPerEmail,
    duration: 60 * 60 * 24,
});

const authLimiter = async (req: Request, res: Response, next: NextFunction) => {
    const ipAddr = req.socket?.remoteAddress
    const emailIpKey = `${req.body.email}_${ipAddr}`;

    // Getting rate limiter results asynchronously
    const [slowerBruteRes, emailIpRes, emailBruteRes] = await Promise.all([
        slowerBruteLimiter.get(ipAddr),
        emailIpBruteLimiter.get(emailIpKey),
        emailBruteLimiter.get(req.body.email),
    ]);

    let retrySeconds = 0;
    if (
        slowerBruteRes &&
        slowerBruteRes.consumedPoints >= maxAttemptsPerDay
    ) {
        retrySeconds = Math.floor(slowerBruteRes.msBeforeNext / 1000) || 1;
    } else if (
        emailIpRes &&
        emailIpRes.consumedPoints >= maxAttemptsByIpUsername
    ) {
        retrySeconds = Math.floor(emailIpRes.msBeforeNext / 1000) || 1;
    } else if (
        emailBruteRes &&
        emailBruteRes.consumedPoints > maxAttemptsPerEmail
    ) {
        retrySeconds = Math.floor(emailBruteRes.msBeforeNext / 1000) || 1;
    }

    // If retry time calculated, set Retry-After header and return error response
    if (retrySeconds > 0) {
        res.set('Retry-After', String(retrySeconds));
        return next(
            new Error('Too many requests'),
        );
    }

    next();
};

// Exporting rate limiters and authLimiter middleware
export {
    emailIpBruteLimiter,
    slowerBruteLimiter,
    emailBruteLimiter,
    authLimiter,
};
