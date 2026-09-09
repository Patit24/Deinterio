import React, { useEffect } from 'react';
import { AdminPortal } from '../components/AdminPortal';

export const AdminPortalPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <AdminPortal
      isStandalonePage={true}
      isOpen={true}
      onClose={() => {
        window.location.hash = '#/';
      }}
    />
  );
};
