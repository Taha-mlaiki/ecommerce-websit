/**
 * An array of Routes That accessible to all kind of user
 * @type {string[]}
 */
export const publicRoutes: string[] = ["/", "/about"];

/**
 * An array of Routes That accessible just for authenticated User
 * @type {string[]}
 */
export const privateRoutes: string[] = ["/settings", "/profile"];

/**
 * An array of Routes That accessible just for AnAuthenticated User
 * @type {string[]}
 */
export const authRoutes: string[] = [
  "/login",
  "/register",
  "/error",
  "/new-verification",
  "/requestResetPwd",
  "/resetPassword",
];

/**
 * The Prefix for API authentication routes
 * @type {string}
 */

export const apiAuthPrefix: string = "/api/auth";

export const adminRoute:string[] = ["/store","/createStore"]
