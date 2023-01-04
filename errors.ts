import { from, of, Observable, throwError } from "rxjs";
import { filter, mergeMap, tap, catchError } from "rxjs/operators";

type BookResponse = {
  books: {
    title: string,
    year: number,
  }[]
}

function getBookResponseFailure(): Observable<BookResponse> {
  return from(Promise.reject('Dang!'));
}

function callbackDemo() {
  getBookResponseFailure().pipe(
    mergeMap(booksResponse => booksResponse.books),
    filter(book => book.year < 1950),
    tap(oldBook => console.log(`Title: ${oldBook.title}`)),
  ).subscribe({
    next: value => console.log(value.title),
    error: error => console.log(`ERROR: ${error}`),
    complete: () => console.log('Complete!'),
  });
}

function catchErrorDemoSwallow() {
  getBookResponseFailure().pipe(
    mergeMap(booksResponse => booksResponse.books),
    filter(book => book.year < 1950),
    tap(oldBook => console.log(`Title: ${oldBook.title}`)),
    catchError(err => of({ title: 'We act like its fine', year: 2022 }))
  ).subscribe({
    next: value => console.log(value.title),
    error: error => console.log(`ERROR: ${error}`),
    complete: () => console.log('Complete!'),
  });
}

function catchErrorDemoRetry() {
  getBookResponseFailure().pipe(
    mergeMap(booksResponse => booksResponse.books),
    filter(book => book.year < 1950),
    tap(oldBook => console.log(`Title: ${oldBook.title}`)),
    catchError((err, caught) => caught)
  ).subscribe({
    next: value => console.log(value.title),
    error: error => console.log(`ERROR: ${error}`),
    complete: () => console.log('Complete!'),
  });
}

function catchErrorDemoModifyError() {
  getBookResponseFailure().pipe(
    mergeMap(booksResponse => booksResponse.books),
    filter(book => book.year < 1950),
    tap(oldBook => console.log(`Title: ${oldBook.title}`)),
    catchError(err => { throw `Something bad happened - ${err}` }),
  ).subscribe({
    next: value => console.log(value.title),
    error: error => console.log(`ERROR: ${error}`),
    complete: () => console.log('Complete!'),
  });
}

callbackDemo();
// catchErrorDemoSwallow();
// catchErrorDemoRetry();
// catchErrorDemoModifyError()
