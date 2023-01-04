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

callbackDemo();


function catchErrorDemoSwallow() {
  getBookResponseFailure().pipe(
    mergeMap(booksResponse => booksResponse.books),
    filter(book => book.year < 1950),
    tap(oldBook => console.log(`Title: ${oldBook.title}`)),
    catchError(err => of({ title: 'We act like its fine', year: 2023 }))
  ).subscribe({
    next: value => console.log(value.title),
    error: error => console.log(`ERROR: ${error}`),
    complete: () => console.log('Complete!'),
  });
}

// catchErrorDemoSwallow();


function catchErrorDemoRetry() {
  let numRetries = 0;

  getBookResponseFailure().pipe(
    mergeMap(booksResponse => booksResponse.books),
    filter(book => book.year < 1950),
    tap(oldBook => console.log(`Title: ${oldBook.title}`)),
    catchError((err, caught) => {
      if (numRetries++ < 3) {
        console.log('Retrying...')
        return caught;
      }
      throw err;
    })
  ).subscribe({
    next: value => console.log(value.title),
    error: error => console.log(`ERROR: ${error}`),
    complete: () => console.log('Complete!'),
  });
}

// catchErrorDemoRetry();


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

// catchErrorDemoModifyError()
