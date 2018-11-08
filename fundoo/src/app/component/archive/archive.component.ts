import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent implements OnInit {

  @Input() Notesid //getting notesid from app-notes-component
  @Output() archiveClick = new EventEmitter(); //creatintg eventEmitter object here.
  constructor(private archiveService:HttpService) { }
  public mytoken = localStorage.getItem('token') //getting token from local storage.
  public archiveList=[]

  ngOnInit() {
    // this.getArchiveNotes();
  }

  /**
   * @description calling archived api here
   */
  archiveNotes(){

    var noteid=[];
    noteid.push(this.Notesid)         //adding notesid into empty array
    var body = {
      "isArchived":true,
      "noteIdList":noteid
    }
    this.archiveService.notesArchive("notes/archiveNotes", body, this.mytoken).subscribe(response=>{
      console.log("archive sucessfully")
      this.archiveClick.emit({})
    },error=>{
      console.log("failed to archiving");
    })
  }

}
