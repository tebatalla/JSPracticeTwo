var reader = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});


function addNumbers(sum, numsLeft, completionCallback) {
  if (numsLeft > 0) {
    reader.question("Give a number ", function(ans) {
      sum += parseInt(ans);
      console.log(sum);
      addNumbers(sum, numsLeft -1, completionCallback);
    })
  }
  if (numsLeft === 0) {
    completionCallback(sum);
    reader.close();
  }
}

addNumbers(0, 3, function (sum) {
  console.log("Total Sum: " + sum);
});
