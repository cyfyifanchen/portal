'use client'

import { useMemo, useState } from 'react'
import {
  CalendarDays,
  Clock3,
  Filter,
  Mic2,
  PlayCircle,
  Search,
  Sparkles,
  Tag
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import type { AmaEntry, AmaStatus } from './data'

const statusCopy: Record<AmaStatus, { label: string; tone: string }> = {
  live: {
    label: 'Live now',
    tone:
      'border-rose-200/70 bg-rose-50 text-rose-700 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-100'
  },
  upcoming: {
    label: 'Upcoming',
    tone:
      'border-emerald-200/70 bg-emerald-50 text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-100'
  },
  past: {
    label: 'Past',
    tone:
      'border-slate-200/70 bg-slate-50 text-slate-700 dark:border-slate-500/30 dark:bg-slate-800/60 dark:text-slate-100'
  }
}

type StatusFilter = AmaStatus | 'all'

function formatDateTime(date: string, locale: string) {
  const parsed = new Date(date)
  return new Intl.DateTimeFormat(locale || 'en', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZoneName: 'short'
  }).format(parsed)
}

function relativeTime(date: string, locale: string) {
  const target = new Date(date).getTime()
  const now = Date.now()
  const diff = target - now
  const abs = Math.abs(diff)
  const minute = 60 * 1000
  const hour = 60 * minute
  const day = 24 * hour
  const week = 7 * day
  const month = 30 * day

  const rtf = new Intl.RelativeTimeFormat(locale || 'en', { numeric: 'auto' })

  if (abs < hour) return rtf.format(Math.round(diff / minute), 'minute')
  if (abs < day) return rtf.format(Math.round(diff / hour), 'hour')
  if (abs < week) return rtf.format(Math.round(diff / day), 'day')
  if (abs < month) return rtf.format(Math.round(diff / week), 'week')
  return rtf.format(Math.round(diff / month), 'month')
}

