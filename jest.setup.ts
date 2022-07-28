import { server } from "./tests/mock_server";

// Mock the environment variables
// so that we can check if the URLs are built correctly.
jest.mock("./env", () => ({
  ...jest.requireActual("./env"),
  THE_MOVIE_DB_API_BASE_URL: "https://please-use-environment-variable.com",
}));

beforeAll(() =>
  server.listen({
    onUnhandledRequest: "bypass",
  })
);
afterEach(() => {
  server.events.removeAllListeners();
  server.resetHandlers();
});
afterAll(() => server.close());
