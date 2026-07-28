import { Router } from "express";
import mssql from "mssql";

const queryRouter = Router();

type queryResult = {
	success: boolean;
	data?: unknown[];
	error?: string;
};

const config = {
	user: "test_db",
	password: "NIn1zu1vQkDjNpVcprd8",
	server: "10.0.70.10",
	database: "TEST",
	options: {
		enableArithAbort: true,
		rejectUnauthorized: false,
		trustServerCertificate: true,
	},
};

async function query(queryString: string): Promise<queryResult> {
	let pool: mssql.ConnectionPool | null = null;

	try {
		pool = await new mssql.ConnectionPool(config).connect();

		const request = pool.request();

		const result = await request.query(queryString);

		return { success: true, data: result.recordset };
	} catch (err) {
		return { success: false, error: `Database query error: ${err}` };
	} finally {
		if (pool) {
			await pool.close();
		}
	}
}

queryRouter.post("/", async (req, res) => {
	const { queryString } = req.body;

	const result = await query(queryString);

	res.json(result);
});

export { queryRouter };