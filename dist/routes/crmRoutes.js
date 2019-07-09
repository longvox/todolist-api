"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crmControllers_1 = require("../controllers/crmControllers");
const cors = require("cors");
class Routes {
    constructor() {
        this.Todos = new crmControllers_1.TodosController();
    }
    routes(app) {
        app.use(cors());
        app.route('/')
            .get((req, res) => {
            res.status(200).send({
                message: 'GET request successfulll!!!!'
            });
        });
        app.route('/todo')
            .get((req, res, next) => {
            // Get all contacts            
            next();
        }, this.Todos.getTodos.bind(this.Todos))
            .post((req, res, next) => {
            // Create new contact      
            next();
        }, this.Todos.addNewTodo.bind(this.Todos));
        // Contact detail
        app.route('/todo/:todoId')
            // get specific contact
            .get((req, res, next) => {
            // Get a single contact detail
            next();
        }, this.Todos.getTodoWithID.bind(this.Todos))
            .put((req, res, next) => {
            // Update a contact       
            next();
        }, this.Todos.updateTodo.bind(this.Todos))
            .delete((req, res, next) => {
            // Delete a contact     
            next();
        }, this.Todos.deleteTodo.bind(this.Todos));
    }
}
exports.Routes = Routes;
//# sourceMappingURL=crmRoutes.js.map