import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-passercommandedialog-component',
  templateUrl: './passercommandedialog-component.component.html',
  styleUrls: ['./passercommandedialog-component.component.scss']
})
export class PassercommandedialogComponentComponent implements OnInit {

  nom:String;
  prenom:String;
  address:String;
  email:String;
  tel:String;
  constructor(public dialogRef: MatDialogRef<PassercommandedialogComponentComponent>) { }

  ngOnInit(): void {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
