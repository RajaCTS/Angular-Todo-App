import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';

@Injectable()

export class todoService {
    constructor(private http: HttpClient) {

    }
    baseURI = "http://localhost:3000";

    getTodos = (user) => {
        return this.http.get(this.baseURI + "/todos", {
            params: {
                userID: user.userID
            }
        })
    }

    newTodo = (request) =>{
        return this.http.post(this.baseURI+"/todos",request);
    }

    updateTodo = (request) =>{
        delete request._id;
        return this.http.put(this.baseURI+"/todos",request,{params:{taskID:request.taskID}});
    }

    deleteTodo = (request) =>{
        delete request._id;
        return this.http.delete(this.baseURI+"/todos",{params:{taskID:request.taskID}});
    }

}