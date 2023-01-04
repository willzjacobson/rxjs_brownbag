import { of } from "rxjs";
import { filter, mergeMap, tap } from "rxjs/operators";

const booksAjaxResponse$ = of({
  headers: 'where your face goes',
  status: 200,
  books: [{
    year: 1849, title: 'The gold we strike',
  }, {
    year: 1942, title: 'The wars we fight',
  }, {
    year: 1951, title: 'The fridges we buy',
  }, {
    year: 2020, title: 'The ills we catch',
  }]
});

booksAjaxResponse$.pipe(
  mergeMap(booksResponse => booksResponse.books),
  filter(book => book.year < 1950),
  tap(oldBook => console.log(`Title: ${oldBook.title}`)),
).subscribe(
  finalValue => console.log(finalValue)
);
