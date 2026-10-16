import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Brunetkaa Hair',
  description:
    'Privacy Policy for Brunetkaa Hair: the booking form opens WhatsApp and does not store data on a server or in the browser.',
};

export default function PrivacyPage() {
  return (
    <main className="section-wrap privacy-page">
      <p className="eyebrow"><span className="eyebrow-rule" /> PRIVACY POLICY</p>
      <h1>Privacy Policy</h1>
      <p><strong>Last updated: 16 October 2026</strong></p>
      <p>
        Brunetkaa Hair (“we”) provides this website so visitors can learn about hair
        treatments and contact Yelyzaveta. This policy explains what happens to the
        information you enter.
      </p>
      <h2>Booking form</h2>
      <p>
        The booking form asks for your name, service, preferred date, and an optional
        comment. When you press “Continue on WhatsApp”, your browser builds a WhatsApp
        link containing the text you entered and opens WhatsApp. You then press Send
        yourself inside WhatsApp.
      </p>
      <h2>No server or browser storage</h2>
      <p>
        We do not save form entries on a server and do not store them in your browser
        storage. The entries stay in the page only while you are filling in the form.
      </p>
      <h2>WhatsApp and Google Maps</h2>
      <p>
        If you continue to WhatsApp, Meta/WhatsApp receives the message you choose to
        send. If you open the embedded map or “Open in Google Maps”, Google receives
        technical data needed to show the map. Those services apply their own privacy
        policies.
      </p>
      <h2>Contact</h2>
      <p>
        Questions about this policy can be sent through WhatsApp at +44 7988 884136.
      </p>
      <p>
        <a href="/">Back to the main page</a>
      </p>
    </main>
  );
}
