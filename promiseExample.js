https://www.youtube.com/watch?v=DHvZLI7Db8E

// Promise objects take a function with two values - resolve, reject
let num = new Promise((resolve, reject) => {
  let a = 1 + 1;
  if (a == 2) {
    resolve("Success");
  } else {
    reject("Failed");
  }
});

num.then((message) =>{
 console.log("Put a value or operation of some sort here" + message)
}).catch((message) =>{
    console.log('Error message gets passed in here:' + message)
})

