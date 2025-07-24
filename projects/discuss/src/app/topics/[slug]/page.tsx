import PostCreateForm from '@/components/posts/post-create-form';
interface TopicPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function TopicViewPage({ params }: TopicPageProps) {
  const { slug } = await params;
  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      <div className="col-span-3">
        <h1 className="text-2xl font-bold mb-2">{slug}</h1>
      </div>
      <div className="border shadow py-3 px-2">
        <PostCreateForm topicSlug={slug} />
      </div>
    </div>
  );
}
