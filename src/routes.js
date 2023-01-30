import { Database } from './database.js';
import { randomUUID } from 'node:crypto';

const database = new Database();

export const routes = [
    {
        method: 'GET',
        path: '/users',
        handler: (req, res) => {
            const users = database.select('users')

            return res
                    .writeHead(200)
                    .end(JSON.stringify(users));            
        }
    },
    {
        method: 'POST',
        path: '/users',
        handler: (req, res) => {
            const {name, email} = req.body;

            users = {
                id: randomUUID(),
                name: name,
                email: email
            }
    
            database.insert('users', users);
    
            return res
                    .writeHead(201)
                    .end(JSON.stringify(users));                  
        }
    },
    {
        method: 'DELETE',
        path: '/users/:id',
        handler: (req, res) => {
            const users = database.select('users')

            return res
                    .writeHead(200)
                    .end(JSON.stringify(users));            
        }
    },        
]