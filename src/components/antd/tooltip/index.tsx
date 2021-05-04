import React from 'react';
import AntdTooltip, { TooltipPropsWithTitle as AntdTooltipPropsWithTitle } from 'antd/lib/tooltip';
import cn from 'classnames';

import s from './s.module.scss';

export type TooltipProps = Partial<AntdTooltipPropsWithTitle> & {
  hint?: boolean;
};

const Tooltip: React.FC<TooltipProps> = props => {
  const { overlayClassName, children, hint, ...tooltipProps } = props;

  return (
    <AntdTooltip
      title=""
      placement="bottom"
      overlayClassName={cn(s.overlay, overlayClassName, { [s.hint]: hint })}
      {...tooltipProps}>
      {children}
    </AntdTooltip>
  );
};

export default Tooltip;
