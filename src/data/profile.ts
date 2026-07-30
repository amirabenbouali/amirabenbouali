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

export const profile: Profile = {
  name: 'Amira Benbouali',
  location: 'London',
  title: 'Software engineer and product builder',
  identityLabel: 'Amira / London / Software & Product',
  headline: 'I build software that feels quiet.',
  introduction:
    'I design and engineer careful digital systems for teams who value clarity, restraint, and momentum.',
  philosophy:
    'My work sits between product judgment and engineering depth: calm interfaces, durable systems, and tools that respect attention.',
  contact: {
    email: 'hello@amirabenbouali.com',
    availability: 'Available for selective product engineering collaborations.'
  }
};
