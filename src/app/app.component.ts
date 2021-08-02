import { Component, Input, Output, EventEmitter } from '@angular/core';
import User from './modal/contact.modal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  addContactToggle: boolean = false;

  @Output() show: any = new EventEmitter();

  addContact() {
    this.addContactToggle = true;
  }

  changeState(event: any) {
    this.addContactToggle = false;
  }
}
