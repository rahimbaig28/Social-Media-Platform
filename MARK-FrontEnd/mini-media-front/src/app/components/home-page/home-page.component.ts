import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { ImageService } from 'src/app/services/image.service';
import { CommentsService } from 'src/app/services/comments.service';
import * as moment from 'moment';
import { LoginService } from 'src/app/services/login.service';
import { data } from 'jquery';
declare var $:any

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  userDetails:any;
  showEmail:any
  showuserName:any
  allImages:any=[]
  comments:any=[]
  currentImage: any;
  commentVal:any;
  uploadImageCaption:any;
  profilePicture: any;
  profileUploadedDate: any;
  dataImage: any;
  constructor(private commentService:CommentsService,private login:LoginService,private toastr: ToastrService, private spinner:NgxSpinnerService,private imageService:ImageService,private auth:AuthService) { }

  ngOnInit(): void {
  
    this.userDetails=this.auth.getLoginDetails()
    this.showEmail=this.userDetails.email
    this.showuserName=this.userDetails.username
    this.getLatestProfilePictureDetails()
    this.getAllImagesShow()
   
  }

  getAllImagesShow(){
    this.spinner.show()
    this.imageService.getAllImages().subscribe((resp:any)=>{
      this.spinner.hide()
      console.log(resp,"respp")

      if(resp.status==="success"){
        let data=resp.data;
        this.allImages=[]
        for(let i=0;i<data.length;i++){
          console.log(data[i],i,"i")
          let url="http://localhost:8080/uploads/"+data[i][0].image1;
          let caption=data[i][0].caption!==undefined?data[i][0].caption:'';
          let arr=moment(data[i][0].pictureUploadedDate).format('YYYY-MMM-DD').split('-')
          let pictureuploadeddate=arr[1]+" "+arr[2]+" "+arr[0]

          const dataTime = data[i][0].pictureUploadedDate.split('T')
          let timeV2 = dataTime[1]
          let timeV = moment(timeV2,"HH:mm:ss").format("LT")
          console.log(arr,"arr")
          let obj={
            url:url,
            caption:caption,
            pictureuploadeddate:pictureuploadeddate,
            username:data[i][1].username,
            pictureuploadedtime:timeV
            // userName:
          }
          this.allImages.push(obj)
        }
        console.log(this.allImages,"alllll")

      }else{
        this.toastr.error(resp.message)

      }
    })
  }

  getLatestProfilePictureDetails(){
    this.spinner.show()
    let obj={
      "email":this.showEmail
    }
    console.log(obj,"profile pic obj")
    this.imageService.getLatestProfilePicture(obj).subscribe((resp:any)=>{
      this.spinner.hide()
      if(resp.status==="success"){
          this.profilePicture="http://localhost:8080/uploads/"+resp.imagePath
          let arr=moment(resp.uploadedData).format('YYYY-MMM-DD').split('-')
          this.profileUploadedDate=arr[1]+" "+arr[2]+" "+arr[0]

          
      }else{
        this.profilePicture="http://localhost:8080/uploads/profile-icon-png-898.png"
        this.profileUploadedDate=""
      }
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
          // console.log(dataTime)
      
          let timeV2 = dataTime[1]
          let timeV = moment(timeV2,"HH:mm:ss").format("LT")
          let arr=moment(dataTime[0]).format('YYYY-MMM-DD').split('-')
          let commentedDate=arr[1]+" "+arr[2]+" "+arr[0]
          resp.comments[i]['dateCommented'] = commentedDate;
          resp.comments[i]['timeCommented'] = timeV
        
          if(resp.comments[i].email===this.showEmail){
            resp.comments[i]['show']="yes"
          }else{
            resp.comments[i]['show']="no"
          }
          this.comments.push(resp.comments[i])
        }
        // if(this.comments.length<=0){
        //   this.toastr.warning("No comments found for this image")
        // }
        console.log(this.comments,"comm")
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
              // console.log(dataTime)
          
              let timeV2 = dataTime[1]
              let timeV = moment(timeV2,"HH:mm:ss").format("LT")
              let arr=moment(dataTime[0]).format('YYYY-MMM-DD').split('-')
              let commentedDate=arr[1]+" "+arr[2]+" "+arr[0]
              resp.comments[i]['dateCommented'] = commentedDate;
              resp.comments[i]['timeCommented'] = timeV
            
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
                // console.log(dataTime)
            
                let timeV2 = dataTime[1]
                let timeV = moment(timeV2,"HH:mm:ss").format("LT")
                let arr=moment(dataTime[0]).format('YYYY-MMM-DD').split('-')
                let commentedDate=arr[1]+" "+arr[2]+" "+arr[0]
                resp.comments[i]['dateCommented'] = commentedDate;
                resp.comments[i]['timeCommented'] = timeV
              
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

readURL(input:any) {
    console.log(input,"input")
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
  formData.append('type',"upload")
  formData.append('caption',this.uploadImageCaption)
  this.imageService.uploadImage(formData).subscribe((resp:any)=>{
    this.spinner.hide()
    if(resp.status==="success"){
      this.toastr.success(resp.message)
      this.getAllImagesShow()

    }else{
      this.toastr.error(resp.message)
    }
  })
}

}
