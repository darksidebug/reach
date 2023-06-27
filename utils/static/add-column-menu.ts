import dynamic from 'next/dynamic';

export const addColumnMenu = [
  {
    text: 'to the right',
    icon: dynamic(() => import('@/components/common/icon/icon'), { ssr: false }),
    src: dynamic(() => import('@/icons/arrow-right.svg'), { ssr: false }),
  }
]