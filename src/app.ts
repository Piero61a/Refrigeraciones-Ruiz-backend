import express, { Express } from "express";
import employeesRoutes from "./routes/employees.routes"
import authRoutes from "./routes/auth.routes"
import toolsRoutes from "./routes/tools.routes"
import servicesRoutes from "./routes/services.routes"
import cors from "cors"

const app: Express = express();

app.use(express.json());

app.use(cors());

app.use(employeesRoutes)
app.use(authRoutes)
app.use(toolsRoutes)
app.use(servicesRoutes)

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.options('*', (req, res) => {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.status(200).send();
});


app.use((req, res) => {
    res.status(404).json({
        msg: "Route not found"
    })
})

export default app;