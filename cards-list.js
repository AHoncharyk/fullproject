import Card from "./card.js";

export default class CardsList {
  constructor(data = []) {
    this.data = data;
    this.render();
    this.renderCards();
  }

  getTemplate() {
    return `
     <div>
        <div class="os-products-list" data-element="body">
          <!-- Card List -->
        </div>
      </div>
    `
  }

  render() {
    const wrapper = document.createElement('div');

    wrapper.innerHTML = this.getTemplate();

    this.element = wrapper.firstElementChild;
  }

  renderCards() {
    const cards = this.data.map(item => {
      const card = new Card(item);

      card.element.addEventListener('add-product', event => {
        const customEvent = new CustomEvent('add-product', {
          detail: event.detail
        });

        this.element.dispatchEvent(customEvent);
      });

      return card.element;
    });

    const body = this.element.querySelector('[data-element="body"]');

    body.innerHTML = '';
    body.append(...cards);
  }

  update(data = []) {
    this.data = data;

    this.renderCards();
  }
}