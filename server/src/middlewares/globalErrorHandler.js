export const errorHandler = (err, req, res, next) => {
	console.error("Error caught:", err);
	res.status(err.statusCode || 500).json({
		success: false,
		message: err.message || "Internal Server Error",
	});
};
