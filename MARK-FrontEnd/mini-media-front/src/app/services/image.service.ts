import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  constructor(private http:HttpClient) { }

  getAllImages(){
    let url="http://localhost:8080/getAllPictures";
    return this.http.get(url)
  }
  getAllImagesByEmail(obj:any){
    let url="http://localhost:8080/getPicturesByEmail"
    return this.http.post(url,obj)
  }
  getLatestProfilePicture(obj:any){
    let url="http://localhost:8080/getProfilePicture"
    return this.http.post(url,obj)
  }
  getLatestCoverPhoto(obj:any){
    let url="http://localhost:8080/getCoverPhoto"
    return this.http.post(url,obj)
  }
  uploadImage(obj:any){
    let url="http://localhost:8080/uploadpicture"
    return this.http.post(url,obj)
  }
  deleteImage(obj:any){
    let url="http://localhost:8080/deletepicture"
    return this.http.post(url,obj)
  }
}
