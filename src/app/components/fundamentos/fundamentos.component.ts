import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/product.model';

@Component({
  selector: 'app-fundamentos',
  templateUrl: './fundamentos.component.html',
  styleUrls: ['./fundamentos.component.scss']
})
export class FundamentosComponent {

  // String interpolation
  title = 'my-store';
  name = 'Nicolas';
  age = 18;
  img = 'https://source.unsplash.com/random';

  // Property Binding
  btnDisabled = true;
  person = {
    name: 'Francisco',
    age: 18,
    avatar:'https://source.unsplash.com/random'
  }
  // estructuras de control
  names: string[] = ['Nico', 'Juli', 'Santi'];
  newName = '';
  products: Product[] = [
    {
      name: 'EL mejor juguete',
      price: 565,
      image: './assets/images/toy.jpg',
      category: 'all',
    },
    {
      name: 'Bicicleta casi nueva',
      price: 356,
      image: './assets/images/bike.jpg'
    },
    {
      name: 'Colleción de albumnes',
      price: 34,
      image: './assets/images/album.jpg'
    },
    {
      name: 'Mis libros',
      price: 23,
      image: './assets/images/books.jpg'
    },
    {
      name: 'Casa para perro',
      price: 34,
      image: './assets/images/house.jpg'
    },
    {
      name: 'Gafas',
      price: 3434,
      image: './assets/images/glasses.jpg'
    }
  ]

  widthImage = 10;

  box = {
    width: 10,
    height: 100,
    background: 'red'
  }

  register = {
    name: '',
    email: '',
    password: ''
  }
  // Event

  toggleButton() {
    this.btnDisabled = !this.btnDisabled;
  }
  clickAge() {
    this.age += 1;
  }

  onScroll(event: Event) {
    const element = event.target as HTMLElement;
    console.log(element.scrollTop);
  }

  changeName(event: Event) {
    const element = event.target as HTMLInputElement;
    this.person.name = element.value;
  }

  addname() {
    this.names.push(this.newName);
    this.newName = '';
  }

  deleteName(index: number) {
    this.names.splice(index, 1);
  }

  onRegister() {
    console.log(this.register);
  }

}
