const connection  = require('./db');

var sql = connection.connect((err) => {
    if(err) throw err;
    console.log('successful connection to mySQL');
  });

/* constructor to initialize category with category_name, category_description
and category_creation_date as its properties
*/
const Category = (category) => {
  this.category_name = category.category_name,
  this.category_description  = category.category_description;
  this.category_creation_date = category.category_creation_date;
}

/*
  create should be a function that calls the query function on sql object
  to persist category data in MySQL notesdb schema using insert query
*/
Category.create = (newCategory, result) => {
  sql.query("INSERT INTO category SET ?", newCategory, (err, res) => {
    if(err) {
      console.log('error: ', err);
      result(err, null);
    } else {
      console.log('Category created: ', { id: res.insertId, ...newCategory });
      result(null, { id: res.insertId, ...newCategory });
    }
  });
};

/*
  findById should be a function that calls the query function on sql object
  to fetch the category by the provided Id from the notesdb schema using select query
*/
Category.findById = (id, result) => {
  let txt =
      'SELECT a.* ' +
         'FROM category AS a ' +
         `WHERE a.category_id = ${id}`;
   sql.query(txt, (err, res) => {
     if(err) {
       console.log('error: ', err);
       result(err, null);
     } else {
       if(res.length) {
         console.log('Category found: ', res);
         result(null, res);
       } else {
         result({ error: `category ${id} not found`}, null);
       }
     }
   });
};

/*
  getAll should be a function that calls the query function on sql object
  to fetch all the categories or categories with specific name from the notesdb
  schema using select query
*/
Category.getAll = (result) => {
  let txt =
  'SELECT a.* FROM category AS a'
   sql.query(txt, (err, res) => {
     if(err) {
       console.log('error: ', err);
       result(err, null);
     } else {
       if(res.length) {
         console.log('Categories: ', res);
         result(null, res);
       } else {
         result({ error: 'there are no categories' }, null);
       }
     }
   });
};

/*
  updateById should be a function that calls query function on sql object
  to update the category for the given id from the notesdb schema using update query
*/
Category.updateById = (id, category, result) => {
  let txt =
      'UPDATE category SET category_name = ?, category_decription = ?, category_creation_date = ? ' +
        'WHERE category_id = ?'
  let v = [ note.category_name,
            note.category_decription,
            note.category_creation_date,
            id ];
  sql.query(txt, v, (err, res) => {
    if(err) {
      console.log('error: ', err);
      result(err, null);
    } else {
      if(res.affectedRows === 0) {
        result({ error: `category_id ${id} not found` }, null);
      } else {
        console.log('Updated category: ', { id: id, ...category });
        result(null, { id: id, ...category });
      }
    }
  });
};

/*
  remove should be a function that calls query function on sql object
  to delete the category for the given id from the notesdb schema using delete query
*/
Category.remove = (id, result) => {
  let txt = 'DELETE FROM category WHERE category_id = ?';
  sql.query(txt, id, (err, res) => {
    if(err) {
      console.log('error: ', err);
      result(err, null);
    } else {
      if(res.affectedRows === 0) {
        result({ error: `category_id ${id} not found` }, null);
      } else {
        console.log('Deleted category with id: ', id);
        result(null, res);
      }
    }
  });
};

/*
  removeAll should be a function that calls query function on sql object
  to delete all the categories from the notesdb schema using delete query
*/
Category.removeAll = result => {
  sql.query('DELETE FROM category', (err, res) => {
    if(err) {
      console.log('error: ', err);
      result(err, null);
    } else {
      console.log(`Deleted ${res.affectedRows} categories`);
      result(null, res);
    }
  });
};

module.exports = Category;
