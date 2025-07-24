import Link from 'next/link';
import paths from '@/paths';

type PostViewPageProps = {
  params: Promise<{
    topicSlug: string;
    postId: string;
  }>;
};

export default async function PostViewPage({ params }: PostViewPageProps) {
  const { topicSlug, postId } = await params;

  return (
    <div>
      <Link href={paths.topicView(topicSlug)}>{`< Back to ${topicSlug}`}</Link>
    </div>
  );
}
