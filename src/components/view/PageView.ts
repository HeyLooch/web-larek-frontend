import { View } from "../base/View";
import { IEvents } from '../../types';
import {ensureElement} from "../../utils/utils";

interface IPage {
	catalog: HTMLElement[];
	counter: number;
	locked: boolean;
}

export class PageView extends View<IPage> {
	protected gallery: HTMLElement;
	protected _counter: HTMLElement;
	protected _wrapper: HTMLElement;
	protected _basket: HTMLElement;


	constructor(container: HTMLElement, protected events: IEvents) {
		super(container);
		this.events = events;

		this.gallery = ensureElement<HTMLElement>('.gallery', this.container);
		this._counter = ensureElement<HTMLElement>('.header__basket-counter', this.container);
		this._wrapper = ensureElement<HTMLElement>('.page__wrapper', this.container);
		this._basket = ensureElement<HTMLButtonElement>('.header__basket', this.container);

		this._basket.addEventListener('click', () => {
			this.events.emit('basket:open');
		});
	}

	set catalog(items: HTMLElement[]) {
	this.gallery.replaceChildren(...items);
	}

	set counter(value: number) {
		this._counter.textContent = String(value);
	}

	set locked(value: boolean) {
		if (value) {
			this._wrapper.classList.add('page__wrapper_locked');
		} else {
			this._wrapper.classList.remove('page__wrapper_locked');
		}
	}
}