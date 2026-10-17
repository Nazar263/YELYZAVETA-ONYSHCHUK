export const contact = {
  whatsapp: 'https://wa.me/447988884136',
  phone: 'tel:+447988884136',
  instagram: 'https://www.instagram.com/brunetkaa_hair/',
  maps: 'https://maps.app.goo.gl/nsRBmmsTSsB1LGDc8?g_st=ic',
  mapEmbed:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2483.9197623794375!2d-0.0175522!3d51.496339899999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4876030053d5cf61%3A0x4f0746b50daa1c5d!2sBrunetkaa_hair!5e0!3m2!1suk!2sua!4v1792073859597!5m2!1suk!2sua',
  generalMessage:
    "Hi Yelyzaveta! I'd like to book a hair treatment. Could you help me choose a service and an appointment time?",
  address: 'London E14 9RP, United Kingdom',
};

const illustrativeOrigin =
  'Service illustration. Examples of treatment results are shown separately in the Results section.';

export type ServiceVariant = {
  id: string;
  label: string;
  lead: string;
  paragraphs: readonly string[];
  listLabel: 'Results' | 'Benefits';
  list: readonly string[];
  idealFor: string;
};

export type ServiceExtra = {
  title: string;
  body: string;
  tone?: 'note' | 'warning';
};

