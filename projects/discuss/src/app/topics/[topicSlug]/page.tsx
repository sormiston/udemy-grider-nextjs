import PostCreateForm from '@/components/posts/post-create-form';
import PostList from '@/components/posts/post-list';
import { fetchPostsByTopicSlug } from '@/db/queries/posts';

type TopicPageProps = {
  params: Promise<{
    topicSlug: string;
  }>;
};

export default async function TopicViewPage({ params }: TopicPageProps) {
  const { topicSlug } = await params;
  const fetchPosts = () => fetchPostsByTopicSlug(topicSlug);

  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      <div className="col-span-3">
        <h1 className="text-2xl font-bold mb-2">{topicSlug}</h1>
        <PostList query={fetchPosts} />
      </div>
      <div className="py-3 px-2">
        <PostCreateForm topicSlug={topicSlug} />
      </div>
    </div>
  );
}
