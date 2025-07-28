import type { FetchPostByIdResult } from '@/db/queries/posts';
type PostShowProps = {
  query: () => FetchPostByIdResult;
};

export default async function PostShow({ query }: PostShowProps) {
  // introduce delay to demo content streaming / Suspense API
  await new Promise(resolve => setTimeout(resolve, 500));
  const post = await query();

  if (!post) {
    return (
      <div className="m-4">
        <h1 className="text-2xl font-bold my-2">Oops! Post not found.</h1>
      </div>
    );
  }

  return (
    <div className="m-4">
      <h1 className="text-2xl font-bold my-2">{post.title}</h1>
      <p className="p-4 border rounded max-w-3xl">{post.content}</p>
    </div>
  );
}
