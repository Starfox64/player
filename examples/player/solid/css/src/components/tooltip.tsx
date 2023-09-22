import styles from './tooltip.module.css';

import type { JSX } from 'solid-js';
import type { TooltipPlacement } from 'vidstack';

export function Tooltip(props: TooltipProps) {
  return (
    <media-tooltip>
      <media-tooltip-trigger>{props.triggerSlot}</media-tooltip-trigger>
      <media-tooltip-content class={styles.tooltip} placement={props.placement}>
        {props.contentSlot}
      </media-tooltip-content>
    </media-tooltip>
  );
}

export interface TooltipProps {
  triggerSlot: JSX.Element;
  contentSlot: JSX.Element;
  placement: TooltipPlacement;
}
