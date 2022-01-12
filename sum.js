const sum = (a,b)=> parseInt(a)+parseInt(b);
const [,,num1,num2]=process.argv;
console.log(sum(num1,num2));