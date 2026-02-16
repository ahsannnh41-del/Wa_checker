import axios from "axios";

export default async function handler(req, res) {

    if (req.method !== "POST") {
        return res.status(405).json({ error: "Use POST request" });
    }

    const { numbers } = req.body;

    if (!numbers || !Array.isArray(numbers)) {
        return res.status(400).json({ error: "Send numbers array" });
    }

    const results = [];

    for (let num of numbers) {
        try {

            const url = `https://api.maytapi.com/api/6c9a3a02-bf25-485f-9b86-70283df4ca46/132538/screen?token=0f0a1a3a-1d57-4a6e-be61-e6fa129cff60&phone=${num}`;

            const response = await axios.get(url);

            results.push({
                number: num,
                status: response.data?.success ? "Active" : "Inactive"
            });

        } catch (err) {
            results.push({
                number: num,
                status: "Error"
            });
        }
    }

    res.json(results);
}
