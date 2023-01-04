import { from } from "rxjs";
import { filter, map, toArray } from "rxjs/operators";

const nums$ = from([-2, -1, 0, 1, 2]);

const observer = {
  next: (v: number[]) => console.log('val:', v),
  error: (err: any) => console.log('err:', err),
  complete: () => console.log('Complete!'),
};

nums$.pipe(
  filter(n => n > 0),
  map(positiveNum => positiveNum * 3),
  toArray()
).subscribe(observer);
