const express = require("express");
const contactsRouter = require("./app/routes/contact.route");
const ApiError = require("./app/api-eror");
const app = express();
const ContactService = require("../services/contact.service");
const MongoDB = require("../utils/mongodb.util");
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to contact book application." });
});
app.use("/api/contacts", contactsRouter);
// handle 404 response
app.use((req, res, next) => {
  // Code ở đây sẽ chạy khi không có route được định nghĩa nào
  // khớp với yêu cầu. Gọi next() để chuyển sang middleware xử lý lỗi
  return next(new ApiError(404, "Resoure not found"));
});

// define eror-handling middleware last, after other app.use() and routes calls
app.use((err, req, res, next) => {
  // Middleware xử lý lỗi tập trung.
  // Trong các đoạn code xử lý ở các route, gọi next(error) sẽ chuyển về middleware xử lý lỗi này
  return res.status(error.statusCode || 500).json({
    message: error.message || "Internal Server Error",
  });
});
module.exports = app;
