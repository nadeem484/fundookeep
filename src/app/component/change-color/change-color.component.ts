import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-change-color',
  templateUrl: './change-color.component.html',
  styleUrls: ['./change-color.component.css']
})
export class ChangeColorComponent implements OnInit {

  @Output() 
  colorClick = new EventEmitter(); //creatintg eventEmitter object here.

  constructor(private colorService:HttpService) { }
  public mytoken=localStorage.getItem('token');  //getting token from local storage.
  @Input() Notesid

  ngOnInit() {
  }
  /**
   * 
   * @param str in this function we are calling changed color api
   */
  changeColor(str){

    if(this.Notesid){
    
      var noteid=[];
      noteid.push(this.Notesid)
      var body = {
        "color": str,
        "noteIdList":noteid
      }
      this.colorService.setColor("notes/changesColorNotes", body, this.mytoken).subscribe(response=>{
        console.log("color changed sucessfully")
        this.colorClick.emit({})
      },error=>{
        console.log("failed to changed color");
        
      })
    }
    else{
      console.log("else.....");
      this.colorClick.emit({str})
    }
    }

  

}
