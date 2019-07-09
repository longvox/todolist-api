"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crmModel_1 = require("./../models/crmModel");
class TodosController {
    constructor() {
        this.TodoModel = new crmModel_1.TodoModels();
    }
    addNewTodo(req, res) {
        try {
            let todo = req.body;
            let newTodo = this.TodoModel.addNewTodo.bind(this.TodoModel)(todo);
            if (newTodo.id !== -1) {
                res.status(200).send({
                    status: 'success',
                    todo: newTodo
                });
            }
            else
                throw 'error';
        }
        catch (e) {
            res.status(400).send({
                status: 'error'
            });
        }
    }
    getTodos(req, res) {
        let todos = this.TodoModel.getTodos.bind(this.TodoModel)();
        if (todos) {
            res.status(200).send({
                status: 'success',
                todos
            });
        }
        else {
            res.status(400).send({
                status: 'error',
                message: 'Empty data'
            });
        }
    }
    getTodoWithID(req, res) {
        let todoId = req.params.todoId;
        let todo = this.TodoModel.getTodoWithID.bind(this.TodoModel)(todoId);
        if (todo) {
            res.status(200).send({
                status: 'success',
                todo
            });
        }
        else {
            res.status(400).send({
                status: 'error',
                message: 'Empty data'
            });
        }
    }
    updateTodo(req, res) {
        try {
            let todo = req.body;
            let todoId = req.params.todoId;
            let status = this.TodoModel.updateTodo.bind(this.TodoModel)(todoId, todo);
            if (status) {
                res.status(200).send({
                    status: 'success'
                });
            }
            else {
                throw 'error';
            }
        }
        catch (e) {
            res.status(400).send({
                status: 'error',
                message: 'Empty data'
            });
        }
    }
    deleteTodo(req, res) {
        let todoId = req.params.todoId;
        let status = this.TodoModel.deleteTodo.bind(this.TodoModel)(todoId);
        if (status) {
            res.status(200).send({
                status: 'success'
            });
        }
        else {
            res.status(400).send({
                status: 'error'
            });
        }
    }
}
exports.TodosController = TodosController;
//# sourceMappingURL=crmControllers.js.map