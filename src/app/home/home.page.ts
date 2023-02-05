import { ViewChild, ElementRef, Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @ViewChild('canvas', { static: true }) canvas: ElementRef | undefined;

  constructor() { }

  ngAfterViewInit() {
    let context = this.canvas?.nativeElement.getContext('2d');
  }

}
