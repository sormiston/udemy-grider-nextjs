
type SnippetEditPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function SnippetEditPage(props: SnippetEditPageProps) {
  const { id } = await props.params;
  console.log("id: ", id);

  return <div>{id}</div>;
}
