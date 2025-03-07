import { NavItem } from 'types';

//Info: The following data is used for the sidebar navigation and Cmd K bar.
export const navItems: NavItem[] = [
  {
    title: 'Crypto Dashboard',
    url: '/dashboard/crypto',
    icon: 'dashboard',
    shortcut: ['cr', 'cr'],
    items: []
  },
  {
    title: 'Ecommerce',
    url: '/dashboard/ecommerce',
    icon: 'dashboard',
    shortcut: ['e', 'e'],
    items: [
      {
        title: 'Products',
        url: '/dashboard/ecommerce/products',
        shortcut: ['p', 'p']
      },
      {
        title: 'Users',
        url: '/dashboard/ecommerce/users',
        shortcut: ['u', 'u']
      }
    ]
  },
  {
    title: 'Staffs & Permissions',
    url: '/dashboard/staffs-permissions',
    icon: 'logo',
    shortcut: ['sp', 'sp'],
    items: []
  },
  {
    title: 'Chat support',
    url: '#',
    icon: 'dashboard',
    shortcut: ['e', 'e'],
    items: [
      {
        title: 'FireChat',
        url: '#',
        shortcut: ['d', 'd']
      },
      {
        title: 'AiChat bot',
        url: '#',
        shortcut: ['d', 'd']
      }
    ]
  },
  {
    title: 'Media handling',
    url: '#',
    icon: 'dashboard',
    shortcut: ['e', 'e'],
    items: [
      {
        title: 'Image Gallery',
        url: '#',
        shortcut: ['d', 'd']
      },
      {
        title: 'Music gallery + playlists',
        url: '#',
        shortcut: ['d', 'd']
      },
      {
        title: 'Video gallery + playlists',
        url: '#',
        shortcut: ['d', 'd']
      }
    ]
  },
  {
    title: 'Others',
    url: '#',
    icon: 'dashboard',
    shortcut: ['e', 'e'],
    items: [
      {
        title: 'Firebase Auth',
        url: '#',
        shortcut: ['d', 'd']
      },
      {
        title: 'Forms handling',
        url: '#',
        shortcut: ['d', 'd']
      },
      {
        title: 'Weathers with webapi',
        url: '#',
        shortcut: ['d', 'd']
      },
      {
        title: 'Webstorage handling',
        url: '#',
        shortcut: ['d', 'd']
      },
      {
        title: 'Test <=> speech',
        url: '#',
        shortcut: ['d', 'd']
      }
    ]
  },
  {
    title: 'Dashboard',
    url: '/dashboard/overview',
    icon: 'dashboard',
    isActive: true,
    shortcut: ['d', 'd'],
    items: [] // Empty array as there are no child items for Dashboard
  },
  {
    title: 'Users',
    url: '/dashboard/users',
    icon: 'users',
    isActive: false,
    shortcut: ['ui', 'ui'],
    items: []
  },
  {
    title: 'App Settings',
    url: '#',
    icon: 'settings',
    shortcut: ['e', 'e'],
    items: [
      {
        title: 'Notification',
        url: '/dashboard/app-settings/notification',
        shortcut: ['n', 'n']
      },
      {
        title: 'Withdraw Screen',
        url: '/dashboard/app-settings/notice-board',
        shortcut: ['nb', 'nb']
      },
      {
        title: 'Banners',
        url: '/dashboard/app-settings/banners',
        shortcut: ['bnr', 'bnr']
      },
      {
        title: 'Languages',
        url: '/dashboard/app-settings/languages',
        shortcut: ['l', 'l']
      },
      {
        title: 'App Versions',
        url: '/dashboard/app-settings/app-version',
        shortcut: ['av', 'av']
      }
    ]
  }
  // {
  //   title: 'Support & Complaints',
  //   url: '#',
  //   icon: 'messages',
  //   items: [
  //     {
  //       title: 'Chat Support',
  //       url: '/dashboard/support/chat-support',
  //       shortcut: ['cs', 'cs']
  //     },
  //     {
  //       title: 'Complaints',
  //       url: '/dashboard/support/user-complaints',
  //       shortcut: ['uc', 'uc']
  //     }
  //   ]
  // },

  // References::----------------
  // {
  //   title: 'Product',
  //   url: '/dashboard/product',
  //   icon: 'product',
  //   shortcut: ['p', 'p'],
  //   isActive: false,
  //   items: [] // No child items
  // },
  // {
  //   title: 'Account',
  //   url: '#', // Placeholder as there is no direct link for the parent
  //   icon: 'billing',
  //   isActive: false,

  //   items: [
  //     {
  //       title: 'Profile',
  //       url: '/dashboard/profile',
  //       icon: 'userPen',
  //       shortcut: ['m', 'm']
  //     }
  //     // {
  //     //   title: 'Login',
  //     //   shortcut: ['l', 'l'],
  //     //   url: '/',
  //     //   icon: 'login'
  //     // }
  //   ]
  // }
  // {
  //   title: 'Kanban',
  //   url: '/dashboard/kanban',
  //   icon: 'kanban',
  //   shortcut: ['k', 'k'],
  //   isActive: false,
  //   items: [] // No child items
  // }
];

export type Product = {
  photo_url: string;
  name: string;
  description: string;
  created_at: string;
  price: number;
  id: number;
  category: string;
  updated_at: string;
};

export interface SaleUser {
  id: number;
  name: string;
  email: string;
  amount: string;
  image: string;
  initials: string;
}

export const recentSalesData: SaleUser[] = [
  {
    id: 1,
    name: 'Olivia Martin',
    email: 'olivia.martin@email.com',
    amount: '+$1,999.00',
    image: 'https://api.slingacademy.com/public/sample-users/1.png',
    initials: 'OM'
  },
  {
    id: 2,
    name: 'Jackson Lee',
    email: 'jackson.lee@email.com',
    amount: '+$39.00',
    image: 'https://api.slingacademy.com/public/sample-users/2.png',
    initials: 'JL'
  },
  {
    id: 3,
    name: 'Isabella Nguyen',
    email: 'isabella.nguyen@email.com',
    amount: '+$299.00',
    image: 'https://api.slingacademy.com/public/sample-users/3.png',
    initials: 'IN'
  },
  {
    id: 4,
    name: 'William Kim',
    email: 'will@email.com',
    amount: '+$99.00',
    image: 'https://api.slingacademy.com/public/sample-users/4.png',
    initials: 'WK'
  },
  {
    id: 5,
    name: 'Sofia Davis',
    email: 'sofia.davis@email.com',
    amount: '+$39.00',
    image: 'https://api.slingacademy.com/public/sample-users/5.png',
    initials: 'SD'
  }
];

// User response type example

export type UserApiResponse = {
  data: Array<User>;
  meta: {
    totalPages: number;
    currentPages: number;
    perPage: number;
    totalUsers: number;
  };
};

// user type
export type User = {
  userId: number;
  userUniqueId: string;
  fullname: string;
  mobile: string;
  createdAt: string;
  userStatus: number;
  toWatch: boolean;
  userDevices: { deviceName: string; deviceId: string }[];
};

export type IWithdrawlTiming = {
  dayName: string;
  startTime: string;
  endTime: string;
  message: string;
  isOpened: boolean;
};
