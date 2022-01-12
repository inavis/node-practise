//inbuilt package available

const os = require('os');

console.log("OS version",os.version())
console.log("Free Memory / Unused RAM",os.freemem())
console.log("Total Memory (RAM)",os.totalmem())
console.log("Free mememory in %",(os.freemem()/os.totalmem()*100).toFixed(2));
console.log("CPU",os.cpus())