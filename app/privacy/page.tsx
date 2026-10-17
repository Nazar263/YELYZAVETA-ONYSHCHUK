import type { Metadata } from 'next';
import { contact } from '../site-content';

export const metadata: Metadata = {
  title: {
    absolute: 'Privacy Policy | Brunetkaa Hair',
  },
  description:
    'How Brunetkaa Hair handles booking enquiries, WhatsApp messages, website technical data and third-party services.',
  alternates: {
    canonical: 'https://www.brunetkaahair.com/privacy',
  },
  openGraph: {
    type: 'article',
    locale: 'en_GB',
    siteName: 'Brunetkaa Hair',
    title: 'Privacy Policy | Brunetkaa Hair',
    description:
      'How Brunetkaa Hair handles booking enquiries, WhatsApp messages, website technical data and third-party services.',
    url: 'https://www.brunetkaahair.com/privacy',
  },
  twitter: {
    card: 'summary',
    title: 'Privacy Policy | Brunetkaa Hair',
    description:
      'How Brunetkaa Hair handles booking enquiries, WhatsApp messages, website technical data and third-party services.',
  },
};

export default function PrivacyPage() {
  return (
    <main className="section-wrap privacy-page">
      <p className="eyebrow"><span className="eyebrow-rule" /> PRIVACY POLICY</p>
      <h1>Privacy Policy</h1>
      <p><strong>Last updated: 17 October 2026</strong></p>

      <h2>Who is responsible for your information?</h2>
      <p>
        Yelyzaveta Onyshchuk, trading as Brunetkaa Hair in London, United Kingdom,
        is responsible for personal information used to handle enquiries and appointments.
        For privacy questions or to exercise your rights, contact Yelyzaveta on{' '}
        <a href={contact.whatsapp}>WhatsApp</a> or call{' '}
        <a href={contact.phone}>+44 7988 884136</a>.
      </p>

      <h2>Information you provide</h2>
      <p>
        The booking form asks for your name and selected service. Your preferred date,
        choice of Keratin or Hair Botox, and comment are optional. These details are used
        to answer your enquiry, discuss a suitable service and arrange an appointment.
        You can choose “Help me choose” if you are unsure about the service.
        Providing these details is voluntary, but without enough information we may
        not be able to arrange your appointment.
      </p>
      <p>
        Please do not include medical information, identity documents, payment-card
        details or other sensitive information in the website form. If you send us
        a message through WhatsApp or Instagram, we also receive the contact or
        profile details that the service makes available, such as your phone number
        or profile name, and the content of your conversation.
      </p>

      <h2>How the booking form works</h2>
      <p>
        Your entries are held in the page while you complete the form. The website
        does not send them to a booking server or save them in a database, cookies,
        localStorage or sessionStorage. They are not intentionally retained by the
        website after the page is closed or reloaded; your browser may separately
        offer autofill or restore a previous page.
      </p>
      <p>
        Selecting “Continue on WhatsApp” creates a link containing your entered
        details and opens WhatsApp. Those details are passed to WhatsApp as part
        of opening the link, even before you press Send. Yelyzaveta receives your
        enquiry when you send the message. Opening WhatsApp does not confirm an
        appointment; the final time is agreed in the conversation.
      </p>

      <h2>Why we use information and our lawful bases</h2>
      <p>
        We use enquiry and appointment details to take steps at your request before
        entering into a contract and, where you book a service, to perform that
        contract (UK GDPR Article 6(1)(b)). We also have a legitimate interest in
        keeping the website secure and reliable and in dealing with complaints
        or legal claims (Article 6(1)(f)). Where we must retain information to meet
        an applicable legal obligation, the basis is Article 6(1)(c).
      </p>
      <p>
        We do not use the booking form for mailing lists, advertising profiles or
        automated decisions with legal or similarly significant effects.
      </p>

      <h2>Hosting, fonts, maps and external services</h2>
      <p>
        The website is hosted by Vercel. Delivering and protecting the website may
        involve technical information such as your IP address, request time,
        requested page and browser information. This is separate from the booking
        form, whose entries are not sent to Vercel by the form. See{' '}
        <a href="https://vercel.com/legal/privacy-policy">Vercel’s Privacy Notice</a>.
      </p>
      <p>
        The website loads its fonts from Google Fonts. Your browser contacts Google
        to request the font files, which discloses technical connection information
        such as your IP address and browser information.
      </p>
      <p>
        An embedded Google Map is loaded as you approach the location section.
        Google receives technical connection information when the map loads,
        without you needing to press a map button. Its own cookies or storage
        technologies may also be used, depending on the service and your browser
        settings. See <a href="https://policies.google.com/privacy">Google’s Privacy Policy</a>.
      </p>
      <p>
        WhatsApp and Instagram links open services operated by Meta. Information
        you pass to those services is subject to their own policies as well as
        this notice for the enquiry information received by Brunetkaa Hair. See{' '}
        <a href="https://www.whatsapp.com/legal/privacy-policy">WhatsApp’s Privacy Policy</a>{' '}
        and <a href="https://privacycenter.instagram.com/policy/">Instagram’s Privacy Policy</a>.
        Instagram previews on this website are local images, not an embedded feed.
      </p>

      <h2>Cookies and website storage</h2>
      <p>
        The website’s own code does not set analytics or advertising cookies,
        install tracking pixels, or save booking entries in browser storage.
        This does not mean that third-party services or hosting security features
        never use cookies or process technical information. Browser controls can
        restrict third-party cookies, although some external features may then
        work differently. This notice itself does not give consent to optional
        cookies or other technologies that require your permission.
      </p>

      <h2>Who can receive information and international processing</h2>
      <p>
        Enquiry information is used by Yelyzaveta and the messaging service you choose.
        Hosting and font or map providers receive the technical information needed
        for their features. Information may also be disclosed where required by law
        or where necessary to establish, exercise or defend legal claims.
      </p>
      <p>
        These providers operate internationally and may process information outside
        the United Kingdom. Their privacy notices describe the countries, recipient
        organisations and applicable transfer arrangements. Where a restricted
        international transfer is made on our behalf, UK data protection law
        requires an appropriate transfer mechanism, such as an adequacy regulation
        or approved contractual safeguards. Contact Yelyzaveta for information about
        arrangements relevant to your enquiry and how to obtain the applicable safeguards.
      </p>

      <h2>How long information is kept</h2>
      <p>
        The website does not keep a database of form submissions. Messages that you
        send through WhatsApp or Instagram are retained separately in the relevant
        conversation. There is currently no fixed deletion period for those conversations.
        Retention must be limited to what is necessary to deal with the enquiry,
        arrange and provide the service, handle follow-up questions or complaints,
        and meet applicable record-keeping requirements or legal claims.
      </p>
      <p>
        The relevant criteria are whether the enquiry is still active, whether an
        appointment or follow-up is outstanding, and whether particular records
        remain necessary for a legal obligation or claim. Technical logs and
        provider-controlled records have their own retention arrangements. You can
        contact Yelyzaveta to ask about a particular record or request its deletion;
        deletion is subject to applicable legal exceptions.
      </p>

      <h2>Your rights and complaints</h2>
      <p>
        Depending on the circumstances and lawful basis, you may request access to
        your personal information, correction, erasure, restriction of processing
        or data portability. You may object to processing based on legitimate
        interests. Where processing relies on consent, you may withdraw that
        consent without affecting the lawfulness of earlier processing.
      </p>
      <p>
        To make a request, use the WhatsApp or telephone contact above. We may need
        to verify your identity. Requests are normally answered within one month;
        the law allows extensions in certain circumstances.
      </p>
      <p>
        You can also complain to the UK Information Commissioner’s Office at{' '}
        <a href="https://ico.org.uk/make-a-complaint/">ico.org.uk/make-a-complaint</a>{' '}
        or on <a href="tel:03031231113">0303 123 1113</a>.
      </p>

      <h2>Updates to this notice</h2>
      <p>
        This page may be updated if the website or handling of enquiries changes.
        The date above identifies the latest version.
      </p>
      <p><a href="/">Back to the main page</a></p>
    </main>
  );
}
