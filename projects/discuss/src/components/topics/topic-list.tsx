import Link from 'next/link';
import { Chip } from '@nextui-org/react';
import { db } from '@/db';
import paths from '@/paths';

export default async function TopicList() {
  const topics = await db.topic.findMany({
    orderBy: { createdAt: 'desc' },
    take: 10,
  });

  const renderedTopics = topics.map(topic => (
    <Link key={topic.id} href={paths.topicView(topic.slug)}>
      <Chip color="warning" variant="shadow">
        {topic.slug}
      </Chip>
    </Link>
  ));

  return <div className="flex flex-wrap gap-2">{renderedTopics}</div>;
}
