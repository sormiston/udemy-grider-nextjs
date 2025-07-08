interface PostViewPageProps {
  params: Promise<{
    slug: string;
    postId: string;
  }>;
}

export default async function PostViewPage({ params }: PostViewPageProps) {
  const { slug, postId } = await params;

  return (
    <div>
      <h1>Post View Page</h1>
      <p>Topic Slug: {slug}</p>
      <p>Post ID: {postId}</p>
      {/* Post content will be displayed here */}
    </div>
  );
}
