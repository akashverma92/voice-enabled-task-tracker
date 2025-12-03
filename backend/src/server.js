
import {cors} from "cors";
import {express} from "express";
dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Default Route
app.get("/", (req, res) => {
  res.send("Voice Enabled Task Tracker Backend Running...");
});

// Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
