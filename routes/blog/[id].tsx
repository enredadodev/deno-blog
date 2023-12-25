import { Handlers, PageProps } from "$fresh/server.ts";
import { CSS } from "$gfm/mod.ts";
import { NPost, Post } from "../../types.d.ts";
import { loadPost } from "../../utils/posts.ts";

export const handler: Handlers = {
  async GET(request, context) {
    const { id } = context.params;
    const post: NPost = await loadPost(id);
    if (!post) await context.render();
    return await context.render({ post });
    // const resp = await context.render({ post });
    // // console.log(post);

    // resp.headers.set("X-Custom-Header", "Hello");
    // return resp;
  },
};
export default function PagePost(props: PageProps) {
  const post: Post = props?.data.post;

  // console.log(post);
  if (post == null) return <>No data</>;
  return (
    <article class="p-4">
      <style dangerouslySetInnerHTML={{ __html: CSS }}></style>
      <h1 class="text-2xl font-bold">{post.title}</h1>
      <time>{Intl.DateTimeFormat("es").format(post.date)}</time>
      {/* <style dangerouslySetInnerHTML={{ __html: KATEX_CSS }}></style> */}
      <div
        class="markdown-body"
        dangerouslySetInnerHTML={{ __html: post.body }}
      />
      {
        /* <p>
        {post.body}
      </p> */
      }
    </article>
  );
}
