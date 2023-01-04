import { from } from 'rxjs';
import { toArray, mergeMap } from 'rxjs/operators'

/**
 * @description batchAsyncActions executes an async callback on each element of the input array.
 * It uses Observables a la rjxs to limit parallel calls to the specified maximum.
 * @params dataIn: array of objects of type `TIn`.
 * @params cb: An async callback that performs an operation against each element of `dataIn`,
 * and returns something that implements `TOut`.
 * @params numMaxConcurrentCalls: The maximum number of `cb` calls that can be in progress simultaneously.
 * @returns Promise for an array of all the objects returned by `cb`
 */
export async function batchAsyncActions<TIn, TOut>(
  dataIn: TIn[],
  cb: (dataIn: TIn) => Promise<TOut>,
  numMaxConcurrentCalls: number,
): Promise<TOut[]> {
  // We're using observables under the hood, but returning a Promise
  return new Promise((resolve, reject) => {
    // Create Observable from TIn[]
    const usersObservable = from(dataIn);

    // Must use `pipe` any time we want to use operators (such as `mergeMap`)
    return usersObservable.pipe(
      // Call `cb` on each `TIn`,
      // with a maximum of `numMaxConcurrentCalls` `cb` calls allowed to be in flight simultaneously
      mergeMap((datumIn) => cb(datumIn), numMaxConcurrentCalls),
      // Wait for all the results of the `cb` calls to be compiled, then return them as an array
      toArray(),
    ).subscribe({
      // `next` function will only fire when all `cb` calls are complete, due to the use of `toArray`
      next: dataOut => resolve(dataOut),
      // if any `cb` call fails, `error` function will be called on the resulting error
      error: (err) => reject(err),
    });
  })
}


// -=-=-=- Tests

async function testSuccess(numMaxConcurrentCalls: number) {
  const dataIn = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const cb = async (n: number) => new Promise((res, rej) => {
    setTimeout(() => {
      const toReturn = n + 1;
      console.log('returning:', toReturn);
      return res(toReturn);
    }, 1000)
  })

  const out = await batchAsyncActions(dataIn, cb, numMaxConcurrentCalls)

  console.log("Result:", out)
};

async function testFailure() {
  const dataIn = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const errMsg = 'Dang';
  const cb = async () => Promise.reject(new Error(errMsg));

  try {
    await batchAsyncActions(dataIn, cb, 5)
  } catch (err) {
    console.log('Error:', (err as Error).message);
  }
};

testSuccess(1);
// testSuccess(2);
// testSuccess(5);
// testSuccess(10);

// testFailure();