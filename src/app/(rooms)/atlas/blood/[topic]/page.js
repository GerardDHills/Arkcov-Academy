import { notFound } from 'next/navigation';
import { BLOOD, topicBySlug } from '@/lib/atlas/blood';
import TopicView from '@/components/atlas/TopicView';

export function generateStaticParams() {
  return BLOOD.topics.map((t) => ({ topic: t.slug }));
}

export function generateMetadata({ params }) {
  const t = topicBySlug(params.topic);
  return { title: t ? `${t.title} | Arkcov Atlas` : 'Arkcov Atlas' };
}

export default function TopicPage({ params }) {
  if (!topicBySlug(params.topic)) notFound();
  return <TopicView slug={params.topic} />;
}
