// ---------------------------------------------------------------- //
//                                                                  //
//                 PLEASE DO NOT MODIFY THIS FILE.                  //
//               Hatchways automation depends on it.                //
//                                                                  //
// ---------------------------------------------------------------- //

/**
 * Asserts that x is a MediaObject.
 */
export function assertMediaObjectProperties(x: unknown): asserts x is {
  id: number;
  date: string;
  name: string;
  rating: number;
} {
  expect(x).toBeInstanceOf(Object);
  const obj = x as { [key: string]: unknown };
  expect(obj.id).toEqual(expect.any(Number));
  expect(obj.date).toEqual(expect.any(String));
  expect(obj.name).toEqual(expect.any(String));
  expect(obj.rating).toEqual(expect.any(Number));
}
