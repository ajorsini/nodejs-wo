const connection  = require('./db');

/*
variable to store connection object to perform CRUD operations using connection module
*/
var sql = connection.connect((err) => {
    if(err) throw err;
    console.log('successful connection to mySQL');
  });


// note constructor
const Note = (note) => {
  this.note_title = note.note_title;
  this.note_content = note.note_content;
  this.note_status = note.note_status;
  this.note_creation_date = note.note_creation_date;
  this.category_id = note.category_id;
  this.reminder_id = note.reminder_id
};

// Create
Note.create = (newNote, result) => {
  sql.query("INSERT INTO note SET ?", newNote, (err, res) => {
    if(err) {
      console.log('error: ', err);
      result(err, null);
    } else {
      console.log('Note created: ', { id: res.insertId, ...newNote });
      result(null, { id: res.insertId, ...newNote });
    }
  });
};


/*
  findById should be a function that calls the query function on sql object
  to fetch the note by the provided Id from the notesdb schema using select query.
  Join queries should be used to join Note, NoteCategory and NoteReminder tables
*/
Note.findById = (id, result) => {
  let txt =
      'SELECT a.*, c.*, e.* ' +
         'FROM note AS a ' +
           'INNER JOIN category AS c ON c.category_id = a.category_id ' +
           'INNER JOIN reminder AS e ON e.reminder_id = a.reminder_id ' +
         `WHERE a.note_id = ${id}`;
   sql.query(txt, (err, res) => {
     if(err) {
       console.log('error: ', err);
       result(err, null);
     } else {
       if(res.length) {
         console.log('Note found: ', res);
         result(null, res);
       } else {
         result({ error: `note ${id} not found`}, null);
       }
     }
   });
};


/*
  getAll should be a function that calls the query function on sql object to fetch all
  the notes or notes with specific title from the notesdb   schema using select query.
  Join queries should be used to join Note, NoteCategory and NoteReminder tables.
*/
Note.getAll = (result) => {
  let txt =
      'SELECT a.*, c.*, e.* ' +
         'FROM note AS a ' +
           'INNER JOIN category AS c ON c.category_id = a.category_id ' +
           'INNER JOIN reminder AS e ON e.reminder_id = a.reminder_id';
   sql.query(txt, (err, res) => {
     if(err) {
       console.log('error: ', err);
       result(err, null);
     } else {
       if(res.length) {
         console.log('Notes: ', res);
         result(null, res);
       } else {
         result({ error: 'there are no notes' }, null);
       }
     }
   });
};
/*
  updateById should be a function that calls query function on sql object
  to update the note for the given id from the notesdb schema using update query
*/

Note.updateById = (id, note, result) => {
  let txt =
      'UPDATE note SET note_title = ?, note_content = ?, note_status = ?, ' +
          'note_creation_date = ?, category_id = ?, reminder_id = ? ' +
      'WHERE note_id = ?'
  let v = [ note.note_title,
            note.note_content,
            note.note_status,
            note.note_creation_date,
            note.category_id,
            note.reminder_id,
            id ];
  sql.query(txt, v, (err, res) => {
    if(err) {
      console.log('error: ', err);
      result(err, null);
    } else {
      if(res.affectedRows === 0) {
        result({ error: `note_id ${id} not found` }, null);
      } else {
        console.log('Updated note: ', { id: id, ...note });
        result(null, { id: id, ...note });
      }
    }
  });
};

/*
  remove should be a function that calls query function on sql object
  to delete the note for the given id from the notesdb schema using delete query
*/
Note.remove = (id, result) => {
  let txt = 'DELETE FROM note WHERE note_id = ?';
  sql.query(txt, id, (err, res) => {
    if(err) {
      console.log('error: ', err);
      result(err, null);
    } else {
      if(res.affectedRows === 0) {
        result({ error: `note_id ${id} not found` }, null);
      } else {
        console.log('Deleted note with id: ', id);
        result(null, res);
      }
    }
  });
};

/*
  removeAll should be a function that calls query function on sql object
  to delete all the notes from the notesdb schema using delete query
*/
Note.removeAll = result => {
  sql.query('DELETE FROM note', (err, res) => {
    if(err) {
      console.log('error: ', err);
      result(err, null);
    } else {
      console.log(`Deleted ${res.affectedRows} notes`);
      result(null, res);
    }
  });
};

module.exports = Note;
