import CommentListItem from '@/components/comments/comment-list-item';
import type { CommentWithAuthor } from '@/db/queries/comments';

type CommentListProps = {
  query: () => Promise<CommentWithAuthor[]>;
};

export default async function CommentList({ query }: CommentListProps) {
  const comments = await query();
  const topLevelComments = comments.filter(
    comment => comment.parentId === null
  );
  const renderedComments = topLevelComments.map(comment => {
    return (
      <CommentListItem
        key={comment.id}
        commentId={comment.id}
        comments={comments}
      />
    );
  });

  return (
    <div className="space-y-3 mt-3">
      <h1 className="text-lg font-bold">All {comments.length} comments</h1>
      {renderedComments}
    </div>
  );
}
