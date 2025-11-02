import { MemberProvider } from '@/integrations';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { ScrollToTop } from '@/lib/scroll-to-top';
import ErrorPage from '@/integrations/errorHandlers/ErrorPage';
import Layout from '@/components/Layout';
import HomePage from '@/components/pages/HomePage';
import ProductsPage from '@/components/pages/ProductsPage';
import ServicesPage from '@/components/pages/ServicesPage';
import IndustriesPage from '@/components/pages/IndustriesPage';
import CaseStudiesPage from '@/components/pages/CaseStudiesPage';
import ResourcesPage from '@/components/pages/ResourcesPage';
import PricingPage from '@/components/pages/PricingPage';
import ContactPage from '@/components/pages/ContactPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "products",
        element: <ProductsPage />,
      },
      {
        path: "services",
        element: <ServicesPage />,
      },
      {
        path: "industries",
        element: <IndustriesPage />,
      },
      {
        path: "case-studies",
        element: <CaseStudiesPage />,
      },
      {
        path: "resources",
        element: <ResourcesPage />,
      },
      {
        path: "pricing",
        element: <PricingPage />,
      },
      {
        path: "contact",
        element: <ContactPage />,
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
], {
  basename: import.meta.env.BASE_NAME,
});

export default function AppRouter() {
  return (
    <MemberProvider>
      <RouterProvider router={router} />
    </MemberProvider>
  );
}
