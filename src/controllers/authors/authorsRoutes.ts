import express from 'express';
import {getAuthorsByName} from "./getAuthorsByName/getAuthorsByName";

const authorsRoutes = express.Router();

authorsRoutes.get('/:name', getAuthorsByName);

export default authorsRoutes;
