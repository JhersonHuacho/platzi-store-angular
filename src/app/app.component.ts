import { Component, OnInit } from '@angular/core';
import { elementAt } from 'rxjs/operators';
import { Product } from './models/product.model';
import { AuthService } from './services/auth.service';
import { FilesService } from './services/files.service';
import { TokenService } from './services/token.service';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  imgParent = 'https://source.unsplash.com/random';
  showImg = true;
  imgRta = '';

  constructor(
    private usersService: UsersService,
    private filesService: FilesService,
    private authService: AuthService,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    const token = this.tokenService.getToken();

    if (token) {
      this.authService.getProfile().subscribe();
    }
  }

  onLoaded(img: string) {
    console.log('log padre => ', img);
  }

  toggleImg() {
    this.showImg = !this.showImg;
  }

  createUser() {
    this.usersService.create({
      name: 'sebas',
      email: 'sebas@mail.com',
      password: '1212',
      role: 'customer'
    }).subscribe(response => {
      console.log(response);
    });
  }

  downloadPdf() {
    //this.filesService.getFile('my.pdf', './assets/files/texto.txt')
    // this.filesService.getFile('my.pdf', 'https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf', 'application/pdf')
    this.filesService.getFile('my.pdf', 'https://young-sands-07814.herokuapp.com/api/files/dummy.pdf', 'application/pdf')
      .subscribe();
  }

  onUpload(event: Event) {
    const element = event.target as HTMLInputElement;
    const file = element.files?.item(0);
    if (file) {
      this.filesService.uploadFile(file).subscribe(rta => {
        this.imgRta = rta.location;
      });
    }
  }
}
