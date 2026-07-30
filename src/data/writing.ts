export type ArticleBlock =
  | {
      type: 'paragraph';
      text: string;
    }
  | {
      type: 'blockquote';
      text: string;
      cite?: string;
    }
  | {
      type: 'code';
      language: string;
      code: string;
    }
  | {
      type: 'divider';
    }
  | {
      type: 'footnote';
      text: string;
    };

export type WritingNote = {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  readingTime: string;
  category: string;
  tags: string[];
  content: ArticleBlock[];
  futureCover: {
    mood: string;
    palette: string;
  };
};

export const writingNotes: WritingNote[] = [
  {
    slug: 'why-every-calendar-app-overwhelms-me',
    title: 'Why every calendar app overwhelms me',
    excerpt: 'What if a calendar is not a container for time, but a record of how much context we ask a person to hold?',
    publishedAt: '2026-03-14',
    readingTime: '6 min read',
    category: 'Product systems',
    tags: ['Product', 'Interaction', 'Attention'],
    futureCover: {
      mood: 'quiet scheduling study',
      palette: 'charcoal, olive, lunar ivory'
    },
    content: [
      {
        type: 'paragraph',
        text: 'What if the problem with calendars is not that they show too much, but that they rarely explain why anything matters? I can look at a perfectly organized week and still feel behind before the day has started.'
      },
      {
        type: 'paragraph',
        text: 'Most calendar products treat time as a grid first and a human constraint second. They make overlap visible, but not emotional weight. They show duration, but not preparation. They help me find a slot, but not understand whether the slot deserves to exist.'
      },
      {
        type: 'blockquote',
        text: 'A calm interface does not remove complexity. It decides which complexity deserves to arrive first.'
      },
      {
        type: 'paragraph',
        text: 'When I design scheduling software now, I start by asking what the calendar is protecting. Deep work, recovery, decision-making, family logistics, team rituals: each one asks for a different shape. A meeting can be thirty minutes and still cost the whole morning.'
      },
      {
        type: 'code',
        language: 'ts',
        code: "type CalendarEvent = {\n  visibleTime: DateRange;\n  hiddenCost: 'context' | 'energy' | 'coordination';\n  reason: string;\n};"
      },
      {
        type: 'paragraph',
        text: 'The best calendar would not be clever. It would be honest. It would help me see when my day has become a stack of obligations pretending to be a plan.'
      },
      {
        type: 'footnote',
        text: 'Field note: I still use a normal calendar. The work is not escaping common tools. It is learning what they quietly normalize.'
      }
    ]
  },
  {
    slug: 'designing-software-that-feels-calm',
    title: 'Designing software that feels calm',
    excerpt: 'Calm software gives people enough structure to move without making them feel watched by the interface.',
    publishedAt: '2026-02-02',
    readingTime: '5 min read',
    category: 'Design engineering',
    tags: ['Design', 'Systems', 'Craft'],
    futureCover: {
      mood: 'dim interface study',
      palette: 'warm black, grey, pale yellow'
    },
    content: [
      {
        type: 'paragraph',
        text: 'I notice calm software most when it does not ask me to admire it. It gives me a place to think, then steps back. The best systems feel composed because they understand the difference between guidance and performance.'
      },
      {
        type: 'paragraph',
        text: 'A calm product is not empty. It can be dense, technical and powerful. The calm comes from sequence: what appears first, what waits, what becomes available only when the person has enough context to use it.'
      },
      {
        type: 'blockquote',
        text: 'Restraint is not the absence of design. It is design with fewer apologies.'
      },
      {
        type: 'paragraph',
        text: 'I tend to look for friction that protects the user from accidental speed. Confirmation is not always cowardice. A pause can be a feature when the action has consequence.'
      },
      {
        type: 'divider'
      },
      {
        type: 'paragraph',
        text: 'The craft is in making the slower path feel respected rather than punished. That usually means better defaults, clearer language, and controls that say exactly what they will do.'
      }
    ]
  },
  {
    slug: 'the-hidden-cost-of-feature-first-thinking',
    title: 'The hidden cost of feature-first thinking',
    excerpt: 'A feature can look small in a roadmap and still change the emotional contract of a product.',
    publishedAt: '2025-12-11',
    readingTime: '7 min read',
    category: 'Product thinking',
    tags: ['Product', 'Roadmaps', 'Engineering'],
    futureCover: {
      mood: 'roadmap margin notes',
      palette: 'charcoal, graphite, olive'
    },
    content: [
      {
        type: 'paragraph',
        text: 'A feature-first conversation often begins with a reasonable sentence: can we just add this? Sometimes the answer is yes. But the more interesting question is what the feature will ask the system to become.'
      },
      {
        type: 'paragraph',
        text: 'Every feature changes more than surface area. It changes testing pressure, support language, documentation, onboarding, pricing assumptions, and the mental model a user carries into the product.'
      },
      {
        type: 'blockquote',
        text: 'The cost of a feature is not only the work to build it. It is the work to keep believing in it later.'
      },
      {
        type: 'paragraph',
        text: 'I have learned to treat feature requests as clues. They point toward a need, but they are rarely the need itself. The work is to stay with the discomfort long enough to find the smaller, truer intervention.'
      }
    ]
  },
  {
    slug: 'building-products-before-writing-resumes',
    title: 'Building products before writing resumes',
    excerpt: 'Sometimes the most honest portfolio is not a list of skills, but evidence of what you repeatedly choose to make real.',
    publishedAt: '2025-10-23',
    readingTime: '4 min read',
    category: 'Practice',
    tags: ['Career', 'Making', 'Evidence'],
    futureCover: {
      mood: 'desk at night',
      palette: 'ink, ivory, muted olive'
    },
    content: [
      {
        type: 'paragraph',
        text: 'I have rewritten resumes and felt strangely invisible afterward. The sentences were accurate, but they flattened the thing I wanted to show: judgment, taste, patience, and the ability to make decisions when there is no perfect brief.'
      },
      {
        type: 'paragraph',
        text: 'Building products gives the work somewhere to live. Even a small prototype can reveal how someone thinks about constraints, hierarchy, failure, language and finish.'
      },
      {
        type: 'paragraph',
        text: 'A resume can summarize competence. A product can demonstrate care.'
      }
    ]
  },
  {
    slug: 'why-i-enjoy-rebuilding-things-from-scratch',
    title: 'Why I enjoy rebuilding things from scratch',
    excerpt: 'Rebuilding is a way to find the assumptions that documentation politely walks around.',
    publishedAt: '2025-09-08',
    readingTime: '5 min read',
    category: 'Engineering practice',
    tags: ['Learning', 'Systems', 'Architecture'],
    futureCover: {
      mood: 'component teardown',
      palette: 'black, grey, quiet yellow'
    },
    content: [
      {
        type: 'paragraph',
        text: 'Rebuilding something from scratch is not always efficient. That is partly why I like it. It forces me to notice where the original idea carries its weight and where the implementation has inherited habits nobody questions anymore.'
      },
      {
        type: 'paragraph',
        text: 'The goal is not to prove I can make a smaller version of a familiar tool. The goal is to feel the shape of the problem directly. Once I have felt that shape, I make better choices when I return to the real system.'
      },
      {
        type: 'blockquote',
        text: 'A rebuild is not a rejection of the existing thing. It is a slow conversation with it.'
      }
    ]
  },
  {
    slug: 'learning-to-slow-down-while-engineering-faster',
    title: 'Learning to slow down while engineering faster',
    excerpt: 'Speed improves when fewer decisions have to be recovered from later.',
    publishedAt: '2025-07-19',
    readingTime: '6 min read',
    category: 'Engineering practice',
    tags: ['Delivery', 'Quality', 'Teams'],
    futureCover: {
      mood: 'release notes in low light',
      palette: 'warm black, olive, ivory'
    },
    content: [
      {
        type: 'paragraph',
        text: 'The fastest engineers I know are not rushing. They are reducing the number of times the same question has to be reopened. They write code in a way that makes the next decision easier.'
      },
      {
        type: 'paragraph',
        text: 'Slowing down often looks like naming things carefully, deleting a clever abstraction, or writing the test that makes a future refactor boring. None of that feels dramatic. Most useful engineering does not.'
      },
      {
        type: 'code',
        language: 'ts',
        code: "const durableSpeed = clarity + tests + fewerSurprises;"
      },
      {
        type: 'paragraph',
        text: 'I am learning to prefer the kind of speed that leaves a room cleaner than it found it.'
      }
    ]
  },
  {
    slug: 'the-first-version-is-never-the-product',
    title: 'The first version is never the product',
    excerpt: 'A first version is less a launch and more a question asked in public.',
    publishedAt: '2025-05-30',
    readingTime: '4 min read',
    category: 'Product craft',
    tags: ['Iteration', 'Launch', 'Product'],
    futureCover: {
      mood: 'prototype archive',
      palette: 'charcoal, ivory, warm grey'
    },
    content: [
      {
        type: 'paragraph',
        text: 'A first version is usually too literal. It reflects what the team thought the problem was before the product had any contact with reality.'
      },
      {
        type: 'paragraph',
        text: 'That does not make it disposable. The first version is valuable because it creates evidence. People misunderstand it, ignore parts of it, rely on parts you thought were minor, and show you where the real product begins.'
      },
      {
        type: 'blockquote',
        text: 'The first version is not the product. It is the instrument that helps you hear it.'
      }
    ]
  }
];

export function getWritingNoteBySlug(slug: string | undefined) {
  return writingNotes.find((note) => note.slug === slug);
}
