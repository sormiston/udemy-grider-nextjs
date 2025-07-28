import { redirect } from 'next/navigation';
import PostList from '@/components/posts/post-list';
import { searchPosts } from '@/db/queries/posts';
import paths from '@/paths';

type SearchPageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const term = (await searchParams).term;
  if (typeof term !== 'string') redirect(paths.home());
  const termBoundQuery = () => searchPosts(term);

  return <PostList query={termBoundQuery} />;
}
