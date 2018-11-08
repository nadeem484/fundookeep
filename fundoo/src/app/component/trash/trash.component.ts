import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.css']
})
export class TrashComponent implements OnInit {

  constructor( private trashService : HttpService ) { }
  public mytoken=localStorage.getItem("token");
  public trashList=[];

  ngOnInit() {
    this.getTrashList()
  }

  onChange(event){
    if(event){
      this.getTrashList()
    }
  }

  getTrashList(){
    this.trashService.getnotesdata("/notes/getTrashNotesList",this.mytoken)
    .subscribe((response) =>{
      this.trashList=[];
      for(var i=0; i<response['data'].data.length; i++)
      {
        this.trashList.push(response['data'].data[i])
      }
      console.log("trashlist", this.trashList);
      
    },(error) =>{
      console.log(error);
    });
  }

}
