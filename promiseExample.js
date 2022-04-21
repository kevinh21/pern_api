// https://www.youtube.com/watch?v=DHvZLI7Db8E
//   and
// https://www.pluralsight.com/guides/executing-promises-in-a-react-component

// Promise objects take a function with two values - resolve, reject and the
// execution is asynchronous, meaning it can return results out of order, but
// guarantees a result.  Either resolve or reject and can have a timer.

let num = new Promise((resolve, reject) => {
  let a = 1 + 1;
  if (a == 2) {
    resolve("Success");
  } else {
    reject("Failed");
  }
});

num
  .then((message) => {
    console.log("Put a value or operation of some sort here" + message);
  })
  .catch((message) => {
    console.log("Error message gets passed in here:" + message);
  });
