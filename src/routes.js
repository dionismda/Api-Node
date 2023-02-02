import { Database } from './database.js';
import { randomUUID } from 'node:crypto';
import { buildRoutePath } from './utils/build-route-path.js';

const database = new Database();

export const routes = [
    {
        method: 'GET',
        path: buildRoutePath('/users'),
        handler: (req, res) => {

            const users = database.select('users', req.query)

            return res
                    .writeHead(200)
                    .end(JSON.stringify(users));            
        }
    },
    {
        method: 'POST',
        path: buildRoutePath('/users'),
        handler: (req, res) => {
            const {name, email} = req.body;

            const users = {
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
        method: 'PUT',
        path: buildRoutePath('/users/:id'),
        handler: (req, res) => {
            const { id}  = req.params
            const {name, email} = req.body

            database.update('users', id, {
                name,
                email
            })

            return res
                    .writeHead(200)
                    .end();            
        }
    },    
    {
        method: 'DELETE',
        path: buildRoutePath('/users/:id'),
        handler: (req, res) => {

            const { id}  = req.params

            database.delete('users', id)

            return res
                    .writeHead(204)
                    .end();            
        }
    }     
]