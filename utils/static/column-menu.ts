import dynamic from 'next/dynamic';

export const columnMenu = [
  {
    text: 'Move column',
    append: true,
    hasSubMenu: true,
    hasIcon: true,
    component: dynamic(() => import('@/components/common/submenu/move-column'), { ssr: false }),
    icon: dynamic(() => import('@/components/common/icon/icon'), { ssr: false }),
    iconClass: 'relative h-2.5 w-auto transition-transform'
  },
  {
    text: 'Merge cells',
    append: true,
    hasSubMenu: true,
    hasIcon: true,
    component: dynamic(() => import('@/components/common/submenu/merge-cell'), { ssr: false }),
    icon: dynamic(() => import('@/components/common/icon/icon'), { ssr: false }),
    iconClass: 'relative h-2.5 w-auto transition-transform'
  },
  {
    text: 'Align content',
    append: true,
    hasSubMenu: true,
    hasIcon: true,
    component: dynamic(() => import('@/components/common/submenu/align-content'), { ssr: false }),
    icon: dynamic(() => import('@/components/common/icon/icon'), { ssr: false }),
    iconClass: 'relative h-2.5 w-auto transition-transform'
  },
  {
    text: 'Add column',
    append: true,
    hasSubMenu: true,
    hasIcon: true,
    component: dynamic(() => import('@/components/common/submenu/add-column'), { ssr: false }),
    icon: dynamic(() => import('@/components/common/icon/icon'), { ssr: false }),
    iconClass: 'relative h-2.5 w-auto transition-transform'
  },
  {
    text: 'Add row',
    append: true,
    hasSubMenu: true,
    hasIcon: true,
    component: dynamic(() => import('@/components/common/submenu/add-row'), { ssr: false }),
    icon: dynamic(() => import('@/components/common/icon/icon'), { ssr: false }),
    iconClass: 'relative h-2.5 w-auto transition-transform'
  },
  {
    text: 'Sort column by',
    append: true,
    hasSubMenu: true,
    hasIcon: true,
    component: dynamic(() => import('@/components/common/submenu/sort'), { ssr: false }),
    icon: dynamic(() => import('@/components/common/icon/icon'), { ssr: false }),
    iconClass: 'relative h-2.5 w-auto transition-transform'
  },
  {
    text: 'Convert to',
    append: true,
    hasSubMenu: false,
    hasIcon: false,
    component: '',
    icon: '',
    iconClass: ''
  },
]