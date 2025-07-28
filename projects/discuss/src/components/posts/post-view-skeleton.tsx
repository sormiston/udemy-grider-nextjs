import { Skeleton } from '@nextui-org/react';

export default function PostViewSkeleton() {
  return (
    <div className="m-4">
      <div className="my-2">
        <Skeleton className="h-8 w-48"></Skeleton>
      </div>
      <div className="p-4 border rounded space-y-2">
        <Skeleton className="h-6 max-w-xl" />
        <Skeleton className="h-6 max-w-xl" />
        <Skeleton className="h-6 max-w-xl" />
      </div>
    </div>
  );
}
