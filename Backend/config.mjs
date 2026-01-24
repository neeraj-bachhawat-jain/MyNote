import dotenv from 'dotenv'
dotenv.config();

let port=process.env.port;
let URI=process.env.mongodb;
let secret_key=process.env.secret_key;
export {port,URI,secret_key};