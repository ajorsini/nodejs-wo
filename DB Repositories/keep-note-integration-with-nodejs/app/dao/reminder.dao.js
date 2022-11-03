const connection = require('./db');

var sql = connection.connect((err) => {
    if(err) throw err;
    console.log('successful connection to mySQL');
  });

/* constructor to initialize reminder with reminder_name, reminder_description and
reminder_creation_date as its properties*/

const Reminder = (reminder) => {
  this.reminder_name = reminder.reminder_name;
  this.reminder_description = reminder.reminder_description;
  this.reminder_creation_date = reminder.reminder_creation_date;
};

/*
  create should be a function that calls the query function on sql object
  to persist reminder data in MySQL notesdb schema using insert query
*/
Reminder.create = (newReminder, result) => {
  sql.query("INSERT INTO reminder SET ?", newReminder, (err, res) => {
    if(err) {
      console.log('error: ', err);
      result(err, null);
    } else {
      console.log('Reminder created: ', { id: res.insertId, ...newReminder });
      result(null, { id: res.insertId, ...newReminder });
    }
  });
};

/*
  findById should be a function that calls the query function on sql object
  to fetch the reminder by the provided Id from the notesdb schema using select query
*/
Reminder.findById = (id, result) => {
  let txt =
      'SELECT a.* ' +
         'FROM reminder AS a ' +
         `WHERE a.reminder_id = ${id}`;
   sql.query(txt, (err, res) => {
     if(err) {
       console.log('error: ', err);
       result(err, null);
     } else {
       if(res.length) {
         console.log('Reminder found: ', res);
         result(null, res);
       } else {
         result({ error: `reminder ${id} not found`}, null);
       }
     }
   });
};

/*
  getAll should be a function that calls the query function on sql object
  to fetch all the reminders or reminders with specific title from the notesdb
  schema using select query
*/
Reminder.getAll = (result) => {
  let txt = 'SELECT * FROM reminder'
   sql.query(txt, (err, res) => {
     if(err) {
       console.log('error: ', err);
       result(err, null);
     } else {
       if(res.length) {
         console.log('Reminders: ', res);
         result(null, res);
       } else {
         result({ error: 'there are no reminders' }, null);
       }
     }
   });
};

/*
  updateById should be a function that calls query function on sql object
  to update the reminder for the given id from the notesdb schema using update query
*/
Reminder.updateById = (id, category, result) => {
  let txt =
      'UPDATE reminder SET reminder_name = ?, reminder_decription = ?, reminder_creation_date = ? ' +
        'WHERE category_id = ?'
  let v = [ reminder.category_name,
            reminder.category_decription,
            reminder.category_creation_date,
            id ];
  sql.query(txt, v, (err, res) => {
    if(err) {
      console.log('error: ', err);
      result(err, null);
    } else {
      if(res.affectedRows === 0) {
        result({ error: `reminder_id ${id} not found` }, null);
      } else {
        console.log('Updated reminder: ', { id: id, ...reminder });
        result(null, { id: id, ...reminder });
      }
    }
  });
};

/*
  remove should be a function that calls query function on sql object
  to delete the reminder for the given id from the notesdb schema using delete query
*/
Reminder.remove = (id, result) => {
  let txt = 'DELETE FROM reminder WHERE reminder_id = ?';
  sql.query(txt, id, (err, res) => {
    if(err) {
      console.log('error: ', err);
      result(err, null);
    } else {
      if(res.affectedRows === 0) {
        result({ error: `reminder_id ${id} not found` }, null);
      } else {
        console.log('Deleted reminder with id: ', id);
        result(null, res);
      }
    }
  });
};
/*
  removeAll should be a function that calls query function on sql object
  to delete all the reminders from the notesdb schema using delete query
*/
Reminder.removeAll = result => {
  sql.query('DELETE FROM reminder', (err, res) => {
    if(err) {
      console.log('error: ', err);
      result(err, null);
    } else {
      console.log(`Deleted ${res.affectedRows} reminders`);
      result(null, res);
    }
  });
};

module.exports = Reminder;
