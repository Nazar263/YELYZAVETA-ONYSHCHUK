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
    layout: 'side-by-side',
    before: {
      src: '/images/results/pair-01/before.webp',
      alt: 'Hair before treatment — example 1',
    },
    after: {
      src: '/images/results/pair-01/after.webp',
      alt: 'Hair after treatment — example 1',
    },
    controlLabel: 'Compare before and after — example 1',
  },
  {
    id: 'pair-02',
    layout: 'slider',
    before: {
      src: '/images/results/pair-02/before.webp',
      alt: 'Hair before treatment — example 2',
    },
    after: {
      src: '/images/results/pair-02/after.webp',
      alt: 'Hair after treatment — example 2',
    },
    controlLabel: 'Compare before and after — example 2',
  },
  {
    id: 'pair-03',
    layout: 'slider',
    before: {
      src: '/images/results/pair-03/before.webp',
      alt: 'Hair before treatment — example 3',
    },
    after: {
      src: '/images/results/pair-03/after.webp',
      alt: 'Hair after treatment — example 3',
    },
    controlLabel: 'Compare before and after — example 3',
  },
  {
    id: 'pair-04',
    layout: 'slider',
    before: {
      src: '/images/results/pair-04/before.webp',
      alt: 'Hair before treatment — example 4',
    },
    after: {
      src: '/images/results/pair-04/after.webp',
      alt: 'Hair after treatment — example 4',
    },
    controlLabel: 'Compare before and after — example 4',
  },
];
