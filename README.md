# RxJS Brownbag Presentation and Demo

## Setup

### Installation
1. Install dependencies:  
`npm i`
2. Install `ts-node` globally:  
`npm i -g ts-node`

### Run a TypeScript file
From the root directory of this repo, run: `ts-node [filename]`

### Using this Repo for Learning
To gain a foundation in RxJS Observables, I recommend doing the following (in order). Each file listed below has links to the new RxJS methods and operators that first appear in that file:
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
The JavaScript implementation of the [Reactive Extensions API](https://reactivex.io): "an API for asynchronous programming with observable streams". 

"Obervable streams" refer to streams designed to follow the [observer pattern](https://en.wikipedia.org/wiki/Observer_pattern). RxJS provides an API that leverages both the observable pattern (for example, a `next` callback) and the iterator pattern (for example, methods mirroring those on the Array prototype).

Useful for controlling the reactive flow of data into your application. For example: 
 - A response returned from an AJAX call  
 - A user clicking or typing in a UI  
 - To control the number of parallel API requests a program makes  

Written in TypeScript, so there's no need to install any additional typings packages.

Some big players rely heavily on RxJS (Angular, for example).

## Problems RxJS helps us solve
In JavaScript, there are severasl common ways to handle incoming data. Which one you use will depend on the situation:
 - callback functions
 - promises
 - event handlers
 - loops
 - variable assignment

RxJS helps you deal with disparate data sources and the various ways they might be processed by giving you a single, clean API to handle all of them. At the heart of this API is the "[Observable](https://rxjs.dev/guide/observable)" data type, which lets you observe the data flowing in, and then react to it using a clearly defined set of functions.

In particular, RxJS provides a better asynchronous API - more unified than using a combination of callbacks, promises, async/await. RxJS also implicitly handles multiple values delivered gradually over time, which callbacks, promises, and async/await will not do without additional clever programming.

## The Observer Pattern
 - An object called a "subject" produces values and notifies other objects who are interested in the values. 
 - The objects interested in the values produced by the subject are called "observers".  
 - The subject keeps a list of observers who have "subscribed" to the subject. 
 - The subject pushes values to its subscribed observers, each of whom reacts by executing code specific to itself.  

### Observer Pattern in RxJS
 - In most use cases, the subject only pushes values to a single observer. 
   - In fact, the Observable data type is like a traditional "subject" that can only push values to a single observer. If you need to push to multiple observers, see "Subjects" below.  
 - To register an observer to receive the values from an observable, call the `subscribe` method on the Observable. The Observable's `subscribe` method accepts one or more callback functions from the observer, which it will call in the following situations:  
   - `next`: The Observable will call the observer's `next` method to pass it a new value.  
   - `error`: If an error ocurrs, the Observable will inform the observer by calling the `error` method.
   - `complete`: The Observable will call the observer's `complete` method when it has successfully completed sending values.  

## Operators
Operators are used to modify an Observable mid-stream without unwrapping it. Once you have an Observable, you can apply operators to the values it produces to shape them into exactly what you need.

Operators are functions that manipulate the data produced by an Observable and return a new Observable. Returning a new Observable lets you chain operators together.

RxJS provides > 100 operators out of the box, and also allows you to write your own.

Useful resources:
 - List of [all operators](https://rxjs.dev/guide/operators)  
 - [Operator decision tree](https://rxjs.dev/operator-decision-tree) to help you find the right operator(s) for your use case.  
 - Creating [custom operators](https://rxjs.dev/operator-decision-tree).

### Categories of operators:
 - **Transformation** operators return an Observable that is fundamentally different from the source Observable. The produced values often have a different shape than those produced by the source.
 - **Filtering** operators produce a subset of the values produced by the source Observable.
 - **Combination** operators allow you to combine 2 or more Observables in various ways.
 - **Utility** operators allow you to control how or when Observables are produced, often without changing what values are produced.
 - **Conditional** operators will produce a value if some supplied condition is met (can be similar to filtering operators).
 - **Aggregate** operators look at all the values taht would be produced, and produce a single aggregate value (min, max, count, etc.)
 - **Multicasting** operators are specific to Subjects.

## Subjects
While Observables can only push data to a single observer (singlecast),
[Subjects](https://rxjs.dev/guide/subject) can push data to multiple observers (multicast). RxJS includes operators that make it easy to multicast data.

## Schedulers
A [Scheduler](https://rxjs.dev/guide/scheduler) controls when a subscription starts and when notifications are delivered. You generally will only require schedulers when you need fine grained control over when your Observables are executed.

Types of schedulers:
 - `queueScheduler`: Causes an Observable to execute synchronously (blocking).
 - `asyncScheduler`: Causes an Observable to execute assynchronously, using JavaScript's `setInterval` function.
 - `asapScheduler`: Executes your Observable on the microtask queue.
