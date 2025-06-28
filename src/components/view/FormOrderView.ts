import { IEvents, payment, ICustomerData } from "../../types";
import { ensureElement } from "../../utils/utils";
import { FormView } from "../common/FormView";

interface IOrderForm extends Pick<ICustomerData, 'payment' | 'address'> {}

export class FormOrderView extends FormView<IOrderForm> {
  _address: HTMLInputElement;
  cardButton: HTMLButtonElement;
  cashButton : HTMLButtonElement;
  
  constructor(container: HTMLFormElement, events: IEvents) {
    super(container, events);
    
    this.cardButton = ensureElement<HTMLButtonElement>('[name="card"]', this.container);
    this.cashButton = ensureElement<HTMLButtonElement>('[name="cash"]', this.container);
    this._address = ensureElement<HTMLInputElement>('[name="address"]', this.container);
    
    this.cardButton.addEventListener('click', () => {
        events.emit('payment:changed', {payment: 'card'});
    })

     this.cashButton.addEventListener('click', () => {
        events.emit('payment:changed', {payment: 'cash'});
    })

  }

  set address(text: string) {
    this._address.value = text;
  }

  set payment(value: payment) {
      this.cardButton.classList.toggle('button_alt-active', value === 'card');
      this.cashButton.classList.toggle('button_alt-active', value === 'cash');
  } 

}