class Employee {
	constructor(EmployeeId, Name, DOJ, Experience, Skills) {
		this.id = EmployeeId;
		this.name = Name;
		this.dateOfJoining = DOJ;
		this.experience = Experience;
		this.skills = Skills;
	}
}
module.exports.employee = Employee;
