import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import User from 'src/app/modal/contact.modal';
import { ContactsService } from 'src/app/utils/contacts/contacts.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
})
export class ContactListComponent implements OnInit, OnChanges {
  contactList: Array<User> = [];

  @Output() onContactPick = new EventEmitter<User>();
  @Input() renderContacts: boolean | undefined;
  @Output() toggle = new EventEmitter<boolean>();

  addContactToggle: boolean = false;
  detailsPageToggle: boolean = false;
  selectedUser: User | undefined;
  user: User | undefined;
  isRender: boolean = false;

  constructor(
    private contactService: ContactsService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnChanges(): void {
    if (this.renderContacts) {
      this.user = undefined;
      this.detailsPageToggle = false;
      this.addContactToggle = true;
    }
  }

  ngOnInit(): void {
    this.getContacts();
  }

  updateUserList(update: boolean) {
    this.getContacts();
    this.toggle.emit(true);
    this.addContactToggle = false;
    this.detailsPageToggle = false;
  }

  updateUser(user: User) {
    this.user = user;
    this.detailsPageToggle = false;
    this.addContactToggle = true;
  }

  addContact(): void {
    this.user=undefined;
    this.addContactToggle = true;
    this.detailsPageToggle = false;
    this.selectedUser = undefined;
  }

  getContacts() {
    this.contactService.getContacts().subscribe((contactList: Array<User>) => {
      this.contactList = contactList ? contactList : [];
    });
  }

  getDetails(user: User): void {
    this.addContactToggle = false;
    this.detailsPageToggle = true;
    this.toggle.emit(true);
    this.onContactPick.emit(user);
    this.selectedUser = user;
  }

  deleteUser(event: any, id: number | undefined) {
    event.stopPropagation();
    this.contactService.deleteUser(id).subscribe((ele) => {
      this._snackBar.open('User is deleted!!!', '', { duration: 3000 });
      this.getContacts();
    });
  }

  toggleStatus(event: any, user: User) {
    event.stopPropagation();
    console.log('status', event);
    user.status = user?.status == 'active' ? 'inactive' : 'active';
    this.contactService.updateUser(user).subscribe(
      (response) => {
        this.getContacts();
        this._snackBar.open(`User is ${user.status}`, '', { duration: 3000 });
      },
      (error: any) => {
        console.log('Error', error);
      }
    );
  }
}
