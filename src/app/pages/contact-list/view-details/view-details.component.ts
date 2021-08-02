import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import User from 'src/app/modal/contact.modal';

@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.component.html',
  styleUrls: ['./view-details.component.scss'],
})
export class ViewDetailsComponent implements OnInit {
  constructor() {}

  @Output() editUser = new EventEmitter<User>();
  @Input() showDetails: User | undefined;

  ngOnInit(): void {}

  onEdit(user: User | undefined) {
    this.editUser.emit(user);
  }
}
