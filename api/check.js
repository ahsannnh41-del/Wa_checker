export default async function handler(req, res) {

    if(req.method !== "POST"){
        return res.status(405).json({error:"POST only"});
    }

    try{

        const {numbers} = req.body;

        if(!numbers || numbers.length === 0){
            return res.status(400).json({error:"No numbers provided"});
        }

        const results = await Promise.all(

            numbers.map(async (num)=>{

                try{

                    const response = await fetch(
                        `https://api.maytapi.com/api/6c9a3a02-bf25-485f-9b86-70283df4ca46/132538/screen?token=${process.env.MAYTAPI_TOKEN}&phone=${num}`
                    );

                    const data = await response.json();

                    return {
                        number:num,
                        status:data.success ? "✅ Active" : "❌ Not WhatsApp"
                    };

                }catch{
                    return {
                        number:num,
                        status:"⚠️ Error"
                    };
                }

            })
        );

        res.status(200).json(results);

    }catch(err){

        res.status(500).json({
            error:"Server Error",
            message:err.message
        });
    }
    }