export const services = [
  {
    title: 'Keratin / Hair Botox',
    bookingService: 'Keratin / Hair Botox',
    summary: 'Smoothing or conditioning care tailored to your hair and desired finish.',
    image: {
      src: '/images/service-keratin-botox.jpg',
      alt: 'Illustrative cover image: long smooth hair catching warm studio light',
      caption: 'Illustrative image',
      origin: illustrativeOrigin,
    },
    prices: [130, 150, 180, 220, 260],
    densitySurcharge: '£20–£40',
    variants: [
      {
        id: 'keratin',
        label: 'Keratin Hair Straightening',
        lead: 'For those who want smoother, straighter hair with less frizz.',
        paragraphs: [
          'Keratin hair straightening is a smoothing treatment designed to reduce frizz and relax natural waves or curls, depending on your hair type and the product used.',
          'After the treatment, hair becomes more manageable, easier to brush and requires less time for everyday styling.',
        ],
        listLabel: 'Results',
        list: [
          'Smoother, straighter-looking hair',
          'Reduced frizz and unwanted volume',
          'More manageable, unruly strands',
          'Enhanced shine and easier styling',
        ],
        idealFor:
          'those who want to reduce frizz, smooth natural waves or curls, and achieve a sleek, straight finish.',
      },
      {
        id: 'botox',
        label: 'Hair Botox',
        lead: 'For those who want softer, shinier and healthier-looking hair.',
        paragraphs: [
          'Hair Botox is a conditioning and smoothing treatment designed to improve the appearance of dry, porous and dull hair.',
          'Depending on the formula, it helps make hair softer, reduce frizz, enhance shine and improve manageability. The level of smoothing depends on the specific product used.',
        ],
        listLabel: 'Results',
        list: [
          'Softer, smoother hair',
          'Improved appearance of dry and porous strands',
          'Enhanced shine and easier detangling',
          'Reduced frizz and a more polished finish',
        ],
        idealFor:
          'those who want to improve the appearance of their hair, making it softer, shinier and easier to manage without necessarily aiming for a completely straight result.',
      },
    ] as const,
    detail: null,
  },
  {
    title: 'Cold Hair Reconstruction',
    bookingService: 'Cold Hair Reconstruction',
    summary: 'Personalised restorative care for dry, damaged or weakened hair.',
    image: {
      src: '/images/service-cold-reconstruction.jpg',
      alt: 'Illustrative cover image: hands working a section of hair',
      caption: 'Illustrative image',
      origin: illustrativeOrigin,
    },
    prices: [100, 120, 140, 150, 160],
    densitySurcharge: null,
    variants: null,
    detail: {
      lead: 'Personalised care for damaged, dry and weakened hair.',
      paragraphs: [
        'Cold Hair Reconstruction is a treatment designed to improve the internal structure and condition of the hair using specially selected restorative formulas.',
        'Every client’s hair is different, which is why the formula is individually selected after a hair assessment. I consider the level of damage, porosity, elasticity, previous colouring and bleaching to choose the most suitable treatment for your hair’s needs.',
        'The treatment aims to support the hair’s internal structure and improve its overall condition, helping it feel softer, more elastic and more manageable, while enhancing its appearance.',
      ],
      listLabel: 'Benefits',
      list: [
        'An individually selected formula for your hair’s condition.',
        'Targeted care for damaged and weakened hair.',
        'Improved softness and elasticity.',
        'Helps reduce dryness and breakage.',
        'Enhanced shine, smoothness and manageability.',
      ],
      idealFor:
        'dry, porous, bleached, coloured or damaged hair that needs personalised restorative care.',
      closingNote:
        'The key feature of this treatment is its individual approach — rather than using the same formula for everyone, I select the most suitable products according to your hair’s specific needs.',
      extra: null,
    },
  },
  {
    title: 'Keratin or Hair Botox + Cold Hair Reconstruction',
    bookingService: 'Keratin or Hair Botox + Cold Hair Reconstruction',
    summary: 'Smoothing and restorative care combined in one personalised treatment.',
    image: {
      src: '/images/service-complex-treatment.jpg',
      alt: 'Illustrative cover image: a treatment being worked through the hair by hand',
      caption: 'Illustrative image',
      origin: illustrativeOrigin,
    },
    prices: [180, 200, 250, 280, 330],
    densitySurcharge: '£20–£40',
    variants: null,
    detail: {
      lead: 'Smoothing and restorative care combined in one personalised treatment.',
      paragraphs: [
        'This combined treatment brings together two procedures: keratin hair straightening or Hair Botox, alongside Cold Hair Reconstruction.',
        'The smoothing treatment helps reduce frizz, control volume and improve manageability, while Cold Hair Reconstruction provides additional targeted care for the hair’s condition.',
        'The combination is individually selected according to your hair type, level of damage, porosity and previous chemical treatments. This approach is particularly worth considering for hair that needs both a smoother finish and additional restorative care.',
      ],
      listLabel: 'Benefits',
      list: [
        'Smoother, shinier and more manageable hair.',
        'Reduced frizz and easier everyday styling.',
        'Additional care for dry, porous or weakened hair.',
        'A personalised combination tailored to your hair’s needs.',
        'Improved softness and overall appearance.',
      ],
      idealFor:
        'those who want a smoothing effect while giving dry, coloured, porous or damaged hair additional care.',
      closingNote: null,
      extra: {
        title: 'Which combination is right for you?',
        body: 'Depending on your hair’s condition and your desired result, I will recommend either Keratin + Cold Hair Reconstruction or Hair Botox + Cold Hair Reconstruction.',
        tone: 'note',
      },
    },
  },
  {
    title: 'Nanoplasty Hair Straightening',
    bookingService: 'Nanoplasty Hair Straightening',
    summary:
      'An intensive straightening option for thick, coarse or curly hair, subject to assessment.',
    image: {
      src: '/images/service-nanoplasty.jpg',
      alt: 'Illustrative cover image: long straight hair photographed from a different angle',
      caption: 'Illustrative image',
      origin: illustrativeOrigin,
    },
    prices: [180, 210, 230, 260, 300],
    densitySurcharge: '£20–£40',
    variants: null,
    detail: {
      lead: 'For those who want a more intensive straightening effect for curly, thick and unruly hair.',
      paragraphs: [
        'Nanoplasty is a hair-smoothing treatment designed to reduce frizz, control volume and straighten natural curls.',
        'It is generally best suited to hair that is naturally thick, coarse, curly or very frizzy and difficult to style.',
      ],
      listLabel: 'Results',
      list: [
        'More pronounced straightening of waves and curls.',
        'Reduced frizz and excess volume.',
        'Smoother, shinier and more manageable hair.',
        'Easier everyday styling.',
      ],
      idealFor: 'those with thick, coarse, curly hair that is resistant to smoothing.',
      closingNote: null,
      extra: {
        title: 'Not recommended for:',
        body: 'fine, weakened, brittle or severely damaged hair, particularly hair that has been bleached. In these cases, an intensive treatment involving high temperatures may worsen the hair’s condition. A professional assessment is necessary to determine whether nanoplasty is suitable.',
        tone: 'warning',
      },
    },
  },
] as const;

