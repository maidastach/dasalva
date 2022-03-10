import { Component, OnInit } from '@angular/core';
import { LoadingService } from './Services/Loading/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit
{
  constructor(private loadingService: LoadingService) { }

  errorMsg!: string;
  successMsg!: string;
  loading!: boolean;
  title = 'dasalva';
  
  ngOnInit(): void 
  {
    this.loadingService.errorMsg.subscribe(message => this.errorMsg = message)
    this.loadingService.successMsg.subscribe(message => this.successMsg = message)
    this.loadingService.loading.subscribe(loading => this.loading = loading)
  }
}
