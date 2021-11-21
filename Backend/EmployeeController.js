const express = require('express');
var cors = require('cors');
var uuid = require('uuid');
const { employee } = require('./Models/Employee');
const app = express();
var corsOptions = {
	origin: ['https://host.nxt.blackbaud.com', 'https://localhost:8000'],
	optionsSuccessStatus: 200
};
app.use(express.json());
app.use(cors(corsOptions));
//adding middleware
const employees = [
	new employee(1, 'A', new Date(2018, 11, 24), 32, [
		'Java',
		'Spring',
		'Hibernate',
		'SpringBoot',
		'OOPs'
	]),
	new employee(2, 'B', new Date(2020, 01, 12), 24, [
		'C#',
		'.Net',
		'.Net Core',
		'Angular',
		'Sql Server'
	]),
	new employee(3, 'C', new Date(2021, 10, 02), 14, [
		'NodeJs',
		'Express',
		'Angular',
		'MongoDB'
	])
];

app.get('/', (req, res) => {
	res.send('Hello World There');
});
app.get('/api/employees', (req, res) => {
	res.send(employees);
});
app.get('/api/employees/:id', (req, res) => {
	const employee = employees.find((c) => c.id === parseInt(req.params.id));
	if (!employee) res.status(404).send('Not Found');
	res.status(200).send(employee);
});
app.post('/api/employees', (req, res) => {
	const employee = {
		//id: req.body.id,
		id: uuid.v4(),
		name: req.body.name,
		dateOfJoining: req.body.dateOfJoining,
		experience: req.body.experience,
		skills: req.body.skills
	};
	employees.push(employee);
	res.send(employee);
});

app.put('/api/employees', (req, res) => {
	const updatedEmployee = new employee(
		//id: req.body.id,
		req.body.id,
		req.body.name,
		req.body.dateOfJoining,
		req.body.experience,
		req.body.skills
	);
	var matchedEmployee = false;
	employees.forEach((emp, index, arr) => {
		if (emp.id == updatedEmployee.id) {
			arr[index] = updatedEmployee;
			matchedEmployee = true;
		}
	});
	if (!matchedEmployee)
		res.status(400).send(`No employee found with id ' + $id`);

	res.send({ data: 'edited successfully' });
});

app.delete('/api/employees/:id', (req, res) => {
	const employee = employees.find((c) => c.id.toString() === req.params.id);
	if (!employee) {
		res.status(404).send('Not Found!');
	} else {
		const index = employees.indexOf(employee);
		employees.splice(index, 1);

		res.send(employee);
	}
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening ${port}.....`));
// app.post()
// app.put()
// app.delete()
