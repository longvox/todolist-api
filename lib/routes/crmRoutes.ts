import {Request, Response} from "express";
import { TodosController } from "../controllers/crmControllers";
import * as cors from "cors";

export class Routes {    
    public Todos: TodosController = new TodosController() 

    public routes(app): void {   
        app.use(cors());          

        app.route('/')  
        .get((req: Request, res: Response) => {            
            res.status(200).send({
                message: 'GET request successfulll!!!!'
            })
        })

        app.route('/todo') 
        .get((req: Request, res: Response, next: Function) => {
        // Get all contacts            

            next();
        }, this.Todos.getTodos.bind(this.Todos))        
        .post((req: Request, res: Response, next: Function) => {   
        // Create new contact      
            next();
        }, this.Todos.addNewTodo.bind(this.Todos))

        // Contact detail
        app.route('/todo/:todoId')
        // get specific contact
        .get((req: Request, res: Response, next: Function) => {
        // Get a single contact detail
            next();
        }, this.Todos.getTodoWithID.bind(this.Todos))
        .put((req: Request, res: Response, next: Function) => {
        // Update a contact       
            next();
        }, this.Todos.updateTodo.bind(this.Todos))
        .delete((req: Request, res: Response, next: Function) => {       
        // Delete a contact     
            next();
        }, this.Todos.deleteTodo.bind(this.Todos))
    }
}