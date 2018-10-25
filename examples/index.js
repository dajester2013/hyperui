import HyperComponent from "../esm/widgets/component/HyperComponent";
import { List } from "../esm/widgets/list/List";

import config from "../esm/util/decorator/config";
import { bind, hyper } from "hyperhtml";
import Container from "../esm/widgets/container/Container";

window.List = List;

window.appctr = new Container({
	 id:"appctr"
	,items: [

		"hi world"

		,window.c = new Container({
			id:"listctr"

			,items: [
				window.l=new List({
					model: {
						items: [
							"this","is","a","test"
						]
					}
				})
			]
		})
	]
});

window.appctr.render(document.body);

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

// window.example = new SimpleExample();
// document.body.appendChild(window.example.render());


// class Todo extends HyperComponent {

// 	constructor(...args) {
// 		super(...args);

// 		let todos = this;

// 		this.input = this.getTpl(':input')`
// 			<input type="text"
// 			onkeydown=${e=>{e.keyCode==13 && this.addTodo()}}	
// 			/>
// 		`;

// 		this.addTodoButton = this.getTpl(':btn')`
// 			<button onclick=${()=>this.addTodo()}>Add</button>
// 		`;



// 		this.doneList = new class extends List {
// 			renderItem(item,index) {
// 				return this.getTpl(item)`<li>

// 					<span style=${{textDecoration:"line-through"}}>${item.text}</span>
					
// 					<button onclick=${()=>todos.removeTodo(index)}>
// 						Remove
// 					</button>

// 				</li>`;
// 			}
// 		};

// 		this.todoList = new class extends List {
// 			renderItem(item,index) {
// 				return this.getTpl(":item", item)`<li>

// 					${item.text}
					
// 					<button onclick=${()=>todos.markDone(index)}>
// 						Done
// 					</button>

// 				</li>`;
// 			}
// 		};
// 	}

// 	addTodo(todo=this.input.value) {
// 		if (todo) {
// 			this.todoList.model.items.push(todo);
// 			this.input.value=null;
// 			this.input.focus();
// 		}
// 	}

// 	markDone(index) {
// 		if (this.todoList.model.items.length > index) {
// 			let done = this.todoList.model.items.splice(index,1);

// 			this.doneList.model.items = this.doneList.model.items.concat(done);
// 		}
// 	}

// 	removeTodo(index) {
// 		if (this.doneList.model.items.length > index) {
// 			this.doneList.model.items.splice(index,1);
// 		}
// 	}

// 	clear() {
// 		this.todoList.model.items = [];
// 	}

// 	renderTemplate() {
// 		return this.tpl`<div>
// 			<hr />
// 			${this.input}
				
// 			${this.addTodoButton}

// 			${this.doneList.render()}
// 			${this.todoList.render()}
// 			<hr />
// 		</div>`;
// 	}

// }

// window.todo = new Todo();
// document.body.appendChild(todo.render());
