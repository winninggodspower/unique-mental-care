class ToggleErrorElement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <slot></slot>
    `;
  }

  connectedCallback() {
    this.updateVisibility();
    this.shadowRoot.querySelector('slot').addEventListener('slotchange', () => {
      this.updateVisibility();
    });
  }

  updateVisibility() {
    const content = this.innerHTML.trim();
    if (content.length < 1) {
      this.style.display = 'none';
    } else {
      this.style.display = 'inline-block';
    }
  }
}

customElements.define('toggle-error', ToggleErrorElement);
