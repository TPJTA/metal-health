import type { AppProps } from 'next/app';
import React, { useMemo } from 'react';
import '@/styles/global.scss';
import 'antd/dist/antd.css';
import MainLayout from '@/layouts/main';
import AdminLayout from '@/layouts/admin';
import 'react-quill/dist/quill.snow.css';
import { useRouter } from 'next/router';

const layouts = [
  {
    path: /^\/admin\/login/,
    componet: React.Fragment,
  },
  {
    path: /^\/admin/,
    componet: AdminLayout,
  },
  {
    path: /^\//,
    componet: MainLayout,
  },
];

function MyApp({ Component }: AppProps) {
  const router = useRouter();
  const Layout = useMemo(() => {
    return (
      layouts.find((i) => i.path.test(router.pathname))?.componet ?? MainLayout
    );
  }, [router]);

  return (
    <Layout>
      <Component />
    </Layout>
  );
}

export default MyApp;
