import { Component, OnInit } from '@angular/core';
import { UploadService } from '../upload.service';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-fileupload',
  templateUrl: './fileupload.component.html',
  styleUrls: ['./fileupload.component.css']
})
export class FileuploadComponent implements OnInit {

  title = 'materialApp';
  color = 'primary';
  mode = 'determinate';
  value = 0;
  file : File
  constructor( private uploadService:UploadService) { }

  ngOnInit(): void {
  }

  public selectFile(event:any){
    console.log(event)
    this.file= event.target.files[0]
  }
  public upload(){
    let fd = new FormData()
    fd.append('file', this.file)
    this.uploadService.upload(fd).subscribe(

      (event)=>{
        console.log (event)

        if (event.type===HttpEventType.UploadProgress){
          let progress = Math.round(event.loaded/event.total*100)
          console.log (progress)
          this.value=progress
        }
        else if (event.type===HttpEventType.Response){

        }

      },

      (err) => {
        console.log (err)
      }
    )

  }

}
