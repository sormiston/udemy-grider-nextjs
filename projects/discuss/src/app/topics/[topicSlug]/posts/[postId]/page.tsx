import Link from 'next/link';
import PostView from '@/components/posts/post-view';
import { fetchPostById } from '@/db/queries/posts';
import paths from '@/paths';

type PostViewPageProps = {
  params: Promise<{
    topicSlug: string;
    postId: string;
  }>;
};

export default async function PostViewPage({ params }: PostViewPageProps) {
  const { topicSlug, postId } = await params;
  const fetchPost = () => fetchPostById(postId);
  return (
    <div>
      <Link href={paths.topicView(topicSlug)}>{`< Back to ${topicSlug}`}</Link>
      <PostView query={fetchPost} />
    </div>
  );
}
