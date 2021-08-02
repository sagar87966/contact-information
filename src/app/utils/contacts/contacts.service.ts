import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import User from 'src/app/modal/contact.modal';
import { environment } from '../../../environments/environment';
import { catchError, tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(private http: HttpClient, private _snackBar: MatSnackBar) {}
  public getContacts(): Observable<User[]> {
    return this.http.get<User[]>(environment.GET_USER);
  }

  addUser(user: User): Observable<User> {
    return this.http
      .post<User>(environment.POST_USER, user, this.httpOptions)
      .pipe(
        tap((newUser: User) => console.log(newUser)),
        catchError(this.handleError<User>('addUser'))
      );
  }
  updateUser(user: User): Observable<any> {
    return this.http.put(environment.UPDATE_USER, user, this.httpOptions).pipe(
      tap((user: any) => console.log(user)),
      catchError(this.handleError<any>('updateUser'))
    );
  }

  deleteUser(id: number | undefined): Observable<User> {
    const url = `${environment.DELETE_USER}/${id}`;
    return this.http.delete<User>(url, this.httpOptions).pipe(
      tap((user: any) => console.log(user)),
      catchError(this.handleError<User>('deleteUser'))
    );
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
       this._snackBar.open(error, '', { duration: 3000 });
      return of(result as T);
    };
  }
}
