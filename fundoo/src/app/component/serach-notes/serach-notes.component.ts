import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/search.service';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-serach-notes',
  templateUrl: './serach-notes.component.html',
  styleUrls: ['./serach-notes.component.css']
})
export class SerachNotesComponent implements OnInit {
  message : string
  constructor( private data: DataService, private searchService : HttpService ) { }
  public notesArray=[];
  public mytoken=localStorage.getItem("token")
  
  ngOnInit() {
    this.getNotes();
    this.data.currentMessage.subscribe(message => {this.message = message
    console.log(this.message)
    })
    this.getNotes();
  }
  
  getNotes(){
    this.searchService.getnotesdata("/notes/getNotesList", this.mytoken)
    .subscribe((response) =>{
      this.notesArray=[];
      for(var i=0; i<response['data'].data.length; i++){
        if((response["data"].data[i].isDeleted === false) && (response["data"].data[i].isArchived === false)){
        this.notesArray.push(response["data"].data[i])
        }
      }
    },(error) =>{
      console.log(error);
    });
  }
}
