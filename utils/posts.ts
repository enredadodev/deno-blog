import { render } from "$gfm/mod.ts";
import { extract } from "$std/front_matter/any.ts";
import { NPost, Post, Posts } from "../types.d.ts";

export async function loadPost(
  id: string,
  rendering = true,
): Promise<NPost> {
  const raw: string = await Deno.readTextFile(`./content/posts/${id}.md`);

  if (!raw) return null;

  const { attrs, body } = extract<Record<string, string>>(raw);
  // const params = attrs as Record<string, string>;
  const post: Post = {
    id,
    title: attrs.title,
    body: rendering ? render(body) : body,
    date: new Date(attrs.date),
    excerpt: attrs.excerpt,
  };

  return post;
}

export async function listPosts(): Promise<Posts> {
  const promises: Promise<NPost>[] = [];
  // const posts: Post[] = [];
  for await (const dirEntry of Deno.readDir("./content/posts")) {
    // console.log(dirEntry);
    const { name, isFile } = dirEntry;
    if (isFile) {
      const [id] = name.split(".");
      if (id) promises.push(loadPost(id, false));
    }
  }
  const posts: Posts = (await Promise.all(promises)).flatMap((post) =>
    post ? [post] : []
  );
  posts.sort((a, b) => {
    return b.date.getTime() - a.date.getTime(); // DESC
    // return a.date.getTime() - b.date.getTime(); // ASC
  });
  return posts;
}

export async function listPostsSequentially(): Promise<Post[]> {
  const posts: Post[] = [];
  for await (const dirEntry of Deno.readDir("./content/posts")) {
    // console.log(dirEntry);
    const { name, isFile } = dirEntry;
    if (isFile) {
      const [id] = name.split(".");
      const post = await loadPost(id, false);
      if (!post) continue;
      posts.push(post);
    }
  }
  // console.log(posts);

  return [];
}
