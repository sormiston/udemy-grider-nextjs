interface PostCreatePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function PostCreatePage({ params }: PostCreatePageProps) {
  const { slug } = await params;

  return (
    <div>
      <h1>Create New Post</h1>
      <p>Topic Slug: {slug}</p>
      {/* Form for creating a new post will go here */}
    </div>
  );
}
