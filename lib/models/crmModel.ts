export interface Todo {
	id: number;
	text: string;
	completed: boolean;
}

export interface TodoList {
	last_id: number;
	todos: [Todo];
}

export class TodoModels {
	// Here we import the File System module of node
	private fs = require('fs');
	private path = require('path');
	private pathFileDataLocal: string = __dirname + '/data.dat';
	private data: TodoList;

	constructor() {
		const that = this;
		this.fs.readFile(this.pathFileDataLocal, 'utf8', function(err, data) {
			if (err) console.log(err);
			that.data = JSON.parse(data);
		});
	}

	private findById(id: number): Todo {
		return this.data.todos.find((x) => x.id == id);
	}

	private saveChange() {
		let log: object;
		this.fs.writeFile(this.pathFileDataLocal, JSON.stringify(this.data), function(err) {
			if (err) {
				log = {
					message: 'error',
					error: err
				};
			} else {
				log = {
					message: 'success',
					error: 'null'
				};
			}
		});
		return log;
	}

	public addNewTodo(todo: Todo): Todo {
		try {
			let addTodo: Todo = {
				id: ++this.data.last_id,
				text: todo.text,
				completed: todo.completed
			};
			if (!addTodo.id && !addTodo.text && !addTodo.completed) throw 'undefined';

			this.data.todos.push(addTodo);
			let log = this.saveChange();

			return this.findById(addTodo.id)
		} catch (e) {
			return {
				id: -1,
				text: 'null',
				completed: false
			};
		}
	}

	public getTodos(): [Todo] {
		return this.data.todos;
	}

	public getTodoWithID(id: number): Todo {
		return this.findById(id);
	}

	public updateTodo(id: number, todo: Todo): boolean {
		let todoUpdate = this.findById(id);
		if (!todo.text && !todo.completed) return false;

		if (todoUpdate) {
			todoUpdate.text = todo.text;
			todoUpdate.completed = todo.completed;
			this.saveChange();
			return true;
		}
		return false;
	}

	public deleteTodo(id: number): boolean {
		let indexTodo = this.data.todos.findIndex((x) => x.id == id);
		if (indexTodo !== -1) {
			this.data.todos.splice(indexTodo, 1);
			this.saveChange();
			return true;
		}
		return false;
	}
}
