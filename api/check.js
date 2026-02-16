export default async function handler(req, res) {

if(req.method !== "POST"){
return res.status(405).json({error:"POST only"});
}

try{

const {numbers} = req.body;

const active=[];
const inactive=[];
const banned=[];

await Promise.all(

numbers.map(async num=>{

try{

const response = await fetch(
`https://api.maytapi.com/api/6c9a3a02-bf25-485f-9b86-70283df4ca46/132538/screen?token=${process.env.MAYTAPI_TOKEN}&phone=${num}`
);

const data = await response.json();

if(data?.success){
active.push(num);
}
else if(data?.message?.toLowerCase().includes("banned")){
banned.push(num);
}
else{
inactive.push(num);
}

}catch{
inactive.push(num);
}

})

);

res.status(200).json({
active,
inactive,
banned
});

}catch(err){

res.status(500).json({
error:"server crash",
message:err.message
});

}
            }
