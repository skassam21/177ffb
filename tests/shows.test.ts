// ---------------------------------------------------------------- //
//                                                                  //
//                 PLEASE DO NOT MODIFY THIS FILE.                  //
//               Hatchways automation depends on it.                //
//                                                                  //
// ---------------------------------------------------------------- //

import { THE_MOVIE_DB_API_BASE_URL } from "../env";
import app from "../src/app";
import { assertMediaObjectProperties } from "./media_object";
import request from "supertest";
import { waitForRequestStart } from "./mock_server";

describe("GET /shows", () => {
  it("should return a list of shows", async () => {
    const res = await request(app)
      .get("/shows")
      .query({
        name: "The Simpsons",
      })
      .send()
      .expect(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBeLessThanOrEqual(10);
    for (const show of res.body) {
      assertMediaObjectProperties(show);
    }
  });

  it("should request the Movie DB using THE_MOVIE_DB_API_BASE_URL", async () => {
    // Setup.
    const requestListener = waitForRequestStart();
    const name = "The Simpsons";

    // Run.
    const res = await request(app).get("/shows").query({ name }).send();

    // Assert.
    const capturedRequest = await requestListener;
    const expectedUrl = new URL(`${THE_MOVIE_DB_API_BASE_URL}/search/tv`);
    const theMovieDbUrlIsBuiltCorrectly =
      capturedRequest.url.host === expectedUrl.host;
    if (!theMovieDbUrlIsBuiltCorrectly) {
      throw new Error(
        "Please build the URL for the Movie DB API with the environment variable THE_MOVIE_DB_API_BASE_URL. This is for Hatchways automation."
      );
    }
  });
});

describe("GET /shows/:id", () => {
  it("should return a show", async () => {
    const id = 456;
    const res = await request(app).get(`/shows/${id}`).send().expect(200);
    assertMediaObjectProperties(res.body);
    expect(res.body.id).toBe(id);
  });

  it("should request the Movie DB using THE_MOVIE_DB_API_BASE_URL", async () => {
    // Setup.
    const requestListener = waitForRequestStart();
    const id = 456;

    // Run.
    const res = await request(app).get(`/shows/${id}`).send();

    // Assert.
    const capturedRequest = await requestListener;
    const expectedUrl = new URL(`${THE_MOVIE_DB_API_BASE_URL}/tv/${id}`);
    const theMovieDbUrlIsBuiltCorrectly =
      capturedRequest.url.host === expectedUrl.host;
    if (!theMovieDbUrlIsBuiltCorrectly) {
      throw new Error(
        "Please build the URL for the Movie DB API with the environment variable THE_MOVIE_DB_API_BASE_URL. This is for Hatchways automation."
      );
    }
  });
});
