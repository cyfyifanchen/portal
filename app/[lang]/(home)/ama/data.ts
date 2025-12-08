export type AmaStatus = 'upcoming' | 'live' | 'past'

export type AmaEntry = {
  id: string
  title: string
  date: string
  status: AmaStatus
  summary: string
  content: string
  guests: string[]
  tags: string[]
  location?: string
  cta?: {
    label: string
    href: string
  }
  recordingUrl?: string
}

export const AMA_ENTRIES: AmaEntry[] = [
  {
    id: 'ama-live-dev-loop',
    title: 'Live AMA: shipping a voice agent end-to-end',
    date: '2025-02-27T17:00:00Z',
    status: 'live',
    summary:
      'We wire up a real-time voice agent with VAD, session state, and guardrails, then ship it live with TEN.',
    content:
      'A hands-on build of a production-ready voice agent: streaming transport, interruptions, evaluating latency, and deploying to a small beta group.',
    guests: ['Elliot Chen (host)', 'Joyce Wang'],
    tags: ['Voice AI', 'Shipping', 'Live coding'],
    location: 'Discord community stage',
    cta: {
      label: 'Join live on Discord',
      href: 'https://discord.gg/VnPftUzAMJ'
    }
  },
  {
    id: 'ama-upcoming-roadmap',
    title: 'TEN roadmap + community AMA',
    date: '2025-03-13T17:00:00Z',
    status: 'upcoming',
    summary:
      'Roadmap updates, what’s landing next, and Q&A on integrations and deployment patterns.',
    content:
      'We’ll cover what’s shipping next (streaming transports, adapters, and observability), then open the floor to community questions.',
    guests: ['Elliot Chen (host)', 'TEN Core Team'],
    tags: ['Roadmap', 'Community', 'Product'],
    location: 'Discord community stage',
    cta: {
      label: 'RSVP on Discord',
      href: 'https://discord.gg/VnPftUzAMJ'
    }
  },
  {
    id: 'ama-upcoming-latency',
    title: 'Latency budgets for real-time agents',
    date: '2025-03-27T17:00:00Z',
    status: 'upcoming',
    summary:
      'Deep dive on keeping response times under 300ms: audio pipelines, caching prompts, and transport tweaks.',
    content:
      'We unpack common bottlenecks, profiling tips, and how to design for graceful degradation when upstreams are slow.',
    guests: ['Elliot Chen (host)', 'Ray Chen'],
    tags: ['Performance', 'Voice AI', 'Infra'],
    location: 'Discord community stage',
    cta: {
      label: 'Save a seat',
      href: 'https://discord.gg/VnPftUzAMJ'
    }
  },
  {
    id: 'ama-past-websockets',
    title: 'Building real-time voice AI with WebSockets',
    date: '2025-02-13T17:00:00Z',
    status: 'past',
    summary:
      'How to stitch together transport, VAD, and interruptions using TEN’s WebSocket pipeline.',
    content:
      'We demoed a bi-directional streaming setup, discussed reconnection strategies, and shared a starter template.',
    guests: ['Elliot Chen (host)'],
    tags: ['Voice AI', 'WebSockets'],
    location: 'Discord community stage',
    recordingUrl: 'https://youtube.com/@tenframework'
  },
  {
    id: 'ama-past-avatars',
    title: 'Multimodal avatars and on-device pipelines',
    date: '2025-01-30T17:00:00Z',
    status: 'past',
    summary:
      'A look at driving Live2D-style avatars with speech, gestures, and lightweight on-device models.',
    content:
      'We covered rendering loops, latency trade-offs for gestures, and when to offload to the edge.',
    guests: ['Elliot Chen (host)', 'TEN Graphics Team'],
    tags: ['Avatars', 'Multimodal', 'Edge'],
    location: 'Discord community stage',
    recordingUrl: 'https://youtube.com/@tenframework'
  },
  {
    id: 'ama-past-evals',
    title: 'Evaluating conversational agents in the wild',
    date: '2025-01-16T17:00:00Z',
    status: 'past',
    summary:
      'Practical eval harnesses for live agents, including interruptions, accents, and background noise.',
    content:
      'We walked through scorecards, user-in-the-loop QA, and how to pipe traces into your observability stack.',
    guests: ['Elliot Chen (host)', 'Community panel'],
    tags: ['Evals', 'Quality', 'Community'],
    location: 'Discord community stage',
    recordingUrl: 'https://youtube.com/@tenframework'
  },
  {
    id: 'ama-past-realtime-latency',
    title: 'Latency playbook for sub-300ms replies',
    date: '2025-01-02T17:00:00Z',
    status: 'past',
    summary:
      'Profiling audio pipelines, caching prompts, and retry tactics that keep agents responsive.',
    content:
      'We unpacked common bottlenecks and shared a lightweight checklist for measuring and shaving latency.',
    guests: ['Elliot Chen (host)'],
    tags: ['Performance', 'Voice AI'],
    location: 'Discord community stage',
    recordingUrl: 'https://youtube.com/@tenframework'
  },
  {
    id: 'ama-past-avatars-on-device',
    title: 'On-device streaming and graceful degradation',
    date: '2024-12-19T17:00:00Z',
    status: 'past',
    summary:
      'Designing fallbacks when upstream LLMs slow down, and keeping UX smooth on edge hardware.',
    content:
      'We covered transport retries, backpressure handling, and when to punt to cached responses.',
    guests: ['Elliot Chen (host)'],
    tags: ['Edge', 'Resilience'],
    location: 'Discord community stage',
    recordingUrl: 'https://youtube.com/@tenframework'
  },
  {
    id: 'ama-past-first',
    title: 'Kickoff AMA: building real-time agents with TEN',
    date: '2024-12-05T17:00:00Z',
    status: 'past',
    summary:
      'Introduced the biweekly AMA series, walked through the starter kit, and answered early community questions.',
    content:
      'We covered how to scaffold a project, wire transports, and what’s on the roadmap.',
    guests: ['Elliot Chen (host)'],
    tags: ['Community', 'Getting started'],
    location: 'Discord community stage',
    recordingUrl: 'https://youtube.com/@tenframework'
  }
]
