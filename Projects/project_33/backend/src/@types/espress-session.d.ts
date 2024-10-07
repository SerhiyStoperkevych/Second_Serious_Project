// src/express-session.d.ts
import 'express-session';

declare module 'express-session' {
    interface SessionData {
        userId?: string; // Add userId property to session data
    }
}
