import { GetStaticProps } from 'next';
import React from 'react';

function RedirectPage() {
  return <p>RedirectPage</p>;
}

export default RedirectPage;
export const getStaticProps: GetStaticProps = () => {
  return {
    redirect: {
      permanent: true,
      destination: '/admin/info',
    },
  };
};
