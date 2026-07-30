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
