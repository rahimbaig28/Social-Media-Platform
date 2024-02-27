import { Component, OnInit } from '@angular/core';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/services/auth.service';
import { ImageService } from 'src/app/services/image.service';
import * as moment from 'moment';
import { CommentsService } from 'src/app/services/comments.service';
import { ToastrService } from 'ngx-toastr';

declare var $:any
@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  userDetails:any;
  commentVal:any;
  profilePicture:any;
  profileUploadedDate:any;
  coverPicture:any;
  uploadImageCaption:any;
  coverPhotoUploadedDate:any;
  showEmail:any
  showuserName:any
  allImages:any=[]
  comments:any=[]
  currentImage:any=''
  dataImage: any;
  dataImage2: any;
  profileUploadedTime: any;

  constructor(private commentService:CommentsService,private toastr: ToastrService, private spinner:NgxSpinnerService,private imageService:ImageService,private auth:AuthService) { }

  ngOnInit(): void {
    this.spinner.show()
    this.userDetails=this.auth.getLoginDetails()
    this.showEmail=this.userDetails.email
    this.showuserName=this.userDetails.username
    this.getLatestProfilePicture()
    this.getLatestCoverPhoto()
    this.getAllImagesShow()
  }

  getLatestProfilePicture(){
    let obj={
      "email":this.userDetails.email
    }
    this.imageService.getLatestProfilePicture(obj).subscribe((resp:any)=>{
      this.spinner.hide()
      if(resp.status==="success"){
        console.log(resp,"Resppp")
          this.profilePicture="http://localhost:8080/uploads/"+resp.imagePath
          let arr=moment(resp.uploadedData).format('YYYY-MMM-DD').split('-')
          this.profileUploadedDate=arr[1]+" "+arr[2]+" "+arr[0]

          const dataTime = resp.uploadedData.split('T')
          let timeV2 = dataTime[1]
          let timeV = moment(timeV2,"HH:mm:ss").format("LT")
          this.profileUploadedTime = timeV


      }else{
        // this.toastr.error(resp.message)
        this.profilePicture="http://localhost:8080/uploads/profile-icon-png-898.png"
        this.profileUploadedDate=""
      }
    })
  }

  getLatestCoverPhoto(){
    let obj={
      "email":this.userDetails.email
    }
    this.spinner.show()
    this.imageService.getLatestCoverPhoto(obj).subscribe((resp:any)=>{
      this.spinner.hide()
      if(resp.status==="success"){
        this.coverPicture="http://localhost:8080/uploads/"+resp.imagePath
        let arr=moment(resp.uploadedData).format('YYYY-MMM-DD').split('-')
          this.coverPhotoUploadedDate=arr[1]+" "+arr[2]+" "+arr[0]
      }else{
        // this.toastr.error(resp.message)
      }
    })
  }

  getAllImagesShow(){
    this.spinner.show()
    this.imageService.getAllImagesByEmail({email:this.showEmail}).subscribe((resp:any)=>{
      this.spinner.hide()
      if(resp.status==="success"){
        let data=resp.data;
        this.allImages=[]
        for(let i=0;i<data.length;i++){
          let url="http://localhost:8080/uploads/"+data[i].image1;
          let caption=data[i].caption!==undefined?data[i].caption:'';
          let arr=moment(data[i].pictureUploadedDate).format('YYYY-MMM-DD').split('-')
          let pictureuploadeddate=arr[1]+" "+arr[2]+" "+arr[0]

          const dataTime = data[i].pictureUploadedDate.split('T')
          let timeV2 = dataTime[1]
          let timeV = moment(timeV2,"HH:mm:ss").format("LT")

          let obj={
            url:url,
            caption:caption,
            pictureuploadeddate:pictureuploadeddate,
            pictureuploadedtime : timeV
          }
          this.allImages.push(obj)
          // console.log(url,"url")
        }
        
      }else{
        this.toastr.error(resp.message)
      }

      console.log(this.allImages,"all images")
    })
  }
  showComments(e:any,data:any){
    $('#commentsModal').modal('show')
    this.spinner.show()
    console.log(e,data,"e data")
    let obj={
      "image1":data.url.replace("http://localhost:8080/uploads/","")
    }
    this.commentService.getCommentsByImage(obj).subscribe((resp:any)=>{
      this.spinner.hide()
      console.log(resp)
      if(resp.status==="success"){
        this.comments=[]
        
        this.currentImage = resp.image
        for(let i=0;i<resp.comments.length;i++){
          const dataTime = resp.comments[i].commentedDate.split('T')
          let timeV2 = dataTime[1]
          let timeV = moment(timeV2,"HH:mm:ss").format("LT")
          let arr=moment(dataTime[0]).format('YYYY-MMM-DD').split('-')
          let commentedDate=arr[1]+" "+arr[2]+" "+arr[0]
          resp.comments[i]['dateCommented'] = commentedDate;
          resp.comments[i]['timeCommented'] = timeV
          this.comments.push(resp.comments[i])
        }
        // if(this.comments.length<=0){
        //   this.toastr.warning("No comments found for this image")
        // }
      }
      else{
        this.toastr.error(resp.message)
      }
      console.log(this.comments,"commm")
    })
   
  }

  deleteCommentClick(e:any,commentDetails:any){
    console.log(commentDetails,e)
    this.spinner.show()
    let obj={
      "email":this.showEmail,
      "commentId":commentDetails.commentId,
      "image1":this.currentImage
    }
  console.log(obj,"objj")
    this.commentService.deleteCommentByCommentId(obj).subscribe((resp:any)=>{
      this.spinner.hide()
      console.log(resp)
      if(resp.status==="success"){
        let obj2={
          "image1":this.currentImage
        }
        this.spinner.show()
        this.commentService.getCommentsByImage(obj2).subscribe((resp:any)=>{
          this.spinner.hide()
          console.log(resp)
          if(resp.status==="success"){
            this.toastr.success("Comment deleted succesfully")
            this.comments=[]
            this.currentImage = resp.image
            for(let i=0;i<resp.comments.length;i++){
              const dataTime = resp.comments[i].commentedDate.split('T')
              let timeV2 = dataTime[1]
              let timeV = moment(timeV2,"HH:mm:ss").format("LT")
              let arr=moment(dataTime[0]).format('YYYY-MMM-DD').split('-')
              let commentedDate=arr[1]+" "+arr[2]+" "+arr[0]
              resp.comments[i]['dateCommented'] = commentedDate;
              resp.comments[i]['timeCommented'] = timeV
              this.comments.push(resp.comments[i])
            }

          }else{
            this.toastr.error(resp.message)
          }
          console.log(this.comments,"commm")
        })
      }
    })
  }
  addComment(e:any){
    if(this.commentVal.length>0){
      this.spinner.show()
      let obj={
        "image1":this.currentImage,
        "email":this.showEmail,
        "username":this.showuserName,
        "comment":this.commentVal    
      }
      this.commentService.addComments(obj).subscribe((resp:any)=>{
        this.spinner.hide()
        console.log(resp,"resp")
        if(resp.status==="success"){
          this.toastr.success(resp.message)
          let obj2={
            "image1":this.currentImage
          }
          this.spinner.show()
          this.commentService.getCommentsByImage(obj2).subscribe((resp:any)=>{
          this.spinner.hide()
          console.log(resp)
          if(resp.status==="success"){
              this.commentVal=""
              this.comments=[]
              this.currentImage = resp.image
              for(let i=0;i<resp.comments.length;i++){

                  const dataTime = resp.comments[i].commentedDate.split('T')
                  let timeV2 = dataTime[1]
                  let timeV = moment(timeV2,"HH:mm:ss").format("LT")
                  let arr=moment(dataTime[0]).format('YYYY-MMM-DD').split('-')
                  let commentedDate=arr[1]+" "+arr[2]+" "+arr[0]
                  resp.comments[i]['dateCommented'] = commentedDate;
                  resp.comments[i]['timeCommented'] = timeV
                  // this.comments.push(resp.comments[i])


                if(resp.comments[i].email===this.showEmail){
                  resp.comments[i]['show']="yes"
                }else{
                  resp.comments[i]['show']="no"
                }
                this.comments.push(resp.comments[i])
              }
          }else{
            this.toastr.error(resp.message)
          }
          console.log(this.comments,"commm")
          })
        }else{
          this.toastr.error(resp.message)
        }
      })
    }
 
  }

  // profile photo upload

  profileUploadClick(e:any){
    console.log(e)
    $('#profileupload').modal('show')
  }
  onUploadFileSelect(event:any){
    this.dataImage = event.target.files[0];
  }
  uploadPost(){
    this.spinner.show()
    const formData = new FormData();
    formData.append('image1',this.dataImage);
    formData.append('name',this.showuserName)
    formData.append('imageName',this.dataImage.name)
    formData.append('email',this.showEmail)
    formData.append('type',"profilepicture")
    formData.append('caption',this.uploadImageCaption)
    this.imageService.uploadImage(formData).subscribe((resp:any)=>{
      this.spinner.hide()
      if(resp.status==="success"){
        this.toastr.success(resp.message)
        this.getAllImagesShow()
        $('#profileupload').modal('hide')
        this.uploadImageCaption=''
        this.getLatestProfilePicture()
  
      }else{
        this.toastr.error(resp.message)
      }
    })
  }
  // cover photo upload
  coverUploadClick(e:any){
    $('#coverupload').modal('show')
  }
  onUploadFileSelect2(event:any){
    this.dataImage2 = event.target.files[0];
  }
  uploadCover(){
    this.spinner.show()
    const formData = new FormData();
    formData.append('image1',this.dataImage2);
    formData.append('name',this.showuserName)
    formData.append('imageName',this.dataImage2.name)
    formData.append('email',this.showEmail)
    formData.append('type',"coverphoto")
    formData.append('caption',this.uploadImageCaption)
    this.imageService.uploadImage(formData).subscribe((resp:any)=>{
      this.spinner.hide()
      if(resp.status==="success"){
        this.toastr.success(resp.message)
        this.getAllImagesShow()
        $('#coverupload').modal('hide')
        this.uploadImageCaption=''
        this.getLatestCoverPhoto()
  
      }else{
        this.toastr.error(resp.message)
      }
    })
  }
  deleteImage(e:any,data:any){
    console.log(e,data)
    let obj={
      "image1":data.url.replace("http://localhost:8080/uploads/","")
    }
    this.spinner.show()
    this.imageService.deleteImage(obj).subscribe((resp:any)=>{
      this.spinner.hide()
      if(resp.status==="success"){
        this.toastr.success(resp.message)
        this.getAllImagesShow()
        this.getLatestCoverPhoto()
        this.getLatestProfilePicture()
      }else{
        this.toastr.error(resp.message)
      }
      })
  }
}
