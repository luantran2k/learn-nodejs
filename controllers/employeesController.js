const { da } = require("date-fns/locale");

const data = {
    employees: require("../models/employees.json"),
    setEmployees: function (data) {
        this.employees = data;
    },
};

const getAllEmployees = (req, res) => {
    res.json(data.employees);
};

const createEmployee = (req, res) => {
    const newEmployee = {
        id: data.employees[data.employees.length - 1].id + 1 || 1,
        name: req.body.name,
    };

    if (!req.body.name) {
        return res.status(400).json({ message: "name is required" });
    }

    data.setEmployees([...data.employees, newEmployee]);
    res.status(201).json(data.employees);
};

const updateEmployee = (req, res) => {
    const updateEmployee = {
        id: req.body.id,
        name: req.body.name,
    };

    const employees = [...data.employees];
    const needUpdateEmployeeIndex = employees.findIndex(
        (employee) => employee.id == updateEmployee.id
    );
    if (needUpdateEmployeeIndex == -1) {
        return res.json({ message: "Not found employee" });
    }

    employees[needUpdateEmployeeIndex] = updateEmployee;

    data.setEmployees(employees);
    res.json(data.employees);
};

const deleteEmployee = (req, res) => {
    const employees = [...data.employees];
    const needUpdateEmployeeIndex = employees.findIndex(
        (employee) => employee.id == req.body.id
    );
    if (needUpdateEmployeeIndex == -1) {
        return res.json({ message: "Not found employee" });
    }
    employees.splice(needUpdateEmployeeIndex, 1);
    data.setEmployees(employees);
    res.json(data.employees);
};

const getEmployee = (req, res) => {
    const employees = [...data.employees];
    const employee = employees.find((employee) => employee.id == req.params.id);
    if (employee) {
        res.json(employee);
    } else {
        res.json({ message: "employee not found" });
    }
};

module.exports = {
    getAllEmployees,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee,
};
