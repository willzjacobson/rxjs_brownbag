import { of, mergeMap, interval, map } from 'rxjs';

const letters$ = of('a', 'b', 'c');
const seconds$ = interval(1000);

const strings$ = letters$.pipe(
  mergeMap(x =>
    seconds$
      .pipe(
        map(i => `Letter: ${x} | Seconds: ${i}`)
      ),
    // 2
  )
);

strings$.subscribe(x => console.log(x));
