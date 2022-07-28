import dotenv from "dotenv";

dotenv.config();

/**
 * Get an environment variable.
 * @param name Name of the environment variable.
 * @param defaultValue Fallback value if the environment variable is not set.
 * @returns Value of the environment variable or the fallback value.
 */
function requireEnv(name: string, defaultValue?: string): string {
  const value = process.env[name];
  if (value === undefined) {
    if (defaultValue === undefined) {
      throw new Error(`Missing required environment variable ${name}`);
    }
    return defaultValue;
  }
  return value;
}

export const PORT = requireEnv("PORT", "8080");
export const THE_MOVIE_DB_API_BASE_URL = requireEnv(
  "THE_MOVIE_DB_API_BASE_URL",
  "https://api.themoviedb.org/3"
);
export const THE_MOVIE_DB_API_KEY = requireEnv(
  "THE_MOVIE_DB_API_KEY",
  "41a6894ca93cb1c78657d9e799e164de"
);
export const NODE_ENV = requireEnv("NODE_ENV", "development");
