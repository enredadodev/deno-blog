import { assertEquals, assertNotEquals } from "$std/assert/mod.ts";
import { NPost } from "../types.d.ts";
import { loadPost } from "./posts.ts";

Deno.test("loadPost() returns null if the post doest not exits", async (): Promise<void> => {
  const post: NPost = await loadPost("non-existent");
  assertEquals(post, null);
});

Deno.test("loadPost() returns a post object if post does exists", async (): Promise<void> => {
  const post: NPost = await loadPost("hello-world");
  assertNotEquals(post, null);
  assertEquals(post?.id, "hello-world");
  assertEquals(post?.title, "Hello World");
  assertEquals(post?.date, new Date("2023-12-23"));
  assertEquals(post?.excerpt, "This is my first post");
});
