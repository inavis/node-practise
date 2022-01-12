//inbuilt package
const fs = require("fs");

// fs.readFile("./awesome.txt",(err,data)=>{
//     //get hexadecimal representation of file in Buffer
//     console.log(data)
// })

//specifying format utf-80> encoding so that it can understand emojis,other language characters
// fs.readFile("./awesome.txt","utf-8",(err,data)=>{
//     console.log(data)
// })

//create files of any fomat .txt,.html,.mp4
// const content ="CReating new file";
// fs.writeFile("./cool.txt",content,(err)=>{
//     //once operation done like a confirmation message
//     console.log("completed writing")
// })

// const quote2=` Dream more worry less`;
// fs.appendFile(`./awesome.txt`,quote,(err)=>{
//     console.log(`Completed adding data`)
// })


//files into backup folder
const quote = "Live more, worry less";
const [,,totalfiles] = process.argv
for(let i=1;i<=totalfiles;i++){
    fs.writeFile(`./backup/text-${i}.html`,quote,(err)=>{
        console.log(`Completed writing ${i}`)
    })
}



fs.readdir("./backup",(err,data)=>{
    console.log(data)
    for(file of data){
        fs.unlink(`./backup/${file}`,(err)=>{
            console.log("deleted file")
        })
    }
})
