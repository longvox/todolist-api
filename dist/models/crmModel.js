"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TodoModels {
    constructor() {
        // Here we import the File System module of node
        this.fs = require('fs');
        this.path = require('path');
        this.pathFileDataLocal = __dirname + '/data.dat';
        const that = this;
        this.fs.readFile(this.pathFileDataLocal, 'utf8', function (err, data) {
            if (err)
                console.log(err);
            that.data = JSON.parse(data);
        });
    }
    findById(id) {
        return this.data.todos.find((x) => x.id == id);
    }
    saveChange() {
        let log;
        this.fs.writeFile(this.pathFileDataLocal, JSON.stringify(this.data), function (err) {
            if (err) {
                log = {
                    message: 'error',
                    error: err
                };
            }
            else {
                log = {
                    message: 'success',
                    error: 'null'
                };
            }
        });
        return log;
    }
    addNewTodo(todo) {
        try {
            let addTodo = {
                id: ++this.data.last_id,
                text: todo.text,
                completed: todo.completed
            };
            if (!addTodo.id && !addTodo.text && !addTodo.completed)
                throw 'undefined';
            this.data.todos.push(addTodo);
            let log = this.saveChange();
            return this.findById(addTodo.id);
        }
        catch (e) {
            return {
                id: -1,
                text: 'null',
                completed: false
            };
        }
    }
    getTodos() {
        return this.data.todos;
    }
    getTodoWithID(id) {
        return this.findById(id);
    }
    updateTodo(id, todo) {
        let todoUpdate = this.findById(id);
        if (!todo.text && !todo.completed)
            return false;
        if (todoUpdate) {
            todoUpdate.text = todo.text;
            todoUpdate.completed = todo.completed;
            this.saveChange();
            return true;
        }
        return false;
    }
    deleteTodo(id) {
        let indexTodo = this.data.todos.findIndex((x) => x.id == id);
        if (indexTodo !== -1) {
            this.data.todos.splice(indexTodo, 1);
            this.saveChange();
            return true;
        }
        return false;
    }
}
exports.TodoModels = TodoModels;
//# sourceMappingURL=crmModel.js.map