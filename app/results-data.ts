export type ResultPair = {
  id: string;
  layout: 'slider' | 'side-by-side';
  before: { src: string; alt: string };
  after: { src: string; alt: string };
  controlLabel: string;
};

export const resultPairs: ResultPair[] = [
  {
    id: 'pair-01',
    layout: 'slider',
    before: {
      src: '/images/results/pair-01/before.webp',
      alt: 'Hair before treatment — frizzy curly hair',
    },
    after: {
      src: '/images/results/pair-01/after.webp',
      alt: 'Hair after treatment — smooth shiny straight hair',
    },
    controlLabel: 'Compare before and after — example 1',
  },
  {
    id: 'pair-02',
    layout: 'slider',
    before: {
      src: '/images/results/pair-02/before.webp',
      alt: 'Hair before treatment — voluminous frizzy hair spread',
    },
    after: {
      src: '/images/results/pair-02/after.webp',
      alt: 'Hair after treatment — sleek long straight hair front view',
    },
    controlLabel: 'Compare before and after — example 2',
  },
  {
    id: 'pair-03',
    layout: 'slider',
    before: {
      src: '/images/results/pair-03/before.webp',
      alt: 'Hair before treatment — thick afro curly hair',
    },
    after: {
      src: '/images/results/pair-03/after.webp',
      alt: 'Hair after treatment — silky straight black hair',
    },
    controlLabel: 'Compare before and after — example 3',
  },
  {
    id: 'pair-04',
    layout: 'slider',
    before: {
      src: '/images/results/pair-04/before.webp',
      alt: 'Hair before treatment — long dark slightly frizzy hair',
    },
    after: {
      src: '/images/results/pair-04/after.webp',
      alt: 'Hair after treatment — very long straight glossy hair',
    },
    controlLabel: 'Compare before and after — example 4',
  },
];
