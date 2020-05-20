import React, { Suspense } from 'react';
import { PageLoader } from '../common';

export default function App({ children }) {
  return (
    <div className="home-app">
      <div className="page-container">
        <Suspense fallback={<PageLoader />}>
          {children}
        </Suspense>
      </div>
    </div>
  );
}
