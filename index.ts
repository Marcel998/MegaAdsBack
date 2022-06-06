import express, {json, Router} from "express";
import cors from 'cors';
import 'express-async-errors';
import {handleError} from "./utils/errors";
import rateLimit from 'express-rate-limit';
import {adRouter} from "./routers/ad.router";
import {config} from "./config/config";

const app = express();

//z jakiego miejsca nasza aplikacja frontendowa może się kontaktować z backendem (w przypadku produkcji będą to zmienne)
app.use(cors({
    origin: config.corsOrigin,
}));

//rozkodowanie jsona przy kontaktowaniu się frontendu z backendem
app.use(json());
app.use(rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
}));


// Routes...
const router = Router();

router.use("/ad", adRouter);

app.use('/api', router);

// app.get('/', async (req, res) => {
//     throw new ValidationError('Daaamn!');
// });
app.use(handleError);

app.listen(3001, '0.0.0.0', () => {
    console.log('Listening on port http://localhost:3001');
});