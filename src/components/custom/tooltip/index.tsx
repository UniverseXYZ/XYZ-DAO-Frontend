import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import { usePopper } from 'react-popper';
import cn from 'classnames';

import s from './s.module.scss';

type TooltipProps = {
  children: ReactNode;
  target: ReactNode;
  placement?: 'top' | 'bottom';
  title?: string | undefined;
  className?: string;
};

export const Tooltip: FC<TooltipProps> = props => {
  const { children, target, title, placement = 'bottom', className } = props;
  const [showTooltip, setShowTooltip] = useState(false);
  const targetRef = useRef(null);
  const popperRef = useRef(null);
  const arrowRef = useRef(null);

  const { styles, attributes, state, forceUpdate } = usePopper(targetRef.current, popperRef.current, {
    placement,
    strategy: 'absolute',
    modifiers: [
      { name: 'arrow', options: { element: arrowRef.current } },
      { name: 'preventOverflow', options: { padding: 8 } },
    ],
  });

  useEffect(() => {
    if (showTooltip && forceUpdate) {
      forceUpdate();
    }
  }, [showTooltip, forceUpdate]);

  const handlerShow = () => {
    setShowTooltip(true);
  };

  const handlerHide = () => {
    setShowTooltip(false);
  };

  return (
    <div
      ref={targetRef}
      onMouseEnter={handlerShow}
      onMouseLeave={handlerHide}
      onFocus={handlerShow}
      onBlur={handlerHide}
      style={{ display: 'inline-flex' }}
      tabIndex={0}>
      {target}
      <div
        ref={popperRef}
        className={cn(s.popper, className, { [s.hide]: !showTooltip })}
        style={styles.popper}
        tabIndex={showTooltip ? 0 : -1}
        {...attributes.popper}>
        <div className={s.tooltip}>
          {title && <div className={s.title}>{title}</div>}
          {children}
          <div ref={arrowRef} data-placement={state?.placement} className={s.arrow} style={styles.arrow} />
        </div>
      </div>
    </div>
  );
};
