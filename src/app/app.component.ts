import { Component } from '@angular/core';
import { Product } from './models/product.model';
import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  imgParent = 'https://source.unsplash.com/random';
  showImg = true;
  token = '';

  constructor(private authService: AuthService, private usersService: UsersService){}

  onLoaded(img: string) {
    console.log('log padre => ', img);
  }

  toggleImg() {
    this.showImg = !this.showImg;
  }

  createUser() {
    this.usersService.create({
      name: 'sebas',
      email: 'seba@email.com',
      password: '123456'
    }).subscribe(response => {
      console.log(response);
    });
  }

  login() {
    this.authService.login('seba@email.com', '123456').subscribe(response => {
      console.log(response.access_token);
      this.token = response.access_token;
    });
  }

  getProfile() {
    this.authService.profile(this.token).subscribe(profile => {
      console.log(profile);
    });
  }
}
