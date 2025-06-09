export default function SnippetNotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Snippet Not Found</h1>
      <p className="text-gray-600">
        The snippet you are looking for does not exist.
      </p>
    </div>
  );
}
