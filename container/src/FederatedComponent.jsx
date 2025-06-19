import React, { lazy, Suspense } from 'react';

const FederatedComponent = ({ scope, module }) => {
  const Component = lazy(() => import(`${scope}/${module}`));

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Component />
    </Suspense>
  );
};

export default FederatedComponent;