import { Link } from 'react-router-dom';
import { AppHeader } from '../components/AppHeader';
import { FlowProgress } from '../components/FlowProgress';
import { DeviceShell } from '../components/DeviceShell';
import { assets } from '../data/screens';

const fullPackage = [
  'KI-Visualisierung in hoher Qualität',
  'Konkrete Kostenspanne',
  'Vermittlung an geprüfte Fachbetriebe',
  'Vor-Ort Termin & Beratung',
  'Ihr Garten wird Realität',
] as const;

const visualPackage = [
  'KI-Visualisierung in hoher Qualität',
  'Vorher-Nachher Vergleich',
] as const;

export function PackageSelectionPage() {
  return (
    <DeviceShell className="flow-screen" width={380}>
      <AppHeader
        subtitle="Paket wählen und mit der Traumgarten-Reise fortfahren."
        title="Paketpreise"
      />

      <section className="flow-content">
        <article className="summary-card">
          <FlowProgress slim />
        </article>

        <h1 className="package-title">Ihr neuer Traumgarten!</h1>
        <p className="package-subtitle">So könnte Ihr Garten aussehen.</p>
        <div className="package-hero">
          <img
            alt="Traumgarten Vorschau"
            decoding="async"
            loading="lazy"
            src={assets.packageSelectionHero}
          />
        </div>

        <div className="package-intro">
          <div className="benefit-icon">✓</div>
          <div>
            <h2>Projekt starten & Angebot erhalten</h2>
            <p>Wie möchten Sie weiter vorgehen?</p>
          </div>
        </div>

        <div className="package-grid">
          <article className="package-card featured-card">
            <header className="package-card-header dark">
              <div className="package-header-lead">
                <span className="package-badge">Empfohlen</span>
                <h3>Projekt realisieren</h3>
                <strong className="package-feature-copy">Alles inklusive</strong>
              </div>
              <div className="package-price-block">
                <small>Einmalig</small>
                <b>59 €</b>
              </div>
            </header>
            <ul>
              {fullPackage.map((item) => (
                <li key={item}>✓ {item}</li>
              ))}
            </ul>
            <div className="payment-row">
              <img
                alt="Zahlungsmethoden: u. a. PayPal, Apple Pay, Visa, Mastercard, Google Pay"
                className="payment-methods-strip"
                decoding="async"
                loading="lazy"
                src={assets.packagePaymentMethodsStrip}
              />
            </div>
            <Link className="primary-pill button-link" to="/visualisierung-vorschau">
              Jetzt Projekt starten
            </Link>
          </article>

          <article className="package-card">
            <header className="package-card-header package-card-header-paired">
              <div className="package-header-lead">
                <span aria-hidden="true" className="package-badge package-badge-sr-only">
                  Empfohlen
                </span>
                <h3>Nur Visualisierung</h3>
                <strong aria-hidden="true" className="package-feature-copy package-feature-copy-sr-only">
                  Alles inklusive
                </strong>
              </div>
              <div className="package-price-block">
                <small>Einmalig</small>
                <b>29 €</b>
              </div>
            </header>
            <ul>
              {visualPackage.map((item) => (
                <li key={item}>✓ {item}</li>
              ))}
            </ul>
            <div className="payment-row">
              <img
                alt="Zahlungsmethoden: u. a. PayPal, Apple Pay, Visa, Mastercard, Google Pay"
                className="payment-methods-strip"
                decoding="async"
                loading="lazy"
                src={assets.packagePaymentMethodsStrip}
              />
            </div>
            <Link className="primary-pill button-link" to="/visualisierung-vorschau">
              Jetzt Projekt starten
            </Link>
          </article>
        </div>
      </section>
    </DeviceShell>
  );
}
