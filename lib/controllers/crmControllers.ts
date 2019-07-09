import { TodoModels, Todo, TodoList } from './../models/crmModel';
import { Request, Response } from 'express';

export class TodosController {
	// private TodoModel: TodoModels = new TodoModels();
	// private that = this;
	TodoModel: TodoModels;

	constructor() {
		this.TodoModel = new TodoModels();
	}

	public addNewTodo(req: Request, res: Response) {
		try {
			let todo: Todo = req.body;
			let newTodo = this.TodoModel.addNewTodo.bind(this.TodoModel)(todo);
			if (newTodo.id !== -1) {
				res.status(200).send({
					status: 'success',
					todo: newTodo
				});
			} else throw 'error';
		} catch (e) {
			res.status(400).send({
				status: 'error'
			});
		}
	}

	public getTodos(req: Request, res: Response) {
		let todos: [Todo] = this.TodoModel.getTodos.bind(this.TodoModel)();

		if (todos) {
			res.status(200).send({
				status: 'success',
				todos
			});
		} else {
			res.status(400).send({
				status: 'error',
				message: 'Empty data'
			});
		}
	}

	public getTodoWithID(req: Request, res: Response) {
		let todoId = req.params.todoId;

		let todo: Todo = this.TodoModel.getTodoWithID.bind(this.TodoModel)(todoId);

		if (todo) {
			res.status(200).send({
				status: 'success',
				todo
			});
		} else {
			res.status(400).send({
				status: 'error',
				message: 'Empty data'
			});
		}
	}

	public updateTodo(req: Request, res: Response) {
		try {
			let todo: Todo = req.body;
			let todoId = req.params.todoId;
			let status = this.TodoModel.updateTodo.bind(this.TodoModel)(todoId, todo);
			
			if (status) {
				res.status(200).send({
					status: 'success'
				});
			} else {
				throw 'error';
			}
		} catch (e) {
			res.status(400).send({
				status: 'error',
				message: 'Empty data'
			});
		}
	}

	public deleteTodo(req: Request, res: Response) {
		let todoId = req.params.todoId;
		let status = this.TodoModel.deleteTodo.bind(this.TodoModel)(todoId);
		if (status) {
			res.status(200).send({
				status: 'success'
			});
		} else {
			res.status(400).send({
				status: 'error'
			});
		}
	}
}
