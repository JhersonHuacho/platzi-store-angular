import { Component, Input, OnInit, Output, EventEmitter, OnChanges, AfterViewInit, OnDestroy, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {

  img: string = '';
  //@Input() img = '';
  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('img')
  set changeImg(newImg: string) {
    this.img = newImg;
    console.log('ImgComponent => Input => changeImg => change just img');
    // code
  }
  @Input() alt = '';
  @Output() loaded = new EventEmitter<string>();

  imageDefault = './assets/images/default.png';
  counter = 0;
  counterFn: number | undefined;

  constructor() {
    // before render - once time
    console.log('ImgComponent => constructor', 'imgValue => ', this.img);
    // no correr cosas ayncronas (peticiones http)
  }

  ngOnChanges(changes: SimpleChanges): void {
    // before and during render
    // changes inputs -- times (cada vez que se actualiza un valor)
    console.log('ImgComponent => ngOnChanges', 'imgValue => ', this.img);
    console.log('changes', changes);
  }

  ngOnInit(): void {
    // before render
    // podemos correr cosas ayncronas - fetch - once time
    console.log('ImgComponent => ngOnInit', 'imgValue => ', this.img);
    this.counterFn = window.setInterval(() => {
      this.counter += 1;
      console.log('run counter')
    }, 1000);
  }

  ngAfterViewInit(): void {
    // after render
    // handler children
    // las directivas corren con un AfterViewInit
    console.log('ImgComponent => ngAfterViewInit', 'imgValue => ', this.img);
  }

  ngOnDestroy(): void {
    // delete component
    console.log('ImgComponent => ngOnDestroy', 'imgValue => ', this.img);
    window.clearInterval(this.counterFn);
  }

  imgError() {
    this.img = this.imageDefault;
  }

  imgLoaded() {
    console.log("log hijo");
    this.loaded.emit(this.img);
  }
}
