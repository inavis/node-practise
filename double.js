const double = (n)=> n*2;
console.log(process.argv[2])

const [path1,path2,variable]= process.argv
console.log(double(variable));