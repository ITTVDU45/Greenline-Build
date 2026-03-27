import { Navigate, Route, Routes } from 'react-router-dom';
import { FlowPersistence } from './components/FlowPersistence';
import { AnalysisPage } from './pages/AnalysisPage';
import { AppointmentDatePage } from './pages/AppointmentDatePage';
import { AppointmentTimePage } from './pages/AppointmentTimePage';
import { CapturePage } from './pages/CapturePage';
import { ChatCraftCustomerPage } from './pages/ChatCraftCustomerPage';
import { ChatCustomerCraftPage } from './pages/ChatCustomerCraftPage';
import { ContactUnlockPage } from './pages/ContactUnlockPage';
import { DashboardUpdatedPage } from './pages/DashboardUpdatedPage';
import { FeatureSelectionPage } from './pages/FeatureSelectionPage';
import { HandwerkerDashboardPage } from './pages/HandwerkerDashboardPage';
import { HandwerkerInquiriesPage } from './pages/HandwerkerInquiriesPage';
import { HandwerkerProjectAcceptPage } from './pages/HandwerkerProjectAcceptPage';
import { HandwerkerProjectDetailsPage } from './pages/HandwerkerProjectDetailsPage';
import { HandwerkerProjectsPage } from './pages/HandwerkerProjectsPage';
import { InvestmentOverviewPage } from './pages/InvestmentOverviewPage';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { ProjectTypeSelectionPage } from './pages/ProjectTypeSelectionPage';
import { PackageSelectionPage } from './pages/PackageSelectionPage';
import { ProjectDetailsPage } from './pages/ProjectDetailsPage';
import { ProjectReleasePage } from './pages/ProjectReleasePage';
import { FeatureExtrasPage } from './pages/FeatureExtrasPage';
import { FeatureMaterialPage } from './pages/FeatureMaterialPage';
import { QualitySelectionPage } from './pages/QualitySelectionPage';
import { SelectionSummaryPage } from './pages/SelectionSummaryPage';
import { TerminConfirmationPage } from './pages/TerminConfirmationPage';
import { VisualSuggestionsPage } from './pages/VisualSuggestionsPage';
import { WorkPrepPage } from './pages/WorkPrepPage';

export default function App() {
  return (
    <>
      <FlowPersistence />
      <Routes>
      <Route element={<LandingPage />} path="/" />
      <Route element={<Navigate replace to="/" />} path="/infoscreen-prelogin" />
      <Route element={<LoginPage />} path="/login" />
      <Route element={<Navigate replace to="/login" />} path="/login-alt" />
      <Route element={<ProjectTypeSelectionPage />} path="/projekt-auswahl" />
      <Route element={<Navigate replace to="/dashboard-aktualisiert" />} path="/home" />
      <Route element={<AnalysisPage />} path="/analyse" />
      <Route element={<FeatureMaterialPage />} path="/gestaltung-material" />
      <Route element={<FeatureExtrasPage />} path="/gestaltung-extras" />
      <Route element={<SelectionSummaryPage />} path="/auswahl-zusammenfassung" />
      <Route element={<VisualSuggestionsPage />} path="/visualisierung-vorschau" />
      <Route element={<QualitySelectionPage />} path="/qualitaetsstufe" />
      <Route element={<Navigate replace to="/projekt-auswahl" />} path="/projekt-anlegen" />
      <Route element={<Navigate replace to="/projekt-auswahl" />} path="/grundstuecksdaten" />
      <Route element={<Navigate replace to="/projekt-auswahl" />} path="/zeitrahmen" />
      <Route element={<CapturePage />} path="/flaeche-erfassen" />
      <Route element={<FeatureSelectionPage />} path="/feature-auswahl" />
      <Route element={<Navigate replace to="/gestaltung-material" />} path="/pflanzen-auswahl" />
      <Route element={<Navigate replace to="/auswahl-zusammenfassung" />} path="/preisspanne" />
      <Route element={<PackageSelectionPage />} path="/paket-auswahl" />
      <Route element={<InvestmentOverviewPage />} path="/investitionsuebersicht" />
      <Route element={<Navigate replace to="/investitionsuebersicht" />} path="/endpreis-buchen" />
      <Route element={<DashboardUpdatedPage />} path="/dashboard-aktualisiert" />
      <Route element={<Navigate replace to="/visualisierung-vorschau" />} path="/ki-visualisierung" />
      <Route element={<AppointmentDatePage />} path="/termin-datum" />
      <Route element={<AppointmentDatePage />} path="/termin-buchung" />
      <Route element={<AppointmentTimePage />} path="/termin-uhrzeit" />
      <Route element={<Navigate replace to="/dashboard-aktualisiert" />} path="/buchung-erfolg" />
      <Route element={<ProjectReleasePage />} path="/projektfreischaltung" />
      <Route element={<ContactUnlockPage />} path="/kontaktdaten-freischaltung" />
      <Route element={<WorkPrepPage />} path="/vorarbeiten" />
      <Route element={<HandwerkerProjectsPage />} path="/handwerker-projekte" />
      <Route element={<HandwerkerInquiriesPage />} path="/handwerker-anfragen" />
      <Route element={<HandwerkerDashboardPage />} path="/handwerker-dashboard" />
      <Route element={<HandwerkerProjectAcceptPage />} path="/handwerker-projekt-annehmen" />
      <Route element={<ChatCustomerCraftPage />} path="/chat-kunde-handwerker" />
      <Route element={<ChatCraftCustomerPage />} path="/chat-handwerker-kunde" />
      <Route element={<ProjectDetailsPage />} path="/projekt-details" />
      <Route element={<HandwerkerProjectDetailsPage />} path="/handwerker-projekt-details" />
      <Route element={<TerminConfirmationPage />} path="/termin-bestaetigung" />
      <Route element={<Navigate replace to="/" />} path="*" />
    </Routes>
    </>
  );
}
