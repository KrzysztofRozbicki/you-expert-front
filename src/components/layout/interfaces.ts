import React from 'react';

export interface LayoutProps {
  pageTitle?: string;
  pageDescription?: string;
  keywords?: string;
  children?: React.ReactNode;
  isHideSubMenu?: boolean;
  containerBackground?: string;
  authState?: string;
  isDashboard?: boolean;
}