export function AmaBoard({
  items,
  locale
}: {
  items: AmaEntry[]
  locale: string
}) {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [tagFilter, setTagFilter] = useState<string>('all')
  const [query, setQuery] = useState('')
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})

  const allTags = useMemo(
    () =>
      Array.from(new Set(items.flatMap((item) => item.tags))).sort((a, b) =>
        a.localeCompare(b)
      ),
    [items]
  )

  const counts = useMemo(
    () =>
      items.reduce(
        (acc, item) => {
          acc[item.status] += 1
          return acc
        },
        { live: 0, upcoming: 0, past: 0 } as Record<AmaStatus, number>
      ),
    [items]
  )

  const filtered = useMemo(
    () =>
      items.filter((item) => {
        const matchesStatus =
          statusFilter === 'all' ? true : item.status === statusFilter
        const matchesTag =
          tagFilter === 'all' ? true : item.tags.includes(tagFilter)
        const haystack = `${item.title} ${item.summary} ${item.content} ${item.guests.join(' ')} ${item.tags.join(' ')}`.toLowerCase()
        const matchesQuery = haystack.includes(query.toLowerCase().trim())
        return matchesStatus && matchesTag && matchesQuery
      }),
    [items, query, statusFilter, tagFilter]
  )

  const sorted = useMemo(() => {
    const weight: Record<AmaStatus, number> = {
      live: 0,
      upcoming: 1,
      past: 2
    }
    return [...filtered].sort((a, b) => {
      const w = weight[a.status] - weight[b.status]
      if (w !== 0) return w
      if (a.status === 'past' && b.status === 'past') {
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      }
      return new Date(a.date).getTime() - new Date(b.date).getTime()
    })
  }, [filtered])

  const heroItem = sorted.find((item) => item.status !== 'past') ?? sorted[0]
  const rest = heroItem ? sorted.filter((item) => item.id !== heroItem.id) : []

  return (
    <div className='relative space-y-10'>
      <div className='relative rounded-3xl border border-border/60 bg-background/90 p-8 shadow-2xl backdrop-blur supports-[backdrop-filter]:backdrop-blur-xl'>
        <div className='relative grid gap-6 lg:grid-cols-[2fr_1fr] lg:items-center'>
          <div className='space-y-4'>
            <Badge variant='outline' className='gap-2 border-primary/40 text-primary'>
              <Sparkles className='size-4' />
              Ask Me Anything
            </Badge>
            <div className='space-y-3'>
              <h1 className='text-balance text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl'>
                Live AMAs on building real-time AI agents
              </h1>
              <p className='text-muted-foreground max-w-2xl text-base sm:text-lg'>
                Join the team live, ask questions ahead of time, and replay past sessions.
                Filters below help you jump to the topics you care about.
              </p>
            </div>
            <div className='flex flex-wrap gap-3'>
              <Button asChild size='lg'>
                <a href='https://lu.ma/ten-ama' target='_blank' rel='noreferrer'>
                  Get notified
                </a>
              </Button>
              <Button asChild variant='outline' size='lg'>
                <a href='mailto:hi@theten.ai?subject=AMA%20question'>Submit a question</a>
              </Button>
            </div>
            <div className='flex flex-wrap gap-3 text-sm'>
              <Badge variant='secondary' className='gap-2'>
                <Mic2 className='size-4' />
                {counts.live} live
              </Badge>
              <Badge variant='secondary' className='gap-2'>
                <CalendarDays className='size-4' />
                {counts.upcoming} upcoming
              </Badge>
              <Badge variant='secondary' className='gap-2'>
                <PlayCircle className='size-4' />
                {counts.past} recordings
              </Badge>
            </div>
          </div>
          {heroItem ? (
            <Card className='group relative overflow-hidden border-border/70 bg-background/90 shadow-xl backdrop-blur supports-[backdrop-filter]:backdrop-blur-xl'>
              <CardHeader className='relative space-y-3'>
                <div className='flex flex-wrap items-center gap-3'>
                  <Badge
                    variant='outline'
                    className={cn(
                      'gap-2 border px-3 py-1 text-xs font-semibold',
                      statusCopy[heroItem.status].tone,
                      heroItem.status === 'live' && 'animate-pulse'
                    )}
                  >
                    {statusCopy[heroItem.status].label}
                  </Badge>
                  <div className='text-sm text-muted-foreground flex items-center gap-2'>
                    <Clock3 className='size-4' />
                    {relativeTime(heroItem.date, locale)}
                  </div>
                </div>
                <h2 className='text-xl font-semibold leading-tight sm:text-2xl'>
                  {heroItem.title}
                </h2>
                <p className='text-muted-foreground text-sm leading-relaxed'>
                  {heroItem.summary}
                </p>
              </CardHeader>
              <CardContent className='relative space-y-3'>
                <div className='flex flex-wrap gap-2'>
                  {heroItem.tags.map((tag) => (
                    <Badge key={tag} variant='outline' className='bg-background/60'>
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className='text-sm text-muted-foreground space-y-1'>
                  <div className='flex items-center gap-2'>
                    <CalendarDays className='size-4' />
                    <span>{formatDateTime(heroItem.date, locale)}</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Mic2 className='size-4' />
                    <span>{heroItem.guests.join(' · ')}</span>
                  </div>
                  {heroItem.location ? (
                    <div className='flex items-center gap-2'>
                      <Tag className='size-4' />
                      <span>{heroItem.location}</span>
                    </div>
                  ) : null}
                </div>
              </CardContent>
              <CardFooter className='relative flex items-center gap-3'>
                {heroItem.cta ? (
                  <Button asChild className='w-full justify-center sm:w-auto'>
                    <a href={heroItem.cta.href} target='_blank' rel='noreferrer'>
                      {heroItem.cta.label}
                    </a>
                  </Button>
                ) : null}
                {heroItem.recordingUrl ? (
                  <Button
                    asChild
                    variant='outline'
                    className='w-full justify-center sm:w-auto'
                  >
                    <a href={heroItem.recordingUrl} target='_blank' rel='noreferrer'>
                      Watch recap
                    </a>
                  </Button>
                ) : null}
              </CardFooter>
            </Card>
          ) : null}
        </div>
      </div>

      <div className='rounded-2xl border border-border/60 bg-background/90 p-6 shadow-xl backdrop-blur supports-[backdrop-filter]:backdrop-blur-xl'>
        <div className='flex flex-col gap-4 border-border/70 pb-4 sm:flex-row sm:items-center sm:justify-between sm:border-b'>
          <div className='flex flex-wrap items-center gap-2'>
            <Button
              variant={statusFilter === 'all' ? 'default' : 'outline'}
              size='sm'
              onClick={() => setStatusFilter('all')}
              className='shadow-sm'
            >
              All
            </Button>
            {(['live', 'upcoming', 'past'] as AmaStatus[]).map((status) => (
              <Button
                key={status}
                variant={statusFilter === status ? 'default' : 'outline'}
                size='sm'
                onClick={() => setStatusFilter(status)}
                className='shadow-sm'
              >
                {statusCopy[status].label}
              </Button>
            ))}
          </div>
          <div className='flex flex-wrap gap-3'>
            <div className='relative w-full sm:w-64'>
              <Search className='text-muted-foreground absolute left-3 top-1/2 size-4 -translate-y-1/2' />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder='Search title, guest, topic...'
                className='w-full rounded-lg border border-border/70 bg-background/80 py-2 pl-9 pr-3 text-sm outline-none ring-primary/20 transition focus:border-primary focus:ring-2'
              />
            </div>
            <div className='flex items-center gap-2 text-sm text-muted-foreground'>
              <Filter className='size-4' />
              <span className='hidden sm:inline'>Filter tags:</span>
              <div className='flex flex-wrap gap-2'>
                <button
                  type='button'
                  onClick={() => setTagFilter('all')}
                  className={cn(
                    'rounded-full border px-3 py-1 text-xs font-medium transition',
                    tagFilter === 'all'
                      ? 'border-primary/50 bg-primary/10 text-primary'
                      : 'border-border/70 bg-background/60 hover:border-primary/40 hover:text-primary'
                  )}
                >
                  All
                </button>
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    type='button'
                    onClick={() => setTagFilter(tag)}
                    className={cn(
                      'rounded-full border px-3 py-1 text-xs font-medium transition',
                      tagFilter === tag
                        ? 'border-primary/50 bg-primary/10 text-primary'
                        : 'border-border/70 bg-background/60 hover:border-primary/40 hover:text-primary'
                    )}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className='mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3'>
          {rest.map((item) => {
            const isOpen = expanded[item.id]
            return (
              <Card
                key={item.id}
                className='group relative overflow-hidden border-border/60 bg-background/90 shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-2xl'
              >
                <CardHeader className='relative space-y-3'>
                  <div className='flex flex-wrap items-center gap-2'>
                    <Badge
                      variant='outline'
                      className={cn(
                        'gap-2 border px-3 py-1 text-xs font-semibold',
                        statusCopy[item.status].tone,
                        item.status === 'live' && 'animate-pulse'
                      )}
                    >
                      {statusCopy[item.status].label}
                    </Badge>
                    <span className='text-xs text-muted-foreground flex items-center gap-1'>
                      <Clock3 className='size-3.5' />
                      {relativeTime(item.date, locale)}
                    </span>
                  </div>
                  <h3 className='text-lg font-semibold leading-snug text-foreground'>
                    {item.title}
                  </h3>
                  <div className='text-sm text-muted-foreground space-y-1'>
                    <div className='flex items-center gap-2'>
                      <CalendarDays className='size-4' />
                      <span>{formatDateTime(item.date, locale)}</span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <Mic2 className='size-4' />
                      <span>{item.guests.join(' · ')}</span>
                    </div>
                  </div>
                  <div className='flex flex-wrap gap-2'>
                    {item.tags.map((tag) => (
                      <Badge key={tag} variant='outline' className='bg-background/60'>
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>
                <CardContent className='relative space-y-3'>
                  <p className='text-sm text-muted-foreground leading-relaxed'>
                    {item.summary}
                  </p>
                  {isOpen ? (
                    <p className='text-sm text-foreground leading-relaxed'>
                      {item.content}
                    </p>
                  ) : null}
                </CardContent>
                <CardFooter className='relative flex flex-wrap items-center gap-3'>
                  {item.cta ? (
                    <Button asChild size='sm'>
                      <a href={item.cta.href} target='_blank' rel='noreferrer'>
                        {item.cta.label}
                      </a>
                    </Button>
                  ) : null}
                  {item.recordingUrl ? (
                    <Button asChild size='sm' variant='outline'>
                      <a href={item.recordingUrl} target='_blank' rel='noreferrer'>
                        Watch recap
                      </a>
                    </Button>
                  ) : null}
                  <Button
                    size='sm'
                    variant='ghost'
                    className='ml-auto text-xs'
                    onClick={() =>
                      setExpanded((prev) => ({
                        ...prev,
                        [item.id]: !prev[item.id]
                      }))
                    }
                  >
                    {isOpen ? 'Hide details' : 'Read more'}
                  </Button>
                </CardFooter>
              </Card>
            )
          })}
          {rest.length === 0 ? (
            <div className='col-span-full rounded-xl border border-dashed border-border/70 bg-background/80 p-8 text-center text-muted-foreground'>
              No AMAs match that filter. Try switching status or tags.
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
