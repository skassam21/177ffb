// ---------------------------------------------------------------- //
//                                                                  //
//                 PLEASE DO NOT MODIFY THIS FILE.                  //
//               Hatchways automation depends on it.                //
//                                                                  //
// ---------------------------------------------------------------- //

import { MockedRequest } from "msw";
import { handlers } from "./mock_handlers";
import { setupServer } from "msw/node";

export const server = setupServer(...handlers);

function isLocalhost(hostname: string): boolean {
  return (
    hostname === "localhost" || hostname === "127.0.0.1" || hostname === "::1"
  );
}

/**
 * Wait until a request is dispatched to the mock server.
 */
export function waitForRequestStart() {
  return new Promise<MockedRequest>((resolve) => {
    server.events.on("request:start", (req) => {
      if (!isLocalhost(req.url.hostname)) resolve(req);
    });
  });
}
