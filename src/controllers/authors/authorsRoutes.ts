import express from 'express';
import {getAuthors} from "./getAuthors/getAuthors";

const authorsRoutes = express.Router();

authorsRoutes.get('/', getAuthors);

export default authorsRoutes;
