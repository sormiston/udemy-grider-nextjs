import Link from 'next/link';
import { Suspense } from 'react';
import paths from '@/paths';
import PostView from '@/components/posts/post-view';
import PostViewSkeleton from '@/components/posts/post-view-skeleton';
import CommentCreateForm from '@/components/comments/comment-create-form';
import CommentList from '@/components/comments/comment-list';
import { fetchPostById } from '@/db/queries/posts';
import { fetchCommentsByPostId } from '@/db/queries/comments';

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
      <Suspense fallback={<PostViewSkeleton />}>
        <PostView query={fetchPost} />
      </Suspense>
      <CommentCreateForm postId={postId} startOpen />
      <CommentList query={fetchComments} />
    </div>
  );
}
