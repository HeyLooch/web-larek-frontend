import { IEvents, IProduct } from "../../types";
import { CardCatalogView } from './CardCatalogView';
import { ensureElement } from '../../utils/utils';

interface ICardPreView extends Pick<IProduct, 'description'> {
  inBasket: boolean;
  canBuy: boolean;
}

export class CardPreView extends CardCatalogView<ICardPreView> {
  protected _description: HTMLElement;
  protected _buyButton: HTMLButtonElement;

  constructor (container: HTMLElement, events: IEvents) {
    super(container, events);
  
  this._description = ensureElement<HTMLElement>('.card__text', this.container);
  this._buyButton = ensureElement<HTMLButtonElement>('.card__button', this.container);

  this._buyButton.addEventListener('click', () => {
    events.emit('card:buy', {id: this._id});
  });
  
}

  set description(description: string) {
    this._description.textContent = description;
  }

  set inBasket(value: boolean) {
    if (!value) {
      this._buyButton.textContent = 'В корзину';
     } else {
      this._buyButton.textContent = 'Уже в корзине'
    }
  }

  set canBuy(value: boolean) {
    if (!value) {
      this._buyButton.disabled = true;
    } else {
      this._buyButton.disabled = false;
    }
  }

}
