// import { ConnectionService } from './connection.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  Component,
  OnInit,
  HostListener,
  Output,
  EventEmitter,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import User from 'src/app/modal/contact.modal';
import { ContactsService } from 'src/app/utils/contacts/contacts.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss'],
})
export class AddContactComponent implements OnInit, OnChanges {
  contactForm: FormGroup;
  disabledSubmitButton: boolean = true;
  optionsSelect: any;
  edit: boolean = false;

  @HostListener('input') oninput() {
    if (this.contactForm.valid) {
      this.disabledSubmitButton = false;
    }
  }
  @Output() onUserAdd = new EventEmitter<any>();
  @Input() userData: User | undefined;

  constructor(
    fb: FormBuilder,
    private contactService: ContactsService,
    private _snackBar: MatSnackBar
  ) {
    this.contactForm = fb.group({
      firstname: [
        '',
        [
          Validators.required,
          Validators.min(3),
          Validators.max(25),
          Validators.pattern('[a-zA-Z0-9]{3,25}'),
        ],
      ],
      lastname: [
        '',
        [
          Validators.required,
          Validators.min(3),
          Validators.max(25),
          Validators.pattern('[a-zA-Z0-9]{3,25}'),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('[0-9 ]{10}')]],
      status: [false],
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.userData && Object.keys(this.userData)) {
      (this.userData.status = this.userData.status === 'active' ? true : false),
        this.contactForm.patchValue(this.userData);
      this.edit = true;
    }
  }

  cancel() {
    this.contactForm.reset();
    this.disabledSubmitButton = true;
    this.onUserAdd.emit(true);
  }

  ngOnInit() {}

  onSubmit() {
    this.contactForm.patchValue({
      status: this.contactForm.value.status === true ? 'active' : 'inactive',
    });
    if (!this.edit) {
      this.contactService.addUser(this.contactForm.value).subscribe(
        () => {
          this._snackBar.open('Contact Saved!!!', '', { duration: 3000 });
          this.cancel();
        },
        (error: any) => {
          console.log('Error', error);
        }
      );
    } else {
      this.contactForm.value.id = this.userData?.id;
      this.contactService.updateUser(this.contactForm.value).subscribe(
        () => {
          this._snackBar.open('Contact Updated!!!', '', { duration: 3000 });
          this.contactForm.reset();
          this.edit = false;
          this.onUserAdd.emit(true);
        },
        (error: any) => {
          console.log('Error', error);
        }
      );
    }
  }
}
