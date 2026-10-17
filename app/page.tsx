'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import {
  ArrowDownRight,
  ArrowRight,
  Instagram,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  X,
} from 'lucide-react';
import {
  bookingServices,
  bookingWhatsAppUrl,
  contact,
  faqs,
  lengthCategories,
  lengthScale,
  priceNote,
  services,
} from './site-content';
import type { ServiceExtra, ServiceVariant } from './site-content';
import { resultPairs } from './results-data';
import { googleMapsReviewsUrl, googleReviews } from './reviews-data';
import ResultsCarousel from './results-carousel';
import ReviewsCarousel from './reviews-carousel';
import HalftoneWordmarkFooter from '@/components/ui/halftone-wordmark-footer';

type Service = (typeof services)[number];

const navItems = [
  ['About', '#about'],
  ['Services & Prices', '#services'],
  ['Results', '#results'],
  ['Reviews', '#reviews'],
  ['FAQ', '#faq'],
  ['Contact', '#contact'],
] as const;

const headlinePhrases = ['More shine.', 'Less frizz.', 'Soft hair.'] as const;

const BOOKING_FORM_ID = 'booking-form';

const KERATIN_GROUP = 'Keratin / Hair Botox';

function ServiceDetailText({
  lead,
  paragraphs,
  listLabel,
  list,
  idealFor,
  closingNote,
  extra,
}: {
  lead: string;
  paragraphs: readonly string[];
  listLabel: string;
  list: readonly string[];
  idealFor: string;
  closingNote?: string | null;
  extra?: ServiceExtra | null;
}) {
  return (
    <div className="dialog-detail">
      <p className="dialog-lead">{lead}</p>
      {paragraphs.map((paragraph) => (
        <p className="dialog-text" key={paragraph}>
          {paragraph}
        </p>
      ))}

      <div className="dialog-list-block">
        <p className="dialog-list-label">{listLabel}:</p>
        <ul className="dialog-list">
          {list.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <p className="dialog-ideal">
        <span className="dialog-ideal-label">Ideal for:</span> {idealFor}
      </p>

      {closingNote && <p className="dialog-text">{closingNote}</p>}

      {extra && (
        <div
          className={`dialog-callout${extra.tone === 'warning' ? ' dialog-callout-warning' : ''}`}
        >
          <p className="dialog-callout-title">{extra.title}</p>
          <p className="dialog-callout-body">{extra.body}</p>
        </div>
      )}
    </div>
  );
}

function useInViewOnce<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px 80px 0px' },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return { ref, inView };
}