export const lengthCategories = [1, 2, 3, 4, 5] as const;

export const keratinBotoxClarifications = [
  'Keratin Hair Straightening',
  'Hair Botox',
] as const;

export const priceNote =
  'Prices depend on hair length. Please message me to confirm your hair length category and the final price.';

export const bookingServices = [
  'Keratin / Hair Botox',
  'Cold Hair Reconstruction',
  'Keratin or Hair Botox + Cold Hair Reconstruction',
  'Nanoplasty Hair Straightening',
  'Help me choose',
] as const;

export type BookingService = (typeof bookingServices)[number];

export const bookingAddress = 'London E14 9RP, United Kingdom';

export const buildBookingMessage = ({
  name,
  service,
  clarification,
  date,
  comment,
}: {
  name: string;
  service: string;
  clarification?: string;
  date?: string;
  comment?: string;
}) => {
  const lines = [
    `Hi Yelyzaveta! My name is ${name.trim()}.`,
    clarification?.trim()
      ? `Service: ${service} — ${clarification.trim()}.`
      : `Service: ${service}.`,
  ];
  if (date?.trim()) lines.push(`Preferred date: ${date.trim()}.`);
  if (comment?.trim()) lines.push(`Comment: ${comment.trim()}`);
  lines.push(
    'Could you please advise on the price and available appointment times? The final time will be agreed in chat.',
  );
  return lines.join('\n');
};

export const bookingWhatsAppUrl = ({
  name,
  service,
  clarification,
  date,
  comment,
}: {
  name: string;
  service: string;
  clarification?: string;
  date?: string;
  comment?: string;
}) =>
  `${contact.whatsapp}?text=${encodeURIComponent(
    buildBookingMessage({ name, service, clarification, date, comment }),
  )}`;

export const lengthScale = {
  label: 'Length scale 1–5',
  legendStart: '1 · shortest',
  legendEnd: '5 · longest',
  hint: 'Category 1 covers the shortest hair and category 5 the longest — the price rises with every step.',
  note: 'No centimetre boundaries are published. Message me on WhatsApp to confirm your category and the final price.',
} as const;

export const faqs = [
  {
    question: 'How do I find my hair length category?',
    answer:
      'Prices use numbered length categories 1–5. No centimetre boundaries are published, so please message me on WhatsApp and I can help confirm your category.',
  },
  {
    question: 'Is there an additional charge for thick hair?',
    answer:
      'A £20–£40 surcharge may apply to Keratin / Hair Botox, Keratin or Hair Botox + Cold Hair Reconstruction, and Nanoplasty Hair Straightening. No thick-hair surcharge is listed for Cold Hair Reconstruction.',
  },
  {
    question: 'Where is Brunetkaa Hair?',
    answer: `The listed location is ${contact.address}.`,
  },
  {
    question: 'How can I book?',
    answer:
      'Message Yelyzaveta on WhatsApp to discuss a service and an appointment time. Sending a message does not automatically book an appointment.',
  },
];

export const whatsappForService = (serviceName: string) =>
  `${contact.whatsapp}?text=${encodeURIComponent(
    `Hi Yelyzaveta! I'm interested in ${serviceName}. Could you please advise on the price and available appointment times?`,
  )}`;
