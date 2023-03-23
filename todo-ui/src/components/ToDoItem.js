import {LitElement, html} from 'lit-element/lit-element.js';
import {style} from './ToDoItem-styles.js';

export class ToDoItem extends LitElement {
  /**
  * Declare the properties that will be
  * available in the binding system
  */
  static get properties() {
    return {
      id : {type: String},
      completed: {type: Boolean},
      item: {type: String},
      deleteItem: {type: Function},
      updateCompleted: {type: Function}
    };
  }

  static get styles() {
    return [style];
  }
 
  render() {
    return html`
      <div class="ToDoItem">
        <p class="ToDoItem-Text">${this.item}</p>
        <input type="checkbox" ?checked=${this.completed} @change=${(ev) => this.updateToDoItem(this.id, { isCompleted: ev.target.checked } )} />
        <button class="ToDoItem-Delete" @click=${() => this.deleteItem(this.id)}>X</button>
      </div>
    `;
  }
}

customElements.define('to-do-item', ToDoItem);
