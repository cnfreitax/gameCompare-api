import http from 'http'
import Routes from './routes.js'

const routes = new Routes()
export const app = http.createServer(routes.handler.bind(routes))
