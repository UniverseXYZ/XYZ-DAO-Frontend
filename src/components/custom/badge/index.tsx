import React from 'react';
import cn from 'classnames';

import s from './s.module.scss';

type Props = {
  children?: number | string;
  className?: string;
  variant?: 'beta';
};

const Badge: React.FC<Props> = ({ children, className, variant, ...rest }) => {
  if (!children) return null;

  return (
    <div className={cn(s.badge, className, !!variant ? s[variant] : '')} {...rest}>
      {children}
    </div>
  );
};

export default Badge;
