import { Handlers, PageProps } from "$fresh/server.ts";
import { CSS } from "$gfm/mod.ts";
import { Post, Posts } from "../types.d.ts";
import { listPosts } from "../utils/posts.ts";

export const handler: Handlers = {
  async GET(request, context) {
    const posts: Posts = await listPosts();

    const resp = context.render({ posts });

    return resp;
  },
};

export default function Home(props: PageProps) {
  const { data } = props;
  const { posts }: { posts: Posts } = data;
  // console.log(posts);

  return (
    <main class="p-4">
      <h1 class="text-2xl">Mi blog</h1>
      <style dangerouslySetInnerHTML={{ __html: CSS }}></style>
      {posts.map((post: Post) =>
        post
          ? (
            <article class="p-4">
              <h2 class="text-2xl font-bold">
                <a
                  class="underline hover:text-blue-500"
                  href={`/blog/${post.id}`}
                >
                  {post.title}
                </a>
              </h2>
              <time>{Intl.DateTimeFormat("es").format(post.date)}</time>
            </article>
          )
          : <></>
      )}
    </main>
  );
}
