import type { FeatureKey } from './customerFlow';

export const investmentDisplayByFeature: Record<
  FeatureKey,
  { lineLabel: string; unitLabel: string | null; amountEuro: number }
> = {
  terrasse: { lineLabel: 'Terrasse – 45 m²', unitLabel: '180 € / m²', amountEuro: 8100 },
  rollrasen: { lineLabel: 'Rollrasen – 120 m²', unitLabel: '25 € / m²', amountEuro: 3000 },
  gartenhaus: { lineLabel: 'Gartenhaus – 12 m²', unitLabel: null, amountEuro: 2500 },
  brunnen: { lineLabel: 'Brunnen – 1,50 × 2,00 m', unitLabel: null, amountEuro: 2000 },
  gartenweg: { lineLabel: 'Gartenweg – 20 m²', unitLabel: '100 € / m²', amountEuro: 2000 },
};

export function formatInvestmentEuro(amount: number): string {
  return `${amount.toLocaleString('de-DE')} €`;
}

export function sumInvestmentForFeatures(keys: FeatureKey[]): number {
  return keys.reduce((sum, key) => sum + investmentDisplayByFeature[key].amountEuro, 0);
}
