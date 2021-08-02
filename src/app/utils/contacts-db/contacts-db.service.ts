import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import User from 'src/app/modal/contact.modal';

@Injectable({
  providedIn: 'root'
})
export class ContactsDbService implements InMemoryDbService {

  constructor() { }
  createDb() {
    const contacts = [
      {
        id:1,
        "firstname": "Ned",
        "lastname": "Stark",
        "phone": "1234567890",
        "email": "abc@gmail.com",
        "status": "active"
      },
      {
        id:2,
        "firstname": "Theon",
        "lastname": "tedGreyjoyt",
        "phone": "1234567890",
        "email": "abc@gmail.com",
        "status": "active"
      },
      {
        id:3,
        "firstname": "Samwell",
        "lastname": "Tarly",
        "phone": "1234567890",
        "email": "abc@gmail.com",
        "status": "active"
      },
      {
        id:4,
        "firstname": "Jon",
        "lastname": "Snow",
        "phone": "1234567890",
        "email": "abc@gmail.com",
        "status": "inactive"
      },
      {
        id:5,
        "firstname": "Arya",
        "lastname": "Stark",
        "phone": "1234567890",
        "email": "abc@gmail.com",
         "status": "inactive"
      },
      {
        id:6,
        "firstname": "Jora",
        "lastname": "Mormont",
        "phone": "1234567890",
        "email": "abc@gmail.com",
        "status": "active"
      },
      {
        id:7,
        "firstname": "Tyrion",
        "lastname": "Lannister",
        "phone": "1234567890",
        "email": "abc@gmail.com",
        "status": "active"
      },
      {
        id:8,
        "firstname": "Stannis",
        "lastname": "Baratheon",
        "phone": "1234567890",
        "email": "abc@gmail.com",
        "status": "inactive"
      },
      {
        id:9,
        "firstname": "Hodor",
        "lastname": "ted",
        "phone": "1234567890",
        "email": "abc@gmail.com",
        "status": "inactive"
      },
      {
        id:10,
        "firstname": "Margaery",
        "lastname": "Tyrell",
        "email": "abc@gmail.com",
        "phone": "1234567890",
        "status": "inactive"
      },
      {
        id:11,
        "firstname": "Brienne",
        "lastname": "Tarth",
        "email": "abc@gmail.com",
        "phone": "1234567890",
        "status": "inactive"
      },
      {
        id:12,
        "firstname": "Petyr",
        "lastname": "Baelish",
        "email": "abc@gmail.com",
        "phone": "1234567890",
        "status": "active"
      }
    ];
    return {contacts};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the contacts array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(contacts: User[]): number {
    return contacts.length > 0 ? Math.max(...contacts.map((user:User|any) => user.id)) + 1 : 11;
  }
}
