import { Link } from 'react-router-dom';
import { BackTextButton } from '../components/BackTextButton';
import { TopBrandBarStrip } from '../components/AppHeader';
import { DeviceShell } from '../components/DeviceShell';
import { assets } from '../data/screens';

export function HandwerkerProjectAcceptPage() {
  return (
    <DeviceShell className="flow-screen hw-accept-screen" width={390}>
      <div aria-hidden className="hw-accept-bg">
        <img alt="" className="hw-accept-bg-img" src={assets.hwAcceptGardenBg} />
        <div className="hw-accept-bg-scrim" />
      </div>

      <div className="hw-accept-stack">
        <TopBrandBarStrip className="hw-accept-topbar" />

        <div className="hw-accept-green">
          <BackTextButton className="hw-inquiry-back" fallbackTo="/handwerker-login" />
          <h1 className="hw-accept-title">Projekt annehmen &amp; Kontaktdaten freischalten</h1>
          <p className="hw-accept-sub">Nach Annahme erhältst du die Kontaktdaten des Kunden.</p>
        </div>

        <div className="hw-accept-card-wrap">
          <article className="hw-accept-card">
            <div className="hw-accept-row-top">
              <div className="hw-accept-thumb">
                <img alt="" src={assets.hwAcceptProjectThumb} />
              </div>
              <div>
                <p className="hw-accept-basis-label">Basispreis (ohne Vorarbeiten)</p>
                <p className="hw-accept-basis-price">15.600 €</p>
              </div>
            </div>

            <div className="hw-accept-divider" />

            <div className="hw-accept-info-row">
              <div className="hw-accept-icon-bubble" aria-hidden="true">
                📊
              </div>
              <div>
                <small>Gewählte Elemente</small>
                <strong>Terrasse, Pflaster, Pflanzung</strong>
              </div>
            </div>

            <div className="hw-accept-divider" />

            <div className="hw-accept-info-row">
              <div className="hw-accept-icon-bubble" aria-hidden="true">
                📅
              </div>
              <div>
                <small>Projektstart</small>
                <strong>Innerhalb 0–1 Monat</strong>
              </div>
            </div>

            <div className="hw-accept-divider" />

            <div className="hw-accept-info-row">
              <div className="hw-accept-icon-bubble" aria-hidden="true">
                📍
              </div>
              <div>
                <small>Region</small>
                <strong>PLZ 50733 (Köln)</strong>
              </div>
            </div>

            <div className="hw-accept-divider" />

            <p className="hw-accept-match">Dieses Projekt entspricht deinem Profil.</p>
            <p className="hw-accept-match-sub">Budget bestätigt durch Kunden.</p>

            <div className="hw-accept-divider" />

            <div className="hw-accept-fee-line">
              <span>Projektvermittlung:</span>
              <strong>2 %</strong>
              <strong>= 312 €</strong>
            </div>
            <p className="hw-accept-fee-note">Die Gebühr wird bei Annahme des Projekts berechnet.</p>
          </article>
        </div>

        <footer className="hw-accept-footer upsell-footer">
          <Link
            className="primary-pill wide button-link"
            state={{ from: '/handwerker-projekt-annehmen' }}
            to="/handwerker-anfrage-detail"
          >
            Projekt annehmen &amp; Kontaktdaten freischalten
          </Link>
          <Link className="outline-pill wide button-link" to="/handwerker-anfragen">
            Später entscheiden
          </Link>
        </footer>
      </div>
    </DeviceShell>
  );
}
