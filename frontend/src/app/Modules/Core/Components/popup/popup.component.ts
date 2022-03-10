import { Component, Input, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/Services/Loading/loading.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent 
{
  @Input('errorMsg') errorMsg!: string;
  @Input('successMsg') successMsg!: string;
  
  constructor() { }

}
