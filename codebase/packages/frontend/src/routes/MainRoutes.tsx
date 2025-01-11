import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import DashboardLayout from 'layout/Dashboard';
import { FormattedMessage } from 'react-intl';
import ErrorBoundry from 'ErrorBoundry';

const DashboardPage = Loadable(lazy(() => import('pages/private_pages/dashboard')));
const Page404 = Loadable(lazy(() => import('pages/maintenance/404')));
const Page500 = Loadable(lazy(() => import('pages/maintenance/500')));
const AnalyzePage = Loadable(lazy(() => import('pages/private_pages/analyze')));
const ConnectPage = Loadable(lazy(() => import('pages/private_pages/connect')));
const ModelPage = Loadable(lazy(() => import('pages/private_pages/model')));
const ReportPage = Loadable(lazy(() => import('pages/private_pages/report')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  errorElement: <Page500 />,
  children: [
    {
      path: '/',
      element: <DashboardLayout />,

      children: [
        {
          path: '/dashboard',
          element: <ErrorBoundry><DashboardPage /></ErrorBoundry>
        },
        {
          path: '/analyze',
          element: <ErrorBoundry><AnalyzePage /></ErrorBoundry>
        },
        {
          path: '/connect',
          element: <ErrorBoundry><ConnectPage /></ErrorBoundry>
        },
        {
          path: '/model',
          element: <ErrorBoundry><ModelPage /></ErrorBoundry>
        },
        {
          path: '/report',
          element: <ErrorBoundry><ReportPage /></ErrorBoundry>
        },
        {
          path: '/404',
          title: <FormattedMessage id="Not Found" />,
          element: <Page404 />,
        },
        {
          path: '/500',
          title: <FormattedMessage id="Server Error" />,
          element: <Page500 />,
        }
      ]
    },
    {
      path: '*',
      element: <Page404 />
    }

  ]
};

export default MainRoutes;
