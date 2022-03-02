import { Component } from '@angular/core';
import { LoadingService } from './Shared/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Axcs';
  loading = this.loader.loading;
  constructor(public loader: LoadingService){

  }
}
