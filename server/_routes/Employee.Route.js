// Importing important packages
const express = require('express');

// Using express and routes
const app = express();
const employeeRoute = express.Router();

// Employee module which is required and imported
let employeeModel = require('../_model/Employee');

// To Get List Of Employees
employeeRoute.route('/').get(function (req, res) {
  employeeModel.find(function (err, employee) {
    if (err) {
      console.log(err);
    } else {
      res.json(employee);
    }
  });
});

// To Add New Employee
employeeRoute.route('/addEmployee').post(function (req, res, next) {

  let employee = new employeeModel(req.body);

  employee.save()
    .then(game => {
      res.status(200).json({
        'employee': 'Employee Added Successfully'
      });
    })
    .catch(err => {
      res.status(400).send("Something Went Wrong");
    });
});

// To Get Employee Details By Employee ID
employeeRoute.route('/editEmployee/:id').get(function (req, res, next) {

  let id = req.params.id;

  employeeModel.findById(id, function (err, employee) {
    res.json(employee);
  });
});

// To Update The Employee Details
employeeRoute.route('/updateEmployee/:id').post(function (req, res, next) {

  employeeModel.findById(req.params.id, function (err, employee) {
    if (!employee) {
      return next(new Error('Unable To Find Employee With This Id'));
    } else {
      employee.firstName = req.body.firstName;
      employee.lastName = req.body.lastName;
      employee.email = req.body.email;
      employee.phone = req.body.phone;

      employee.save().then(emp => {
          res.json('Employee Updated Successfully');
        })
        .catch(err => {
          res.status(400).send("Unable To Update Employee");
        });
    }
  });
});

// To Delete The Employee
employeeRoute.route('/deleteEmployee/:id').get(function (req, res, next) {
  employeeModel.findByIdAndRemove({
    id: req.params.id
  }, function (err, employee) {
    if (err) res.json(err);
    else res.json('Employee Deleted Successfully');
  });

//   .delete("/:id", async (req, res) => {
//     try {
//         const id = req?.params?.id;
//         const query = { _id: new mongodb.ObjectId(id) };
//         const result = await collections.employees.deleteOne(query);

//         if (result && result.deletedCount) {
//             res.status(202).send(`Removed an employee: ID ${id}`);
//         } else if (!result) {
//             res.status(400).send(`Failed to remove an employee: ID ${id}`);
//         } else if (!result.deletedCount) {
//             res.status(404).send(`Failed to find an employee: ID ${id}`);
//         }
//     } catch (error) {
//         console.error(error.message);
//         res.status(400).send(error.message);
//     }
//  });

  // .delete(req.params.id)
  //       .then(() => res.json({ message: 'Employee deleted successfully' }))
  //       .catch(next);
});

module.exports = employeeRoute;
