import { ThemeProvider } from "./ThemeProvider";
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'

import AppWrapper from "./layouts/AppWrapper";

import './styles/global.css'
import Home from "./pages/Home";
import PageNotFound from './pages/PageNotFound';
import Campaigns from "./pages/campaigns/Campaigns";
import CreateCampaign from './pages/campaigns/CreateCampaign';
import Partners from './pages/partners/Partners';
import BecomePartner from "./pages/partners/BecomePartner";
import TokenImport from "./pages/TokenImport";
import SingleCampaign from "./pages/campaigns/SingleCampaign";
import CreateCause from "./pages/campaigns/CreateCause";

export default function App() {

  return (
    <BrowserRouter>
      hi
      <ThemeProvider>
        <AppWrapper>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/import" element={<TokenImport />} />
            <Route path="/campaigns" element={<Campaigns />} />
            <Route path="/campaigns/:cid" element={<SingleCampaign />} />
            <Route path="/create/campaign" element={<CreateCampaign />} />
            <Route path="/create/cause" element={<CreateCause />} />
            <Route path="/partners" element={<Partners />} />
            <Route path="/partners/become-partner" element={<BecomePartner />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </AppWrapper>
      </ThemeProvider>
    </BrowserRouter>
  );
}

