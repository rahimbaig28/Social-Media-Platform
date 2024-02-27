import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private http:HttpClient) { }
  getCommentsByImage(obj:any){
    let url="http://localhost:8080/getAllCommentsByImage";
    return this.http.post(url,obj)
  }
  deleteCommentByCommentId(obj:any){
    let url="http://localhost:8080/deleteCommentByCommentId";
    return this.http.post(url,obj)
  }
  addComments(obj:any){
    let url="http://localhost:8080/addcomment";
    return this.http.post(url,obj)
  }
}
