import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  public list = [];
  public idlist = [];
  constructor(private adddata: HttpService) { }

  @Input() arrayy
  public cardColor = "#FFFFFF";
  public hidecard: boolean = false;
  public hidenote: boolean = true;

  public mytoken = localStorage.getItem('token')
  public id = localStorage.getItem("userid")

  //making object of event emmiter
  @Output() CloseClick = new EventEmitter();

  ngOnInit() {

  }

  newlist() {
    this.hidecard = true;
    this.hidenote = false;
  }

  /**
   * @description note add function
   * @param title 
   * @param description 
   */
  noteAdd(title, description) {

    console.log(title.innerHTML);
    console.log(description.innerHTML);
    console.log("inside noteadd.............");

    if (title.innerHTML === "" && description.innerHTML === "") {
      return true;
    }
    for (var i = 0; i < this.list.length; i++) {
      this.idlist.push(this.list[i].id)
    }
    var body = {
      "title": title.innerHTML,
      "description": description.innerHTML,
      "isPined": false,
      "labelIdList": JSON.stringify(this.idlist)
    }
    this.adddata.AddNotes("/notes/addNotes", body, this.mytoken
    ).subscribe(response => {
      console.log("data sucessfully send");

      this.CloseClick.emit(true);
      this.list = [];
    }), error => {
      console.log("failed");
    }
  }

  onColor(event) {
    if (event) {
      this.cardColor = event.str;
      console.log("Event happened");
    }

  }

  // .......................................
  chipupdate(event) {

    if (this.list.indexOf(event) >= 0) {
      this.list.splice(this.list.indexOf(event), 1)
    }
    else if (this.list.indexOf(event) < 0) {
      this.list.push(event)
    }
  }
  // .................................

}

