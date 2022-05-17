import express, {json} from "express";
import cors from 'cors';
import 'express-async-errors';
import {handleError, ValidationError} from "./utils/errors";

const app = express();

//z jakiego miejsca nasza aplikacja frontendowa może się kontaktować z backendem (w przypadku produkcji będą to zmienne)
app.use(cors({
    origin: 'http://localhost:3000',
}));

//rozkodowanie jsona przy kontaktowaniu się frontendu z backendem
app.use(json());

// Routes...
// app.get('/', async (req, res) => {
//     throw new ValidationError('Daaamn!');
// });
app.use(handleError);

app.listen(3001, '0.0.0.0', ()=>{
    console.log('Listening on port http://localhost:3001');
});