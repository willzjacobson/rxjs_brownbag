import { interval } from "rxjs";

const numbers$ = interval(1000);

numbers$.subscribe(v => console.log(v));
