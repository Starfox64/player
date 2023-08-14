import { Component, effect, useContext } from 'maverick.js';
import { DOMEvent } from 'maverick.js/std';
import { FocusVisibleController } from '../../../foundation/observers/focus-visible';
import { onPress } from '../../../utils/dom';
import { menuContext, type MenuContext } from './menu-context';

/**
 * A button that controls the opening and closing of a menu component. The button will become a
 * menuitem when used inside a submenu.
 *
 * @docs {@link https://www.vidstack.io/docs/player/components/menu/menu}
 */
export class MenuButton extends Component<MenuButtonProps, {}, MenuButtonEvents> {
  static props: MenuButtonProps = {
    disabled: false,
  };

  private _menu!: MenuContext;

  get expanded() {
    return this._menu?._expanded() ?? false;
  }

  constructor() {
    super();
    new FocusVisibleController();
  }

  protected override onSetup(): void {
    this._menu = useContext(menuContext);
  }

  protected override onAttach(el: HTMLElement) {
    this._menu._attachMenuButton(this);
    effect(this._watchDisabled.bind(this));
  }

  protected override onConnect(el: HTMLElement) {
    const hint = Array.from(el.querySelectorAll('[data-part="hint"]')).pop();
    if (hint) {
      effect(() => {
        const text = this._menu._hint();
        if (text) hint.textContent = text;
      });
    }

    onPress(el, (trigger) => {
      this.dispatch('select', { trigger });
    });
  }

  private _watchDisabled() {
    this._menu._disableMenuButton(this.$props.disabled());
  }
}

export interface MenuButtonProps {
  /**
   * Whether the button should be disabled (non-interactive).
   */
  disabled: boolean;
}

export interface MenuButtonEvents {
  select: MenuButtonSelectEvent;
}

/**
 * Fired when the button is pressed via mouse, touch, or keyboard.
 */
export interface MenuButtonSelectEvent extends DOMEvent<void> {
  target: MenuButton;
}
