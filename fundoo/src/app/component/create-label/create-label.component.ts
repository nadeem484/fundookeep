import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../../services/http.service';
// ..............................................................
import { MatDialogRef } from '@angular/material';
import { NavbarComponent } from '../navbar/navbar.component';
// ..............................................................

@Component({
  selector: 'app-create-label',
  templateUrl: './create-label.component.html',
  styleUrls: ['./create-label.component.css']
})
export class CreateLabelComponent implements OnInit {

  @Output() updateClick = new EventEmitter<any>();
  constructor( public dialogRef : MatDialogRef<NavbarComponent>, 
  private noteAddService : HttpService, private updateService:HttpService) { }
  public ListOfLabel;
  public labelNameList;
  public label_id;
  public mytoken=localStorage.getItem('token');
  public id = localStorage.getItem('userid')

  ngOnInit() {
    this.labelshow();
  }

  labeladd(){
    // var label = labelName.innerHTML
    var label=document.getElementById("labelName").innerHTML;
    var body = {
      "label": label,
      "isDeleted": false,
      "userId":this.id
    }
    this.noteAddService.labelAddpostData("/noteLabels",body, this.mytoken)
    .subscribe((response) =>{
      console.log("success.......",response);
      console.log(response);
      
    },(error) => {
      console.log("failed");
    });
    this.dialogRef.close();

  }

  

  labelshow(){
    this.noteAddService.getnotesdata("/noteLabels/getNoteLabelList",this.mytoken)
    .subscribe((response) =>{
      this.labelNameList=[];

      for(var i=0;i<response["data"].details.length;i++){
        if(response["data"].details[i].isDeleted == false){
        this.labelNameList.push(response["data"].details[i].label);
        }
      }
      console.log("label list.......",this.labelNameList);
      this.labelNameList.sort();
      this.ListOfLabel=response["data"].details;
      return;
    },(error) => {
      console.log("failed");
      console.log(error);
    });
    
  }
  find(selectedLabel){
    for(var i=0;i<this.ListOfLabel.length;i++){
      if(selectedLabel==this.ListOfLabel[i].label){
        this.label_id=this.ListOfLabel[i].id;
      }
    }
  }

  
    labeldelete(deleteLabel){
    for(var i=0;i<this.ListOfLabel.length;i++){
      if(deleteLabel==this.ListOfLabel[i].label){
        this.label_id=this.ListOfLabel[i].id;
      }
    }
    this.noteAddService.deleteDate("/noteLabels/"+this.label_id+"/deleteNoteLabel")
    .subscribe((response) =>{
      this.labelshow();
     console.log(response);
    },(error) => {
      console.log(error);
    });
  }
// ...............................
labelUpdate(labl, aa){
  
  console.log("inside  update label.................");
  
  // var label=document.getElementById("labelName").innerHTML;
  this.find(labl);
  var label=aa.innerHTML;
  console.log("label......",label);
  console.log("id.....",this.label_id);
  
  
  var body = {
    "label": label,
  }
  this.updateService.labelAddpostData("/noteLabels/"+this.label_id+"/updateNoteLabel",body, this.mytoken)
  .subscribe(response=>{
    console.log("sucess........");
    console.log(response);
    this.labelshow();
    this.updateClick.emit({})
  },
  (error)=>{
    console.log("error");
    
  }
)
}



}
