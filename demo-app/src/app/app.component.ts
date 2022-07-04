import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ngx password validator';
  options = {
    placement: 'bottom',
    theme: 'pro',
    'custom-class': 'custom-class',
  };
}
