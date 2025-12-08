import { generateSiteMetadata } from '@/app/metadata.config'
import { AmaBoard } from './AmaBoard'
import { AMA_ENTRIES } from './data'

export async function generateMetadata({
  params: paramsPromise
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await paramsPromise
  return generateSiteMetadata({
    lang,
    title: 'Ask Me Anything',
    description:
      'Join live AMAs with the TEN team, submit questions, and replay past sessions on real-time AI agents.'
  })
}

export default async function AmaPage({
  params: paramsPromise
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await paramsPromise

  return (
    <section className='relative w-full overflow-hidden py-16 md:py-24'>
      <div className='container relative mx-auto flex max-w-6xl flex-col gap-10 px-4 lg:px-0'>
        <AmaBoard items={AMA_ENTRIES} locale={lang} />
      </div>
    </section>
  )
}
