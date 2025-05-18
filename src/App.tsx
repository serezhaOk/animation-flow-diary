
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import BookmarksPage from "./pages/BookmarksPage";
import AboutPage from "./pages/AboutPage";
import SingleAnimationPage from "./pages/SingleAnimationPage";
import DevPage from "./pages/DevPage";
import NotFoundPage from "./pages/NotFoundPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/:categoryId" element={<HomePage />} />
            <Route path="/:categoryId/:animationId" element={<SingleAnimationPage />} />
            <Route path="/bookmarks" element={<BookmarksPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/dev" element={<DevPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
