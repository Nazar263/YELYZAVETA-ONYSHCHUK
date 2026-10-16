export const contact = {
  whatsapp: 'https://wa.me/447988884136',
  phone: 'tel:+447988884136',
  instagram: 'https://www.instagram.com/brunetkaa_hair/',
  maps: 'https://maps.app.goo.gl/nsRBmmsTSsB1LGDc8',
  mapEmbed:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2483.9197623794375!2d-0.0175522!3d51.496339899999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4876030053d5cf61%3A0x4f0746b50daa1c5d!2sBrunetkaa_hair!5e0!3m2!1suk!2sua!4v1792073859597!5m2!1suk!2sua',
  generalMessage:
    "Hi Yelyzaveta! I'd like to book a hair treatment. Could you help me choose a service and an appointment time?",
  address: 'Unit 12 Skylines Village, London E14 9TS, United Kingdom',
};

const illustrativeOrigin =
  'AI-generated illustration used as a service cover. Not a photograph of Yelyzaveta’s work and not a before/after result.';

export const services = [
  {
    title: 'Keratin / Hair Botox',
    summary: 'Smoothing treatment for hair prone to frizz, priced by hair length.',
    description:
      'Keratin and hair botox are offered together as one smoothing service with a shared price list. Every appointment starts with a conversation about how your hair behaves now and the result you have in mind, so you can decide together whether this treatment suits your hair. Prices follow the five length categories below, and a thick-hair surcharge may apply.',
    image: {
      src: '/images/service-keratin-botox.jpg',
      alt: 'Illustrative cover image: long smooth hair catching warm studio light (generated for this page)',
      caption: 'Illustrative image',
      origin: illustrativeOrigin,
    },
    prices: [130, 150, 180, 220, 260],
    densitySurcharge: '£20–£40',
  },
  {
    title: 'Cold Reconstruction',
    summary: 'Care treatment for hair that needs extra attention, priced by hair length.',
    description:
      'Cold reconstruction is the care-focused treatment on the list and is booked in the same way as the smoothing services. Yelyzaveta confirms your hair-length category with you before the appointment. Prices follow the five length categories below, and no thick-hair surcharge is listed for this treatment.',
    image: {
      src: '/images/service-cold-reconstruction.jpg',
      alt: 'Illustrative cover image: hands working a section of hair (generated for this page)',
      caption: 'Illustrative image',
      origin: illustrativeOrigin,
    },
    prices: [100, 120, 140, 150, 160],
    densitySurcharge: null,
  },
  {
    title: 'Keratin / Hair Botox + Cold Reconstruction',
    summary: 'Smoothing and reconstruction combined as one booking.',
    description:
      'This option brings the smoothing service and cold reconstruction together as one combined booking. Because it covers both treatments, it sits at the top of every length category on the price list. Prices follow the five length categories below, and a thick-hair surcharge may apply.',
    image: {
      src: '/images/service-complex-treatment.jpg',
      alt: 'Illustrative cover image: a treatment being worked through the hair by hand (generated for this page)',
      caption: 'Illustrative image',
      origin: illustrativeOrigin,
    },
    prices: [180, 200, 250, 280, 330],
    densitySurcharge: '£20–£40',
  },
  {
    title: 'Nanoplasty',
    summary: 'A separate smoothing treatment with its own price list.',
    description:
      'Nanoplasty is listed on its own, with a price list separate from the other treatments. Message Yelyzaveta before booking so she can confirm your length category and answer your questions about this service. Prices follow the five length categories below, and a thick-hair surcharge may apply.',
    image: {
      src: '/images/service-nanoplasty.jpg',
      alt: 'Illustrative cover image: long straight hair photographed from a different angle (generated for this page)',
      caption: 'Illustrative image',
      origin: illustrativeOrigin,
    },
    prices: [180, 210, 230, 260, 300],
    densitySurcharge: '£20–£40',
  },
] as const;

export const lengthCategories = [1, 2, 3, 4, 5] as const;

export const bookingServices = [
  'Keratin / Hair Botox',
  'Cold Reconstruction',
  'Keratin / Hair Botox + Cold Reconstruction',
  'Nanoplasty',
  'Help me choose',
] as const;

export type BookingService = (typeof bookingServices)[number];

export const bookingAddress = 'Unit 12 Skylines Village, London E14 9TS, United Kingdom';

export const buildBookingMessage = ({
  name,
  service,
  date,
  comment,
}: {
  name: string;
  service: string;
  date?: string;
  comment?: string;
}) => {
  const lines = [
    `Hi Yelyzaveta! My name is ${name.trim()}.`,
    `Service: ${service}.`,
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
  date,
  comment,
}: {
  name: string;
  service: string;
  date?: string;
  comment?: string;
}) =>
  `${contact.whatsapp}?text=${encodeURIComponent(
    buildBookingMessage({ name, service, date, comment }),
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
      'A £20–£40 surcharge may apply to Keratin / Hair Botox, the combined treatment, and Nanoplasty. No thick-hair surcharge is listed for Cold Reconstruction.',
  },
  {
    question: 'Where is Brunetkaa Hair?',
    answer: 'The listed location is London E14 9RP, United Kingdom.',
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
