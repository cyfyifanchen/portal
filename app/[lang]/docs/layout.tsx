import { DocsLayout } from 'fumadocs-ui/layouts/docs'
import type { ReactNode } from 'react'
import { Banner } from '@/components/layout/sidebar'
import { Footer } from '@/components/ui/footer'
import { baseOptions } from '@/lib/layout.shared'
import { source } from '@/lib/source'

import './docs.css'

export default async function Layout({
  params,
  children
}: {
  params: Promise<{ lang: string }>
  children: ReactNode
}) {
  const { lang } = await params

  const layoutProps = baseOptions(lang)

  return (
    <div className='docs-theme'>
      <DocsLayout
        {...layoutProps}
        tree={source.pageTree[lang]}
        sidebar={{
          banner: <Banner />,
          tabs: {
            transform: (option) => {
              if (option?.description?.toString().startsWith('v')) return null
              return option
            }
          }
        }}
      >
        {children}
        <Footer />
      </DocsLayout>
    </div>
  )
}
