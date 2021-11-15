import { Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DialogDataType, DialogTypes} from './dialog-data-type';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent{

  public dialogTypesClass = DialogTypes;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogDataType) { }


}
