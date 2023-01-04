import { from } from "rxjs";
import { filter, map, toArray } from "rxjs/operators";

const nums$ = from([-2, -1, 0, 1, 2]);

const observer1 = {
  next: (v: number[]) => console.log('val:', v),
  error: (err: any) => console.log('err:', err),
  complete: () => console.log('Complete!'),
};

// Use pipe if you want to apply one or more operators to the data coming out of the observable.
// The pipe function will apply all the operators inside the call and return a new observable
// that produces the resulting set of values, which you can then subscribe to.
// In this case, the observer will only receive the values 1 and 2.
nums$.pipe(
  filter(n => n > 0),
  map(positiveNum => positiveNum * 3),
  toArray()
).subscribe(observer1);
