export default function SnippetLoadingPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Loading Snippet...</h1>
      <div className="mt-4 animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
    </div>
  );
}
