import axios, { AxiosError } from "axios";
import express from "express"

const app = express()

const fetchData = async (count: number) => {
	let totalDrivers = count
	if (totalDrivers > 50) {
		totalDrivers = 50
	} else if (totalDrivers <= 0) {
		totalDrivers = 1
	}
	const latitude = 37.394
	const longitude = 127.110
	const response = await axios({
		url: `https://qa-interview-test.qa.splytech.dev/api/drivers?latitude=${latitude}&longitude=${longitude}&count=${totalDrivers}`,
		method: "GET",
	});
	return { ...response.data, center_point: { latitude, longitude } }
};

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/api/drivers", async (req, res, next) => {
	const { count = 1 } = req.query

	try {
		return res.json({
			data: await fetchData(parseInt(count as string))
		})
	} catch (error) {
		next(error)
	}
})

app.use((err, req, res, next) => {
	if (err instanceof AxiosError) {
		return res.status(err.response?.status).json(err.response?.data)
	}
	console.log(err)
	return res.status(500).json({ message: "Internal Server Error" })
})

app.listen(3000, () => {
	console.log("App is listening on port http://localhost:3000");
});
