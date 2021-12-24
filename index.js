const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const bodyParser = require("body-parser");

io.on("connection", (socket) => {
  socket.on("message", ({ name, message }) => {
    io.emit("message", { name, message });
  });
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// const router = express.Router();
app.post("/link", (req, res) => {
  console.log(req.body.uri);

  let name = "api";
  let message = req.body.uri;
  io.emit("message", { name, message });

  res.status(200).json({
    status: true,
    message: "Success",
  });
});

http.listen(4000, function () {
  console.log("listening on port 4000");
});
