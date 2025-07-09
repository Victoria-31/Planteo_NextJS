import './globals.css';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/Footer';
import { Providers } from './providers';

export const metadata = {
  title: 'Plantéo',
  description: 'Ton potager connecté',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <Providers>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
