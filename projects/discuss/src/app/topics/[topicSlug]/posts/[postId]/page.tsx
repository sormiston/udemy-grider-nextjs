import Link from 'next/link';
import PostView from '@/components/posts/post-view';
import CommentCreateForm from '@/components/comments/comment-create-form';
import CommentList from '@/components/comments/comment-list';
import { fetchPostById } from '@/db/queries/posts';
import { fetchCommentsByPostId } from '@/db/queries/comments';
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
  const fetchComments = () => fetchCommentsByPostId(postId);

  return (
    <div>
      <Link href={paths.topicView(topicSlug)}>{`< Back to ${topicSlug}`}</Link>
      <PostView query={fetchPost} />
      <CommentCreateForm postId={postId} startOpen />
      <CommentList query={fetchComments} />
    </div>
  );
}
