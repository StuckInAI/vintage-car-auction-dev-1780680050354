import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import HomePage from '@/pages/HomePage';
import ListingsPage from '@/pages/ListingsPage';
import CarDetailPage from '@/pages/CarDetailPage';
import SellCarPage from '@/pages/SellCarPage';
import AuctionPage from '@/pages/AuctionPage';
import AuctionDetailPage from '@/pages/AuctionDetailPage';
import CreateAuctionPage from '@/pages/CreateAuctionPage';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="listings" element={<ListingsPage />} />
          <Route path="listings/:id" element={<CarDetailPage />} />
          <Route path="sell" element={<SellCarPage />} />
          <Route path="auctions" element={<AuctionPage />} />
          <Route path="auctions/:id" element={<AuctionDetailPage />} />
          <Route path="auctions/create" element={<CreateAuctionPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
