# RxJS Brownbag Presentation and Demo

## Setup

### Installation
1. Install dependencies:  
`npm i`
2. Install `ts-node` globally:  
`npm i -g ts-node`

### Run a file
From the root directory of this repo, run: `ts-node [filename]`

### Using this Repo for Learning
I recommend doing the following, in order. Each file listed below has links to the new RxJS methods and operators that first appear in that file:
1. Read down to but not including the `operators` section
2. Read and run these code files (in order):
 - `from.ts` | [from](https://rxjs.dev/api/index/function/from)
 - `interval.ts` | [interval](https://rxjs.dev/api/index/function/interval)
3. Read the `operators` section
4. Read and run the rest of the TypeScript files in this order:
 - `take.ts` | [take](https://rxjs.dev/api/operators/take)
 - `chained_operators_1.ts` | [filter](https://rxjs.dev/api/operators/filter), [map](https://rxjs.dev/api/operators/map)
 - `toArray.ts` | [toArray](https://rxjs.dev/api/operators/toArray)
 - `mergeMap.ts` | [mergeMap](https://rxjs.dev/api/operators/mergeMap)
 - `chained_operators_2.ts` | [tap](https://rxjs.dev/api/index/function/tap)
 - `errors` | [catchError](https://rxjs.dev/api/operators/catchError)
 - `batchAsyncActions`
 - Optional: `switchMap.ts` | [switchMap](https://rxjs.dev/api/operators/switchMap)
5. Optional: Read the rest of the README.

## What is RxJS?
The JavaScript imlpementation of the [Reactive Extensions API](https://reactivex.io): "an API for asynchronous programming with observable streams". 

"Obervable streams" refer to streams designed to follow the [observer pattern](https://en.wikipedia.org/wiki/Observer_pattern).

Useful for controlling the reactive flow of data into your application.
Combines the observable pattern and the iterator pattern.

Written in TypeScript, so no need to install any additional typings packages.

Some big players rely heavily on RxJS (Angular, for example).

## Problems RxJS helps us solve
Common ways of handling incoming data (agnostic to the source):
 - callback functions
 - promises
 - event handlers
 - loops
 - variable assignment

RxJS helps you deal with disparate data sources and the various ways they might be processed by giving you a single, clean API to handle all of them. At the heart of this API is the "[Observable](https://rxjs.dev/guide/observable)" data type, which lets you observe the data flowing in, and then react to it using a clearly defined set of functions.

Provides a better asynchronous API. More unified than using a combination of callbacks, promises, async/await. Implicitly handles multiple values delivered gradually over time.

### The Observer Pattern
Have an object called a "subject" that produces values and notify other objects (called "observers") who are interested in the values. 
The subject keeps a list of observers. The subject pushes values to the observers, each of who reacts by executing code specific to that observer.

More commonly, the subject actually pushes values to a single observer. 
Register an observer to receive the values from an observable by calling the `subscribe` method on the observable. The observer that should receive the values is passed as a parameter to the subscribe method. The observer sends values (and a couple other methods) to the observer by calling methods on the observer object itself. It calls the next method to send it a new value. 
if an error ocurrs, it can inform the observer by calling the `error` method. 
It informs the observer it is done sending values by calling the `complete` method.
In RxJS, you implement the `next`, `error`, and `complete` methods on the Observer.

## Operators
Operators are used to modify an observable mid-stream without unwrapping it. Once you have an observable, you can apply operators to the values it produces to shape them into exactly what you need.

Operators are functions that manipulate the data produced by an observable and return a new observable. Returning a new observable lets you chain operators together.

RxJS provides > 100 operators out of the box, and also allows you to write your own.

Useful resources:
 - List of [all operators](https://rxjs.dev/guide/operators)  
 - [Operator decision tree](https://rxjs.dev/operator-decision-tree) to help you find the right operator(s) for your use case.  
 - Creating [custom operators](https://rxjs.dev/operator-decision-tree).

### Categories of operators:
 - **Transformation** operators return an observable that is fundamentally different from the source observable. The produced values often have a different shape than those produced by the source.
 - **Filtering** operators produce a subset of the values produced by the source observable.
 - **Combination** operators allow you to combine 2 or more observables in various ways.
 - **Utility** operators allow you to control how or when observables are produced, often without changing what values are produced.
 - **Conditional** operators will produce a value if some supplied condition is met (can be similar to filtering operators).
 - **Aggregate** operators look at all the values taht would be produced, and produce a single aggregate value (min, max, count, etc.)
 - **Multicasting** operators are specific to Subjects.

## Subjects
While Observables can only push data to a single observer (singlecast),
[Subjects](https://rxjs.dev/guide/subject) can push data to multiple observers (multicast). RxJS includes operators that make it easy to multicast data.

## Schedulers
A [Scheduler](https://rxjs.dev/guide/scheduler) controls when a subscription starts and when notifications are delivered. You generally will only require schedulers when you need fine grained control over when your observables are executed.

Types of schedulers:
 - `queueScheduler`: Causes an observable to execute synchronously (blocking).
 - `asyncScheduler`: Causes an observable to execute assynchronously, using JavaScript's `setInterval` function.
 - `asapScheduler`: Executes your observable on the microtask queue.
