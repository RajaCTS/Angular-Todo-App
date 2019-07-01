import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core';

@Injectable()

export class todoService {
    constructor(private http: HttpClient) {

    }
    baseURI = "http://localhost:3000";

    headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.getAuthToken()
    });

    getAuthToken() {
        return window.sessionStorage.getItem('Authorization');
    }

    getTodos = (user) => {
        return this.http.get(this.baseURI + "/todos", { params: { userID: user.userID }, headers: this.headers})
    }

    newTodo = (request) => {
        return this.http.post(this.baseURI + "/todos", request, {  headers: this.headers })
    }

    updateTodo = (request) => {
        delete request._id;
        return this.http.put(this.baseURI + "/todos", request, { params: { taskID: request.taskID },  headers: this.headers });
    }

    deleteTodo = (request) => {
        return this.http.delete(this.baseURI + "/todos", { params: { taskID: request.taskID },  headers: this.headers });
    }

}