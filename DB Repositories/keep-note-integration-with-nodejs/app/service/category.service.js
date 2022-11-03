const categoryDAO = require('../dao/category.dao')

/* Create and Save a new Category by calling categoryDAO create method.
   Depending on the return value, it should return the results or the error message*/
exports.create = (newCategory, done) => {
  categoryDAO.create(newCategory, done);
};

/* Retrieve all categories by calling categoryDAO getAll method.
 Depending on the return value, it should return the results or the error message*/
exports.getAll = (done) => {
  categoryDAO.getAll(done);
};

/* Find a single Category by Id by calling categoryDAO findById method.
Depending on the return value, it should return the results or the error message*/
exports.findById = (id, done) => {
  categoryDAO.findById(id, done);
};

/* Update a Category identified by the id by calling categoryDAO updateById method.
Depending on the return value, it should return the results or the error message*/
exports.updateById = (id, category, done) => {
  categoryDAO.updateById(id, category, done);
};

/* Delete a Category with the specified id by calling categoryDAO remove method.
Depending on the return value, it should return the results or the error message*/
exports.remove = (id, done) => {
  categoryDAO.remove(id, done);
};

/* Delete all Categories by calling categoryDAO removeAll method.
Depending on the return value, it should return the results or the error message*/
exports.removeAll = (done) => {
  categoryDAO.removeAll(done);
};
