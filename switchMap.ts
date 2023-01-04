import { of, switchMap, interval, map } from 'rxjs';

// SwitchMap cancels the old request and replaces it with the new one automatically.
// SwitchMap will fire once for each number,
// but will only give us the most recent letter each time it fires.

function demo1() {
  const letters$ = of('a', 'b', 'c');
  const seconds$ = interval(1000);

  const strings$ = letters$.pipe(
    switchMap(x =>
      seconds$
        .pipe(
          map(i => `Letter: ${x} | Seconds: ${i}`)
        )
    )
  );

  strings$.subscribe(x => console.log(x));
}

demo1();