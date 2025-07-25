import type { PostListItem } from '@/db/queries/posts';
import Link from 'next/link';
import paths from '@/paths';

type PostListProps = {
  query: () => Promise<PostListItem[]>;
};

export default async function PostList({ query }: PostListProps) {
  const posts = await query();
  const renderedPosts = posts.map(post => {
    const topicSlug = post.topic.slug;

    if (!topicSlug) {
      throw new Error('Need a slug to link to a post');
    }

    return (
      <div key={post.id} className="border rounded p-2 max-w-lg">
        <Link href={paths.postView(topicSlug, post.id)}>
          <h3 className="text-lg font-bold">{post.title}</h3>
          <div className="flex flex-row gap-8">
            <p className="text-xs text-gray-400">By {post.user.name}</p>
            <p className="text-xs text-gray-400">
              {post._count.comments} comments
            </p>
          </div>
        </Link>
      </div>
    );
  });

  return <div className="space-y-2">{renderedPosts}</div>;
}
