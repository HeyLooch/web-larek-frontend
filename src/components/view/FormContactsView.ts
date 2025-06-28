import { IEvents, ICustomerData } from "../../types";
import { ensureElement } from "../../utils/utils";
import { FormView } from "../common/FormView";

interface IContactsForm extends Pick<ICustomerData, 'email' | 'phone'> {}

export class FormContactsView extends  FormView<IContactsForm> {
  protected _email: HTMLInputElement;
  protected _phone: HTMLInputElement;

  constructor(container: HTMLFormElement, events: IEvents) {
    super(container, events);
    
    this._email = ensureElement<HTMLInputElement>('[name="email"]', this.container);
    this._phone = ensureElement<HTMLInputElement>('[name="phone"]', this.container);
  }

set email(value: string) {
  this._email.value = value;
}

set phone(value: string) {
  this._phone.value = value;
}

}