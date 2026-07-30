export type WritingNote = {
  slug: string;
  title: string;
  deck: string;
  date: string;
  tags: string[];
};

export const writingNotes: WritingNote[] = [
  {
    slug: 'interfaces-with-night-vision',
    title: 'Interfaces with night vision',
    deck: 'On building products that help people see structure without raising the temperature.',
    date: '2026-02-18',
    tags: ['Design systems', 'Product']
  },
  {
    slug: 'small-tools-serious-work',
    title: 'Small tools for serious work',
    deck: 'A field note on internal products, maintenance, and the dignity of operational software.',
    date: '2025-11-04',
    tags: ['Engineering', 'Tools']
  }
];
