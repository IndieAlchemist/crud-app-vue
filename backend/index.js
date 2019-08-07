const express = require('express')


const app = express();
app.use(express.json());

const server = app.listen(3030, () => {
    console.log('server is running on port 3030');
});

let employees = [
    {
        id: 1,
        name: "Richard Hendricks",
        email: "richard@piedpiper.com"
    },
    {
        id: 2,
        name: "Bertram Gilfoyle",
        email: "gilfoyle@piedpiper.com"
    },
    {
        id: 3,
        name: "Dinesh Chugtai",
        email: "dinesh@piedpiper.com"
    }
]

app.all('/*', function (req, res, next) {
    // CORS headers
    res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    // Set custom headers for CORS
    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
    if (req.method == 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
});

app.get('/employees', (req, res) => {
    console.log(`Get successful`);
    return res.send(Object.values(employees));
});

app.post('/employees', (req, res) => {
    const lastId = employees.length > 0 ? employees[employees.length - 1].id : 0;
    const id = lastId + 1;
    const newEmployee = { id: id,...req.body };

    employees = [...employees, newEmployee];
    console.log(`Added successful: ${newEmployee}`);
    return res.send(newEmployee);
});

app.put('/employees/:id', (req, res) => {
    employees = employees.map(employee => employee.id ===  parseInt(req.params.id,10) ? req.body : employee);   
    console.log(`Edit successful: ${req.body}`)
    return res.send(req.body);
});

app.delete('/employees/:id', (req, res) => {
    employees = employees.filter(employee => employee.id !== parseInt(req.params.id));
    console.log(`Delete successful`);
    return res.status(200).send("Deleted");
});