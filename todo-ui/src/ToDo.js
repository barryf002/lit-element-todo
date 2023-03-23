import {LitElement, html} from 'lit-element/lit-element.js';
import {style} from './ToDo-styles.js';
import { apiClient } from './components/ApiClient.js';
import './components/ToDoItem.js';
// import Logo from './assets/logo.png';

export class ToDo extends LitElement {
  /**
  * Declare the properties that will be
  * available in the binding system
  */
  static get properties() {
    return {
      todoList: {type: Array},
      newContent: {type: String}
    };
  }

  constructor() {
    super();
    this.todoList = [];
    this.newContent = '';
  }

  async getTodos(){
    try{
      var todoList = await apiClient.getJson('todo');
      this.todoList = todoList;
    }
    catch(error){
      console.error('getTodos failed');
    }
  }

  async firstUpdated()
  {
    this.getTodos();
  }

  async createNewToDoItem() {

    try{
      var todo = await apiClient.postJson('todo', 
        JSON.stringify({ content: this.newContent }));
      
      this.todoList = [
        ...this.todoList,
        todo
      ];

      this.newContent = '';

    }catch(error){
      console.error('createNewToDoItem failed:' + error.message)
    }
  }

  handleKeyPress(e) {
    if (e.target.value !== '') {
      if (e.key === 'Enter') {
        this.createNewToDoItem();
      }
    }
  }

  handleInput(e) {
    this.todo = e.target.value;
  }

  // this is now being emitted back to the parent from the child component
  deleteItem(id) {
    //this is not working - HELP!!!
  }

  static get styles() {
    return [style];
  }

  render() {
    return html`
    <div class="ToDo">
      <h1>LitElement</h1>
      <h1 class="ToDo-Header">LitElement To Do</h1>
      <div class="ToDo-Container">
        <div class="ToDo-Content">
          ${this.todoList.map((item, key) => {
              return html`
                <to-do-item
                  item=${item.content}
                  .deleteItem=${this.deleteItem.bind(this, key)}
                ></to-do-item>
              `;
            }
          )}
        </div>

        <div>
          <input
            type="text"
            .value=${this.newContent}
            @input=${this.handleInput}
            @keypress=${this.handleKeyPress}
          />
          <button
            class="ToDo-Add"
            @click=${this.createNewToDoItem}
          >+</button>
        </div>

      </div>
    </div>
    `;
  }
}

customElements.define('to-do', ToDo);