export default function Home() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const previousOverflowRef = useRef('');
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobilePanelRef = useRef<HTMLDivElement>(null);
  const menuReturnFocusRef = useRef<HTMLElement | null>(null);
  const [activeService, setActiveService] = useState<Service | null>(null);
  const [activeVariantId, setActiveVariantId] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('#top');
  const [bookingName, setBookingName] = useState('');
  const [bookingService, setBookingService] = useState<string>(bookingServices[4]);
  const [bookingClarification, setBookingClarification] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [bookingComment, setBookingComment] = useState('');
  const [bookingError, setBookingError] = useState('');
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState(false);
  const [mapErrorDetail, setMapErrorDetail] = useState<string | null>(null);
  const bookingNameRef = useRef<HTMLInputElement>(null);
  const heroMediaRef = useRef<HTMLDivElement>(null);
  const about = useInViewOnce<HTMLElement>();
  const servicesSection = useInViewOnce<HTMLDivElement>();
  const results = useInViewOnce<HTMLElement>();
  const reviews = useInViewOnce<HTMLElement>();
  const faqSection = useInViewOnce<HTMLElement>();
  const [openFaq, setOpenFaq] = useState<number>(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const faqButtonRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setInterval(() => {
      setPhraseIndex((index) => (index + 1) % headlinePhrases.length);
    }, 3500);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (mapLoaded || mapError) return;
    const timer = window.setTimeout(() => {
      setMapError(true);
      setMapErrorDetail('timeout');
    }, 12000);
    return () => window.clearTimeout(timer);
  }, [mapLoaded, mapError]);

  useEffect(() => {
    const node = heroMediaRef.current;
    if (!node) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const images = Array.from(node.querySelectorAll('img'));
    const total = images.length;

    if (total === 0) {
      node.classList.add('is-entering');
      return;
    }

    let resolved = 0;
    const resolve = () => {
      resolved += 1;
      if (resolved >= total) {
        node.classList.add('is-entering');
      }
    };

    images.forEach((img) => {
      if (img.complete) {
        resolve();
      } else {
        img.addEventListener('load', resolve, { once: true });
        img.addEventListener('error', resolve, { once: true });
      }
    });
  }, []);

  useEffect(() => {
    const mql = window.matchMedia('(max-width: 768px)');
    const update = () => setIsMobile(mql.matches);
    update();
    mql.addEventListener('change', update);
    return () => mql.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const onFocusIn = (e: FocusEvent) => {
      const t = e.target as HTMLElement;
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.tagName === 'SELECT')) {
        setIsInputFocused(true);
      }
    };
    const onFocusOut = (e: FocusEvent) => {
      const t = e.target as HTMLElement;
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.tagName === 'SELECT')) {
        window.setTimeout(() => {
          const active = document.activeElement as HTMLElement | null;
          if (!active || !(active.tagName === 'INPUT' || active.tagName === 'TEXTAREA' || active.tagName === 'SELECT')) {
            setIsInputFocused(false);
          }
        }, 80);
      }
    };
    window.addEventListener('focusin', onFocusIn);
    window.addEventListener('focusout', onFocusOut);
    return () => {
      window.removeEventListener('focusin', onFocusIn);
      window.removeEventListener('focusout', onFocusOut);
    };
  }, []);

  const openService = (service: Service, trigger: HTMLElement) => {
    returnFocusRef.current = trigger;
    previousOverflowRef.current = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    setActiveService(service);
    setActiveVariantId(service.variants ? service.variants[0].id : null);
    window.requestAnimationFrame(() => {
      const dialog = dialogRef.current;
      if (dialog && !dialog.open) dialog.showModal();
      closeButtonRef.current?.focus();
    });
  };

  const restoreAfterDialog = () => {
    document.body.style.overflow = previousOverflowRef.current;
    setActiveService(null);
    setActiveVariantId(null);
    returnFocusRef.current?.focus();
  };

  const scrollToBooking = (service?: string, clarification?: string) => {
    if (service && (bookingServices as readonly string[]).includes(service)) {
      setBookingService(service);
      setBookingClarification(clarification ?? '');
    }
    setBookingError('');
    setMobileMenuOpen(false);
    window.requestAnimationFrame(() => {
      document
        .getElementById(BOOKING_FORM_ID)
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.setTimeout(() => bookingNameRef.current?.focus({ preventScroll: true }), 550);
    });
  };

  const handleBookingSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedName = bookingName.trim();
    if (!trimmedName) {
      setBookingError('Please enter your name so Yelyzaveta knows who is writing.');
      bookingNameRef.current?.focus();
      return;
    }
    if (!(bookingServices as readonly string[]).includes(bookingService)) {
      setBookingError('Please choose a service from the list.');
      return;
    }
    setBookingError('');
    const url = bookingWhatsAppUrl({
      name: trimmedName,
      service: bookingService,
      clarification:
        bookingService === KERATIN_GROUP && bookingClarification ? bookingClarification : undefined,
      date: bookingDate,
      comment: bookingComment,
    });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  useEffect(
    () => () => {
      document.body.style.overflow = previousOverflowRef.current;
    },
    [],
  );

  useEffect(() => {
    const sectionIds = ['#top', ...navItems.map(([, href]) => href.slice(1))];
    const sections = sectionIds
      .map((id) => document.getElementById(id === '#top' ? 'top' : id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(`#${visible.target.id}`);
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: [0, 0.25, 0.5, 1] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    menuReturnFocusRef.current = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    const prevPaddingRight = document.body.style.paddingRight;
    const scrollbarW = window.innerWidth - document.documentElement.clientWidth;
    if (scrollbarW > 0) document.body.style.paddingRight = `${scrollbarW}px`;
    document.body.style.overflow = 'hidden';
    const panel = mobilePanelRef.current;
    const getFocusable = () =>
      panel?.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])');
    let focusable = getFocusable();
    window.requestAnimationFrame(() => {
      focusable = getFocusable();
      (focusable?.[0] as HTMLElement | undefined)?.focus();
    });
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setMobileMenuOpen(false);
      } else if (e.key === 'Tab') {
        focusable = getFocusable();
        if (!panel || !focusable || !focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          (last as HTMLElement).focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          (first as HTMLElement).focus();
        }
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPaddingRight;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (mobileMenuOpen) return;
    const t = menuReturnFocusRef.current;
    if (t && document.contains(t)) {
      window.requestAnimationFrame(() => t.focus());
    }
  }, [mobileMenuOpen]);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <main id="top">
      <header className="site-header">
        <div className="header-inner">
          <a href="#top" className="brand" aria-label="Brunetkaa Hair, home">
            <span className="brand-name">BRUNETKAA</span>
            <span className="brand-divider" aria-hidden="true" />
            <span className="brand-subtitle">HAIR · LONDON</span>
          </a>

          <nav className="desktop-nav" aria-label="Main navigation">
            {navItems.map(([label, href]) => (
              <a
                key={href}
                href={href}
                className={activeSection === href ? 'is-active' : undefined}
                aria-current={activeSection === href ? 'true' : undefined}
              >
                {label}
              </a>
            ))}
          </nav>

          <button
            className="header-book"
            type="button"
            onClick={() => scrollToBooking()}
            aria-label="Book an appointment"
          >
            <MessageCircle size={16} aria-hidden="true" />
            <span>Book appointment</span>
          </button>

          <button
            ref={menuButtonRef}
            type="button"
            className="menu-toggle"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            {mobileMenuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
        <div
          className={`mobile-nav${mobileMenuOpen ? ' is-open' : ''}`}
          aria-hidden={!mobileMenuOpen}
          onClick={(e) => {
            if (e.target === e.currentTarget) closeMobileMenu();
          }}
        >
          <div
            ref={mobilePanelRef}
            id="mobile-navigation"
            className="mobile-nav-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <div className="mobile-nav-head">
              <span className="mobile-nav-title">Menu</span>
              <button
                type="button"
                className="mobile-nav-close"
                aria-label="Close navigation menu"
                onClick={closeMobileMenu}
              >
                <X size={18} aria-hidden="true" />
              </button>
            </div>
            <nav className="mobile-nav-links" aria-label="Mobile links">
              {navItems.map(([label, href], index) => (
                <a
                  key={href}
                  href={href}
                  className={activeSection === href ? 'is-active' : undefined}
                  style={{ '--i': String(index) } as CSSProperties}
                  onClick={closeMobileMenu}
                >
                  {label}
                </a>
              ))}
            </nav>
            <button
              className="mobile-nav-book"
              type="button"
              onClick={() => {
                closeMobileMenu();
                scrollToBooking();
              }}
            >
              Book appointment <ArrowRight size={16} aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      <section className="hero section-wrap" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-rule" /> LONDON · E14 9RP</p>
          <h1 id="hero-title" className="hero-title">
            <span className="hero-title-line hero-title-static">
              Keratin &amp; Hair Botox in London
            </span>
            <span
              className="hero-title-line hero-title-rotator"
              aria-hidden="true"
            >
              <span className="rotator-sizer" aria-hidden="true">More shine.</span>
              <span className="rotator-phrase" key={phraseIndex} aria-hidden="true">
                {headlinePhrases[phraseIndex]}
              </span>
            </span>
          </h1>
          <p className="hero-intro">
            Keratin, hair botox &amp; hair reconstruction by Yelyzaveta in London.
          </p>
          <div className="hero-actions">
            <button className="button button-gold" type="button" onClick={() => scrollToBooking()}>
              <MessageCircle size={17} aria-hidden="true" /> Book appointment
            </button>
            <a className="button button-text" href="#services">
              View services <ArrowDownRight size={17} aria-hidden="true" />
            </a>
          </div>
          <p className="hero-note">Personal guidance · Clear prices by hair length</p>
        </div>

        <div
          ref={heroMediaRef}
          className="hero-media"
          role="group"
          aria-label="Yelyzaveta and her hair work"
        >
          <figure className="media-card media-portrait">
            <Image
              src="/images/portrait.jpg"
              alt="Portrait of Yelyzaveta"
              fill
              priority
              sizes="(max-width: 600px) 92vw, 34vw"
              className="media-image"
            />
          </figure>
          <figure className="media-card media-work media-work-top">
            <Image
              src="/images/hero-work-1.jpg"
              alt="Yelyzaveta consulting a client - hair diagnosis"
              fill
              sizes="(max-width: 600px) 46vw, 21vw"
              className="media-image"
            />
          </figure>
          <figure className="media-card media-work media-work-bottom">
            <Image
              src="/images/hero-work-2.jpg"
              alt="Yelyzaveta straightening hair with iron"
              fill
              sizes="(max-width: 600px) 46vw, 21vw"
              className="media-image"
            />
          </figure>
        </div>
      </section>

      <section
        id="about"
        ref={about.ref}
        aria-labelledby="about-title"
        className={`about-section section-wrap content-section${about.inView ? ' is-inview' : ''}`}
      >
        <div className="about-media">
          <svg
            className="about-media-frame"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <rect
              x="0.5"
              y="0.5"
              width="99"
              height="99"
              pathLength={1}
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          <figure className="about-media-mask">
            <Image
              src="/images/hero-2.jpg"
              alt="Portrait of Yelyzaveta"
              fill
              sizes="(max-width: 860px) calc(100vw - 40px), 480px"
              className="about-media-image"
            />
          </figure>
        </div>

        <div className="about-body">
          <p className="eyebrow about-reveal about-reveal-1">
            <span className="eyebrow-rule" aria-hidden="true" /> ABOUT ME
          </p>
          <h2 id="about-title" className="about-reveal about-reveal-2">
            Meet <em>Yelyzaveta</em>
          </h2>
          <span className="about-rule" aria-hidden="true" />
          <div className="about-text about-reveal about-reveal-3">
            <p>Let’s get to know each other — I’m Yelyzaveta 🤍</p>
            <p>
              I’m a hair specialist with 4 years of experience in hair smoothing and
              reconstruction treatments.
            </p>
            <p>
              For me, beautiful hair is about more than just smoothness and shine. It’s about
              softness, manageability, a healthy-looking finish, and feeling confident every
              day.
            </p>
            <p>
              I work with different hair types and tailor every treatment to your individual
              needs, taking into account your hair’s condition, colouring history, natural
              texture, and desired results.
            </p>
            <p>
              My approach goes beyond the immediate transformation. I believe beautiful results
              start with understanding your hair. That’s why I never recommend the same
              treatment to everyone. We begin with a consultation, assess your hair’s needs,
              and choose the most suitable approach together.
            </p>
            <p>
              My goal is to make your hair easier to manage, your routine simpler, and every
              mirror moment a little more special.
            </p>
            <p>I look forward to welcoming you to Brunetkaa Hair in Canary Wharf, London. ✨</p>
          </div>
        </div>
      </section>

      <section id="services" className="services-section content-section" aria-labelledby="services-title">
        <div className="section-wrap">
          <div className="services-heading">
            <div className="section-heading">
              <p className="eyebrow"><span className="eyebrow-rule" /> SERVICES &amp; PRICES</p>
              <h2 id="services-title">Choose a treatment <em>to explore.</em></h2>
            </div>
            <p className="section-aside">
              Four services, with prices set by hair-length category. Select a card to
              read the full description and price list.
            </p>
          </div>

          <div
            ref={servicesSection.ref}
            className={`service-grid${servicesSection.inView ? ' is-inview' : ''}`}
          >
            {services.map((service, globalIndex) => (
              <article
                className="service-card"
                key={service.title}
                style={{ '--card-index': String(globalIndex) } as CSSProperties}
              >
                <figure className="service-media">
                  <div className="service-media-mask">
                    <Image
                      src={service.image.src}
                      alt={service.image.alt}
                      fill
                      sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1240px) calc(50vw - 44px), 570px"
                      className="service-media-image"
                    />
                  </div>
                  <figcaption className="image-caption reveal-head">{service.image.caption}</figcaption>
                </figure>
                <div className="service-body">
                  <div className="service-head reveal-head">
                    <span className="service-number">0{globalIndex + 1}</span>
                    <h3>{service.title}</h3>
                  </div>
                  <p className="service-summary reveal-desc">{service.summary}</p>
                  <div className="service-foot reveal-foot">
                    <p className="service-from">
                      <span>From</span>
                      <strong>£{service.prices[0]}</strong>
                    </p>
                    <button
                      className="service-trigger"
                      type="button"
                      aria-label={`View prices and details for ${service.title}`}
                      onClick={(event) => openService(service, event.currentTarget)}
                    >
                      <span>Details &amp; Prices</span>
                      <ArrowRight size={16} aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <p className="price-note">{priceNote}</p>
        </div>
      </section>

      <section
        id="results"
        ref={results.ref}
        className={`results-section content-section${results.inView ? ' is-inview' : ''}`}
        aria-labelledby="results-title"
      >
        <div className="section-wrap">
          <div className="section-heading">
            <p className="eyebrow"><span className="eyebrow-rule" /> RESULTS</p>
            <h2 id="results-title">See the <em>difference.</em></h2>
            <p className="results-note">
              Real photos with different lighting and angles — cropped and resized only.
              Procedure names are not shown because they were not confirmed for these photos.
            </p>
          </div>

          <ResultsCarousel pairs={resultPairs} />
        </div>
      </section>

      <section
        id="reviews"
        ref={reviews.ref}
        className={`reviews-section content-section${reviews.inView ? ' is-inview' : ''}`}
        aria-labelledby="reviews-title"
      >
        <div className="section-wrap">
          <div className="section-heading reviews-heading">
            <p className="eyebrow"><span className="eyebrow-rule" /> REVIEWS</p>
            <h2 id="reviews-title">Loved by <em>real clients.</em></h2>
          </div>
          <ReviewsCarousel reviews={googleReviews} />
          <a className="inline-link" href={googleMapsReviewsUrl} target="_blank" rel="noreferrer">
            Read all reviews on Google Maps <ArrowRight size={16} aria-hidden="true" />
          </a>
        </div>
      </section>

      <section
        id="faq"
        ref={faqSection.ref}
        className={`faq-section section-wrap content-section${faqSection.inView ? ' is-inview' : ''}`}
      >
        <div className="section-heading faq-heading faq-reveal" style={{ '--reveal-delay': '0ms' } as CSSProperties}>
          <p className="eyebrow"><span className="eyebrow-rule" /> GOOD TO KNOW</p>
          <h2>Questions, <em>answered plainly.</em></h2>
          <p className="faq-sub">Still have a question?</p>
          <button className="button button-gold faq-ask" type="button" onClick={() => scrollToBooking()}>
            <MessageCircle size={17} aria-hidden="true" /> Ask Yelyzaveta
          </button>
        </div>
        <div className="faq-list" role="list">
          {faqs.map(({ question, answer }, index) => {
            const isOpen = openFaq === index;
            const number = String(index + 1).padStart(2, '0');
            return (
              <div
                key={question}
                role="listitem"
                className={`faq-item faq-reveal${isOpen ? ' is-open' : ''}`}
                style={{ '--reveal-delay': `${90 + index * 90}ms` } as CSSProperties}
              >
                <h3 className="faq-item-heading">
                  <button
                    type="button"
                    ref={(node) => {
                      faqButtonRefs.current[index] = node;
                    }}
                    className="faq-trigger"
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${index}`}
                    id={`faq-button-${index}`}
                    onClick={() => setOpenFaq(index)}
                    onKeyDown={(event) => {
                      if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp' && event.key !== 'Home' && event.key !== 'End') return;
                      event.preventDefault();
                      const last = faqs.length - 1;
                      let next = index;
                      if (event.key === 'ArrowDown') next = index === last ? 0 : index + 1;
                      if (event.key === 'ArrowUp') next = index === 0 ? last : index - 1;
                      if (event.key === 'Home') next = 0;
                      if (event.key === 'End') next = last;
                      faqButtonRefs.current[next]?.focus();
                    }}
                  >
                    <span className="faq-number" aria-hidden="true">{number}</span>
                    <span className="faq-question">{question}</span>
                    <span className="faq-icon" aria-hidden="true">
                      <span className="faq-icon-bar faq-icon-bar-horizontal" />
                      <span className="faq-icon-bar faq-icon-bar-vertical" />
                    </span>
                  </button>
                </h3>
                <div
                  id={`faq-panel-${index}`}
                  role="region"
                  aria-labelledby={`faq-button-${index}`}
                  className={`faq-panel${isOpen ? ' is-open' : ''}`}
                  hidden={!isOpen}
                >
                  <div className="faq-panel-inner">
                    <p>{answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section id="contact" className="contact-section content-section" aria-labelledby="contact-title">
        <div className="contact-inner section-wrap">
          <div className="contact-form-col">
            <p className="eyebrow"><span className="eyebrow-rule" /> CONTACT</p>
            <h2 id="contact-title">Book your <em>appointment.</em></h2>
            <p className="contact-lead">
              Tell me about your hair and the service you are considering.
              I can help confirm the length category, final price, and options.
            </p>
            <form
              id={BOOKING_FORM_ID}
              className="booking-form"
              onSubmit={handleBookingSubmit}
              noValidate
            >
              <div className="booking-field">
                <label htmlFor="booking-name">Name *</label>
                <input
                  id="booking-name"
                  ref={bookingNameRef}
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Your name"
                  value={bookingName}
                  onChange={(event) => setBookingName(event.target.value)}
                  required
                />
              </div>
              <div className="booking-field">
                <label htmlFor="booking-service">Service *</label>
                <select
                  id="booking-service"
                  name="service"
                  value={bookingService}
                  onChange={(event) => {
                    setBookingService(event.target.value);
                    if (event.target.value !== KERATIN_GROUP) setBookingClarification('');
                  }}
                  required
                >
                  {bookingServices.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              {bookingService === KERATIN_GROUP && (
                <div className="booking-field">
                  <label htmlFor="booking-clarification">
                    Keratin or Hair Botox? <span className="optional-label">(optional)</span>
                  </label>
                  <select
                    id="booking-clarification"
                    name="clarification"
                    value={bookingClarification}
                    onChange={(event) => setBookingClarification(event.target.value)}
                  >
                    <option value="">Help me choose</option>
                    <option value="Keratin Hair Straightening">Keratin Hair Straightening</option>
                    <option value="Hair Botox">Hair Botox</option>
                  </select>
                </div>
              )}
              <div className="booking-field">
                <label htmlFor="booking-date">Preferred date <span className="optional-label">(optional)</span></label>
                <input
                  id="booking-date"
                  name="preferred-date"
                  type="text"
                  autoComplete="off"
                  placeholder="For example: Saturday morning"
                  value={bookingDate}
                  onChange={(event) => setBookingDate(event.target.value)}
                />
              </div>
              <div className="booking-field">
                <label htmlFor="booking-comment">Comment <span className="optional-label">(optional)</span></label>
                <textarea
                  id="booking-comment"
                  name="comment"
                  rows={3}
                  placeholder="Your hair goals or booking preferences (no medical details)"
                  value={bookingComment}
                  onChange={(event) => setBookingComment(event.target.value)}
                />
              </div>
              {bookingError && (
                <p id="booking-error" className="booking-error" role="alert">{bookingError}</p>
              )}
              <button className="button button-gold booking-submit" type="submit">
                <MessageCircle size={17} aria-hidden="true" /> Continue on WhatsApp
              </button>
              <p className="booking-hint">
                WhatsApp opens with a ready message from your details.
                You press Send yourself. Final time is agreed in chat.
                This website does not save your form entries. Your details are passed to WhatsApp when it opens.{' '}
                <a href="/privacy">Privacy Policy</a>
              </p>
            </form>
          </div>
          <div className="contact-side">
            <div className="contact-map-card">
              <div className="contact-map-embed">
                {mapError ? (
                  <div className="map-error" role="alert">
                    <p className="map-error-title">Google Maps couldn’t be loaded.</p>
                    <p className="map-error-reason">
                      {mapErrorDetail === 'timeout'
                        ? 'Reason: loading timed out (no response from Google Maps within 12 s). Check your connection, or that third-party content / iframes are not blocked by a browser extension, private mode, or network filter.'
                        : mapErrorDetail
                          ? `Reason: ${mapErrorDetail}`
                          : 'Reason: the map iframe failed to load — check your connection and that third-party iframes are not blocked.'}
                    </p>
                    <a href={contact.maps} target="_blank" rel="noreferrer">
                      Open in Google Maps
                    </a>
                    <button
                      type="button"
                      className="map-button"
                      style={{ marginTop: '12px' }}
                      onClick={() => {
                        setMapError(false);
                        setMapErrorDetail(null);
                        setMapLoaded(false);
                      }}
                    >
                      Try again
                    </button>
                  </div>
                ) : (
                  <iframe
                    id="location-map"
                    className="location-map"
                    title="Brunetkaa_hair on Google Maps, London E14 9RP"
                    src={contact.mapEmbed}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                    onLoad={() => {
                      setMapLoaded(true);
                      setMapError(false);
                      setMapErrorDetail(null);
                    }}
                    onError={() => {
                      setMapError(true);
                      setMapErrorDetail('iframe error event — third-party content blocked or network error');
                    }}
                  />
                )}
              </div>
              <div className="contact-map-meta">
                <div className="contact-map-head">
                  <MapPin size={16} aria-hidden="true" />
                  <div>
                    <p className="contact-map-title">Brunetkaa_hair</p>
                    <p className="contact-map-address">{contact.address}</p>
                  </div>
                </div>
                <div className="contact-map-contacts">
                  <a href={contact.whatsapp} target="_blank" rel="noreferrer">
                    <MessageCircle size={13} aria-hidden="true" /> WhatsApp · +44 7988 884136
                  </a>
                  <a href={contact.instagram} target="_blank" rel="noreferrer">
                    <Instagram size={13} aria-hidden="true" /> @brunetkaa_hair
                  </a>
                </div>
              </div>
            </div>
            <div className="instagram-card">
              <div className="instagram-card-head">
                <a href={contact.instagram} target="_blank" rel="noreferrer" className="instagram-logo">
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                  </svg>
                  <span>@brunetkaa_hair</span>
                </a>
              </div>
              <p className="instagram-subtitle">More on Instagram</p>
              <div className="instagram-previews">
                <figure className="instagram-preview">
                  <img src="/images/results/pair-01/after.webp" alt="Hair after treatment — example 1" loading="lazy" />
                </figure>
                <figure className="instagram-preview">
                  <img src="/images/results/pair-02/after.webp" alt="Hair after treatment — example 2" loading="lazy" />
                </figure>
                <figure className="instagram-preview">
                  <img src="/images/results/pair-03/after.webp" alt="Hair after treatment — example 3" loading="lazy" />
                </figure>
              </div>
              <a className="instagram-link" href={contact.instagram} target="_blank" rel="noreferrer">
                View Instagram <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <HalftoneWordmarkFooter
        wordmark="brunetkaa"
        label="Brunetkaa Hair"
        meta="© 2026 · London"
        columns={[
          {
            title: "Explore",
            links: [
              { label: "About", href: "#about" },
              { label: "Services & Prices", href: "#services" },
              { label: "Results", href: "#results" },
              { label: "Reviews", href: "#reviews" },
              { label: "FAQ", href: "#faq" },
            ],
          },
          {
            title: "Contact",
            links: [
              { label: "Book online", href: "#contact", icon: "calendar" },
              { label: "+44 7988 884136", href: "tel:+447988884136", icon: "phone" },
              {
                label: "@brunetkaa_hair",
                href: "https://www.instagram.com/brunetkaa_hair/",
                icon: "instagram",
                external: true,
              },
            ],
          },
          {
            title: "Information",
            links: [
              {
                label: 'London',
                href: contact.maps,
                icon: 'location',
                external: true,
              },
              { label: "Privacy Policy", href: "/privacy", icon: "document" },
            ],
          },
        ]}
        backToTop
        height="500px"
      />

      <dialog
        ref={dialogRef}
        className="service-dialog"
        aria-labelledby="dialog-title"
        onClose={restoreAfterDialog}
        onClick={(event) => {
          if (event.target === dialogRef.current) dialogRef.current?.close();
        }}
      >
        {activeService && (
          <div className="dialog-content">
            <div className="dialog-topline">
              <p className="eyebrow"><span className="eyebrow-rule" aria-hidden="true" /> SERVICE DETAILS</p>
              <button
                ref={closeButtonRef}
                type="button"
                className="dialog-close"
                aria-label="Close service details"
                onClick={() => dialogRef.current?.close()}
              >
                <X size={20} aria-hidden="true" />
              </button>
            </div>

            <div className="dialog-body">
              <figure className="dialog-media">
                <Image
                  src={activeService.image.src}
                  alt={activeService.image.alt}
                  fill
                  sizes="(max-width: 860px) calc(100vw - 64px), 892px"
                  className="dialog-media-image"
                />
                <figcaption className="image-caption">{activeService.image.caption}</figcaption>
              </figure>
              <p className="dialog-origin">{activeService.image.origin}</p>

              <h2 id="dialog-title">{activeService.title}</h2>

              {activeService.variants ? (
                <>
                  <div className="dialog-tabs" role="tablist" aria-label="Choose a treatment option">
                    {activeService.variants.map((variant: ServiceVariant) => {
                      const isSelected = variant.id === activeVariantId;
                      return (
                        <button
                          key={variant.id}
                          type="button"
                          role="tab"
                          id={`service-tab-${variant.id}`}
                          aria-selected={isSelected}
                          aria-controls={`service-panel-${variant.id}`}
                          tabIndex={isSelected ? 0 : -1}
                          className={`dialog-tab${isSelected ? ' is-active' : ''}`}
                          onClick={() => setActiveVariantId(variant.id)}
                          onKeyDown={(event) => {
                            if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
                            event.preventDefault();
                            const tabs = activeService.variants ?? [];
                            const currentIndex = tabs.findIndex((tab) => tab.id === activeVariantId);
                            const nextIndex =
                              event.key === 'ArrowRight'
                                ? (currentIndex + 1) % tabs.length
                                : (currentIndex - 1 + tabs.length) % tabs.length;
                            const nextTab = tabs[nextIndex];
                            setActiveVariantId(nextTab.id);
                            window.requestAnimationFrame(() => {
                              document
                                .getElementById(`service-tab-${nextTab.id}`)
                                ?.focus();
                            });
                          }}
                        >
                          {variant.label}
                        </button>
                      );
                    })}
                  </div>
                  {activeService.variants.map((variant: ServiceVariant) => {
                    const isSelected = variant.id === activeVariantId;
                    return (
                      <div
                        key={variant.id}
                        role="tabpanel"
                        id={`service-panel-${variant.id}`}
                        aria-labelledby={`service-tab-${variant.id}`}
                        hidden={!isSelected}
                        className="dialog-panel"
                      >
                        {isSelected && (
                          <>
                            <h3 className="dialog-panel-title">{variant.label}</h3>
                            <ServiceDetailText
                              lead={variant.lead}
                              paragraphs={variant.paragraphs}
                              listLabel={variant.listLabel}
                              list={variant.list}
                              idealFor={variant.idealFor}
                            />
                          </>
                        )}
                      </div>
                    );
                  })}
                </>
              ) : (
                activeService.detail && (
                  <ServiceDetailText
                    lead={activeService.detail.lead}
                    paragraphs={activeService.detail.paragraphs}
                    listLabel={activeService.detail.listLabel}
                    list={activeService.detail.list}
                    idealFor={activeService.detail.idealFor}
                    closingNote={activeService.detail.closingNote}
                    extra={activeService.detail.extra}
                  />
                )
              )}

              <div className="dialog-prices">
                <p className="eyebrow"><span className="eyebrow-rule" aria-hidden="true" /> PRICES · GBP</p>
                <div className="price-table-wrap">
                  <table className="price-table">
                    <caption>Prices in GBP by hair-length category</caption>
                    <thead>
                      <tr><th scope="col">Hair-length category</th><th scope="col">Price</th></tr>
                    </thead>
                    <tbody>
                      {lengthCategories.map((category, index) => (
                        <tr key={category}>
                          <th scope="row">Category {category}</th>
                          <td>£{activeService.prices[index]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {activeService.densitySurcharge && (
                  <p className="surcharge-note">
                    Thick hair surcharge: {activeService.densitySurcharge}.
                  </p>
                )}

                <div className="length-block">
                  <p className="length-title">{lengthScale.label}</p>
                  <ol className="length-scale" aria-label="Hair length categories 1 to 5">
                    {lengthCategories.map((category) => (
                      <li className="length-step" key={category}>
                        <span className="length-bar" aria-hidden="true" />
                        <span className="length-step-label">{category}</span>
                      </li>
                    ))}
                  </ol>
                  <p className="length-legend" aria-hidden="true">
                    <span>{lengthScale.legendStart}</span>
                    <span>{lengthScale.legendEnd}</span>
                  </p>
                  <p className="length-hint">{lengthScale.hint}</p>
                </div>

                <p className="surcharge-note dialog-price-note">{priceNote}</p>

                <button
                  className="button button-gold dialog-book"
                  type="button"
                  onClick={() => {
                    const serviceTitle = activeService.bookingService;
                    const clarification = activeService.variants
                      ? (activeService.variants.find((variant) => variant.id === activeVariantId)
                          ?.label ?? '')
                      : '';
                    dialogRef.current?.close();
                    window.setTimeout(() => scrollToBooking(serviceTitle, clarification), 80);
                  }}
                >
                  <MessageCircle size={17} aria-hidden="true" /> Book this treatment
                </button>
              </div>
            </div>
          </div>
        )}
      </dialog>
      {isMobile && (
        <div
          className={`mobile-book-bar${mobileMenuOpen || activeService || isInputFocused ? ' is-hidden' : ''}`}
          aria-hidden={mobileMenuOpen || !!activeService || isInputFocused}
        >
          <button type="button" className="mobile-book-bar__btn" onClick={() => scrollToBooking()}>
            <MessageCircle size={18} aria-hidden="true" />
            Book appointment
          </button>
        </div>
      )}
    </main>
  );
}
