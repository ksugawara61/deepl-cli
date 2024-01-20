import { assertEquals } from "https://deno.land/std@0.65.0/testing/asserts.ts";
import { showHelp } from "./utils.ts";

Deno.test("call showHelp", () => {
  assertEquals(showHelp(), undefined);
});
