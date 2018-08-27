import HyperComponent from "../esm/widgets/component/HyperComponent";
import { List } from "../esm/widgets/list/List";

import config from "../esm/util/decorator/config";


// @config({
// 	model: {
// 		greeting:"hi"
// 		,subject:"world"
// 	}
// })
// class SimpleExample extends HyperComponent {

// 	renderTemplate() {
// 		return this.tpl`
// 			<span id="simple-example">${this.model.greeting} ${this.model.subject}!</span>
// 		`;
// 	}

// }

// window.SimpleExample = SimpleExample;

// window.example = SimpleExample.attach(document.getElementById("todo"));


class Todo extends HyperComponent {

	constructor(...args) {
		super(...args);

		let todos = this;

		this.input = this.getTpl(this,':input')`
			<input type="text"
			onkeydown=${e=>{e.keyCode==13 && this.addTodo()}}	
			/>
		`;

		this.addTodoButton = this.getTpl(this,':btn')`
			<button onclick=${()=>this.addTodo()}>Add</button>
		`;



		this.doneList = new class extends List {
			renderItem(item,index) {
				return this.getTpl(item,":todonewrap")`<li>

					<span style=${{textDecoration:"line-through"}}>${item.text}</span>
					
					<button onclick=${()=>todos.removeTodo(index)}>
						Remove
					</button>

				</li>`;
			}
		};

		this.todoList = new class extends List {
			renderItem(item,index) {
				return this.getTpl(item,":todowrap")`<li>

					${item.text}
					
					<button onclick=${()=>todos.markDone(index)}>
						Done
					</button>

				</li>`;
			}
		};
	}

	addTodo(todo=this.input.value) {
		if (todo) {
			this.todoList.model.items.push(todo);
			this.input.value=null;
			this.input.focus();
		}
	}

	markDone(index) {
		if (this.todoList.model.items.length > index) {
			let done = this.todoList.model.items.splice(index,1);

			this.doneList.model.items = this.doneList.model.items.concat(done);
		}
	}

	removeTodo(index) {
		if (this.doneList.model.items.length > index) {
			this.doneList.model.items.splice(index,1);
		}
	}

	clear() {
		this.todoList.model.items = [];
	}

	renderTemplate() {
		return this.tpl`
			<hr />

			${this.input}
			
			${this.addTodoButton}

			${this.doneList.render()}
			${this.todoList.render()}

			<hr />
		`;
	}

}

window.t = Todo.attach(document.getElementById("todo"));