import { interval } from "rxjs";
import { take } from "rxjs/operators";

// Use pipe if you want to apply one or more operators to the data coming out of the observable.
// The pipe function will apply all the operators inside the call and return a new observable
// that produces the resulting set of values, which you can then subscribe to.
interval(1000)
  .pipe(
    take(5),
  ).subscribe(v => console.log(v));
