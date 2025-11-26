import { Metadata } from 'next';
import PricingPage from './pricing-client';

export const metadata: Metadata = {
  title: 'Pricing - Menify',
  description: 'Pilih paket yang sesuai dengan kebutuhan bisnis Anda. Mulai gratis atau upgrade untuk fitur premium.',
};

export default function Pricing() {
  return <PricingPage />;
}
