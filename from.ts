import { from } from "rxjs";

// Converting an array to an Observable
function arrayDemo() {
  const bookArray = [{ id: 1 }, { id: 2 }, { id: 3 }];
  const bookObservable$ = from(bookArray);

  bookObservable$.subscribe({
    next: (value) => console.log(value),
    error: (err) => console.log(`Had an error:, ${err}`),
    complete: () => console.log('Complete!'),
  });
}

arrayDemo();


// -=-=- Convert Promises to observables

// Resolved Promise
function resolvedPromiseDemo() {
  const resolvedPromise = Promise.resolve('Value');

  const resolvedPromiseObservable$ = from(resolvedPromise);

  resolvedPromiseObservable$.subscribe({
    next: (value) => console.log(value),
    error: (err) => console.log(`Had an error:, ${err}`),
    complete: () => console.log('Complete!'),
  });
}

// resolvedPromiseDemo();


// Rejected Promise
function rejectedPromiseDemo() {
  const rejectedPromise = Promise.reject('Dang!');

  const rejectedPromiseObservable$ = from(rejectedPromise);

  rejectedPromiseObservable$.subscribe({
    next: (value) => console.log(value),
    error: (err) => console.log(`Had an error: ${err}`),
    complete: () => console.log('Complete!'),
  });
}

// rejectedPromiseDemo();