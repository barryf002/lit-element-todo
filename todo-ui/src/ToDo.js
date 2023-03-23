import { LitElement, html } from 'lit-element/lit-element.js';
import { style } from './ToDo-styles.js';
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

    this.updateToDoItem = this.updateToDoItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  async firstUpdated()
  {    
    this.getTodos();
  }

  handleKeyPress(e) {
    if (e.target.value !== '') {
      if (e.key === 'Enter') {
        this.createNewToDoItem();
      }
    }
  }

  handleInput(e) {
    this.newContent = e.target.value;
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
          ${this.todoList.map((item) => {
              console.log(item.isCompleted)
              return html`
                <to-do-item
                  .id=${item.id}
                  .completed=${item.isCompleted}
                  .item=${item.content}
                  .deleteItem=${this.deleteItem}
                  .updateToDoItem=${this.updateToDoItem}
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

  async getTodos(){
    try{

      var todoList = await apiClient.get('todo');
      
      //update the state
      this.todoList = todoList;
    }
    catch(error){
      console.error('getTodos failed:' + error.message);
    }
  }

  async createNewToDoItem() {

    try{

      var todo = await apiClient.post('todo', { content: this.newContent });
      
      //update the state
      this.todoList = [
        ...this.todoList,
        todo
      ];

      this.newContent = '';

    }catch(error){
      console.error('createNewToDoItem failed:' + error.message);
    }
  }

  async updateToDoItem(id, todo) {

    try{      
      var updatedTodo = await apiClient.patch('todo', id, todo);      
      //find and update in place using the response
      var todoList = [ ...this.todoList ];      
      var todoIdx = todoList.findIndex(_ => _.id == id);      
      todoList[todoIdx] = updatedTodo;

      //update the state    
      this.todoList = [ ...this.todoList ];

    }catch(error){
      console.error('updateNewToDoItem failed:' + error.message);
    }
  }

  async deleteItem(id) {
    try{
      await apiClient.delete('todo', id);
      this.todoList = this.todoList.filter(_ => _.id != id);
    }catch(error){
      console.error('deleteItem failed:' + error.message);
    }
  }
}

customElements.define('to-do', ToDo);
