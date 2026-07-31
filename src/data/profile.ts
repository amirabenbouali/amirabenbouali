export type Profile = {
  name: string;
  location: string;
  title: string;
  identityLabel: string;
  headline: string;
  introduction: string;
  philosophy: string;
  contact: {
    email: string;
    availability: string;
  };
};

export type Exploration = {
  topic: string;
  note: string;
};

export type JourneyMoment = {
  label: string;
  title: string;
  note: string;
};

export type BuildStep = {
  step: string;
  note: string;
};

export const profile: Profile = {
  name: 'Amira Benbouali',
  location: 'London',
  title: 'Software Engineer',
  identityLabel: 'Amira Benbouali',
  headline: 'Building thoughtful software, developer tools and products from London.',
  introduction:
    'Building thoughtful software, developer tools and products from London.',
  philosophy:
    'My work sits between product judgment and engineering depth: calm interfaces, durable systems, and tools that respect attention.',
  contact: {
    email: 'hello@amirabenbouali.com',
    availability: 'Available for selective product engineering collaborations.'
  }
};

export const buildProcess: BuildStep[] = [
  {
    step: 'Research',
    note: 'I start by listening for the shape of the problem before reaching for the shape of the interface.'
  },
  {
    step: 'Sketch',
    note: 'I make rough structures early because a sketch can reveal a bad assumption before code makes it expensive.'
  },
  {
    step: 'Prototype',
    note: 'I like prototypes that answer one honest question instead of pretending to be a finished product.'
  },
  {
    step: 'Build',
    note: 'I care about the quiet parts: naming, state, edge cases, loading, and the future person reading the code.'
  },
  {
    step: 'Refine',
    note: 'I return to pacing, language, accessibility and performance until the product feels calmer than the brief.'
  },
  {
    step: 'Ship',
    note: 'Shipping is not the end of the thought. It is the first time the work can teach back.'
  }
];

export const explorations: Exploration[] = [
  {
    topic: 'Developer tools',
    note: 'Tools that make engineering feel more legible without turning every workflow into ceremony.'
  },
  {
    topic: 'Frontend architecture',
    note: 'Interfaces that can grow without losing their ability to be understood.'
  },
  {
    topic: 'Product thinking',
    note: 'The small decisions that decide whether a product feels generous or demanding.'
  },
  {
    topic: 'Interaction design',
    note: 'Motion, rhythm and feedback that help people trust what just happened.'
  },
  {
    topic: 'Performance',
    note: 'Speed as a kind of respect, especially when the interface is used repeatedly.'
  },
  {
    topic: 'Accessibility',
    note: 'Designing for different ways of moving through a product from the beginning, not as a final pass.'
  },
  {
    topic: 'Systems design',
    note: 'How constraints, data and people form one system whether the interface admits it or not.'
  }
];

export const journeyMoments: JourneyMoment[] = [
  {
    label: 'London',
    title: 'Moved through a city that rewards attention.',
    note: 'London changed how I look at systems: transport, streets, museums, rituals, all layered and imperfect.'
  },
  {
    label: 'Study',
    title: 'Studied Computer Science.',
    note: 'The useful part was not memorising answers. It was learning how much clarity matters when ideas become systems.'
  },
  {
    label: 'First product',
    title: 'Built something that had to make sense to someone else.',
    note: 'That shift from making a thing work to making a thing understandable still guides how I build.'
  },
  {
    label: 'Graduated',
    title: 'Left with more questions than certainty.',
    note: 'The questions became useful: what should exist, who is it for, and what does the product ask of them?'
  },
  {
    label: 'Documentation',
    title: 'Started documenting the work.',
    note: 'Writing about projects helped me see the decisions behind them, not only the outcomes.'
  },
  {
    label: 'Now',
    title: 'Continue building deliberately.',
    note: 'I am interested in products that feel calm because the thinking behind them is precise.'
  }
];

export const outsideSoftware = [
  'Running through London when the city is still half-asleep.',
  'Looking at architecture for evidence of restraint and rhythm.',
  'Photography, especially the kind that makes ordinary light feel considered.',
  'Museums, late-night walks, reading, and noticing how physical spaces guide attention.'
];
