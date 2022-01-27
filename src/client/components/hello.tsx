import React from 'react';
import Image from 'next/image';
import Test from 'assets/images/favicon.512x512.png';

function Hello() {
  return (
    <div>
      <span>hello</span>
      <Image src={Test} alt="" />
    </div>
  );
}

export default Hello;
