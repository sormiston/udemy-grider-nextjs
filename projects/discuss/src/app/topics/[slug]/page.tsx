interface TopicPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function TopicViewPage({ params }: TopicPageProps) {
  const { slug } = await params;
  return (
    <div>
      <h1>Topic View Page</h1>
      <p>Topic Slug: {slug}</p>
    </div>
  );
}
