// third-party
import { FormattedMessage } from 'react-intl';

// assets
import {
  DashboardOutlined,
  FileOutlined,
  FolderOpenOutlined,
  TrophyOutlined,
  LineChartOutlined,
  LinkOutlined,
  AppstoreOutlined,
  BarChartOutlined
} from '@ant-design/icons';

// type
import { NavItemType } from 'types/menu';

// icons
const icons = { 
  DashboardOutlined, 
  FileOutlined, 
  FolderOpenOutlined, 
  TrophyOutlined,
  LineChartOutlined,
  LinkOutlined,
  AppstoreOutlined,
  BarChartOutlined
};

// ==============================|| MENU ITEMS - PAGES ||============================== //

const pages: NavItemType = {
  id: 'group-pages',
  // title: <FormattedMessage id="pages" />,
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: <FormattedMessage id="Dashboard" />,
      type: 'item',
      url: '/dashboard',
      icon: icons.DashboardOutlined
    },
    {
      id: 'analyze',
      title: 'Analyze',
      type: 'item',
      url: '/analyze',
      icon: icons.LineChartOutlined
    },
    {
      id: 'connect',
      title: 'Connect',
      type: 'item',
      url: '/connect',
      icon: icons.LinkOutlined
    },
    {
      id: 'model',
      title: 'Model',
      type: 'item',
      url: '/model',
      icon: icons.AppstoreOutlined
    },
    {
      id: 'report',
      title: 'Report',
      type: 'item',
      url: '/report',
      icon: icons.BarChartOutlined
    }
  ]
};

export default pages;
