// ---------------------------------------------------------------- //
//                                                                  //
//                 PLEASE DO NOT MODIFY THIS FILE.                  //
//               Hatchways automation depends on it.                //
//                                                                  //
// ---------------------------------------------------------------- //

import { THE_MOVIE_DB_API_BASE_URL } from "../env";
import { URL } from "url";
import app from "../src/app";
import { assertMediaObjectProperties } from "./media_object";
import request from "supertest";
import { waitForRequestStart } from "./mock_server";

describe("GET /movies", () => {
  it("should return a list of movies", async () => {
    const res = await request(app)
      .get("/movies")
      .query({
        title: "The Matrix",
      })
      .send()
      .expect(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBeLessThanOrEqual(10);
    for (const movie of res.body) {
      assertMediaObjectProperties(movie);
    }
  });

  it("should request the Movie DB using THE_MOVIE_DB_API_BASE_URL", async () => {
    // Setup.
    const requestListener = waitForRequestStart();
    const title = "The Matrix";

    // Run.
    const res = await request(app).get("/movies").query({ title }).send();

    // Assert.
    const capturedRequest = await requestListener;
    const expectedUrl = new URL(`${THE_MOVIE_DB_API_BASE_URL}/search/movie`);
    const theMovieDbUrlIsBuiltCorrectly =
      capturedRequest.url.host === expectedUrl.host;
    if (!theMovieDbUrlIsBuiltCorrectly) {
      throw new Error(
        "Please build the URL for the Movie DB API with the environment variable THE_MOVIE_DB_API_BASE_URL. This is for Hatchways automation."
      );
    }
  });
});

describe("GET /movies/:id", () => {
  it("should return a movie", async () => {
    const id = 624860;
    const res = await request(app).get(`/movies/${id}`).send().expect(200);
    assertMediaObjectProperties(res.body);
    expect(res.body.id).toBe(id);
  });

  it("should request the Movie DB using THE_MOVIE_DB_API_BASE_URL", async () => {
    // Setup.
    const requestListener = waitForRequestStart();
    const id = 624860;

    // Run.
    const res = await request(app).get(`/movies/${id}`).send();

    // Assert.
    const capturedRequest = await requestListener;
    const expectedUrl = new URL(`${THE_MOVIE_DB_API_BASE_URL}/movie/${id}`);
    const theMovieDbUrlIsBuiltCorrectly =
      capturedRequest.url.host === expectedUrl.host;
    if (!theMovieDbUrlIsBuiltCorrectly) {
      throw new Error(
        "Please build the URL for the Movie DB API with the environment variable THE_MOVIE_DB_API_BASE_URL. This is for Hatchways automation."
      );
    }
  });
});
