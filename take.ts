import { interval } from "rxjs";
import { take } from "rxjs/operators";

interval(1000)
  .pipe(
    take(5),
  ).subscribe(v => console.log(v));
