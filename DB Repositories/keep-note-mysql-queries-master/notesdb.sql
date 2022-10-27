-- create a schema called `notesdb`
CREATE SCHEMA IF NOT EXISTS notesdb;

-- Create the tables for Note, Category, Reminder, User, UserNote, NoteReminder and NoteCategory

-- Note table fields: note_id, note_title, note_content, note_status, note_creation_date
CREATE TABLE IF NOT EXISTS note (
  note_id INT NOT NULL AUTO_INCREMENT,
  note_title VARCHAR(40),
  note_content VARCHAR(256),
  note_status ENUM('not-started', 'in-progress', 'paused', 'cancelled', 'completed'),
  note_creation_date DATETIME,
  PRIMARY KEY (note_id)
);

-- User table fields: user_id, user_name, user_added_date, user_password, user_mobile
CREATE TABLE IF NOT EXISTS user (
  user_id INT NOT NULL AUTO_INCREMENT,
  user_name VARCHAR(40),
  user_added_date DATETIME,
  user_password VARCHAR(30) NOT NULL,
  user_mobile VARCHAR(30) NOT NULL,
  CHECK(user_mobile REGEXP '[0-9,-]*'),
  PRIMARY KEY (user_id)
);

-- alter table User modify column user_added_date date
ALTER TABLE user MODIFY user_added_date DATE;

-- Category table fields : category_id, category_name, category_descr, category_creation_date, category_creator
CREATE TABLE IF NOT EXISTS category (
  category_id INT NOT NULL AUTO_INCREMENT,
  category_name VARCHAR(30) NOT NULL,
  category_descr VARCHAR(256),
  category_creation_date DATE,
  category_creator INT,
  PRIMARY KEY (category_id),
  FOREIGN KEY (category_creator) REFERENCES user(user_id) ON DELETE SET NULL
);

-- Reminder table fields : reminder_id, reminder_name, reminder_descr, reminder_type, reminder_creation_date, reminder_creator
CREATE TABLE IF NOT EXISTS reminder (
  reminder_id INT NOT NULL AUTO_INCREMENT,
  reminder_name VARCHAR(30) NOT NULL,
  reminder_descr VARCHAR(256),
  reminder_type ENUM('first', 'second', 'third', 'paused', 'due-date', 'off', 'delayed'),
  reminder_creation_date DATE,
  reminder_creator INT NOT NULL,
  PRIMARY KEY (reminder_id),
  FOREIGN KEY (reminder_creator) REFERENCES user(user_id) ON DELETE CASCADE
);

-- NoteCategory table fields : notecategory_id, note_id, category_id
CREATE TABLE IF NOT EXISTS NoteCategory (
  notecategory_id INT NOT NULL AUTO_INCREMENT,
  note_id INT NOT NULL,
  category_id INT NOT NULL,
  PRIMARY KEY (notecategory_id),
  FOREIGN KEY (note_id) REFERENCES note(note_id) ON DELETE CASCADE,
  FOREIGN KEY (category_id) REFERENCES category(category_id) ON DELETE CASCADE,
  UNIQUE KEY (note_id, category_id)
);

-- NoteReminder table fields : notereminder_id, note_id, reminder_id
CREATE TABLE IF NOT EXISTS NoteReminder (
  notereminder_id INT NOT NULL AUTO_INCREMENT,
  note_id INT NOT NULL,
  reminder_id INT NOT NULL,
  PRIMARY KEY (notereminder_id),
  FOREIGN KEY (note_id) REFERENCES note(note_id) ON DELETE CASCADE,
  FOREIGN KEY (reminder_id) REFERENCES reminder(reminder_id) ON DELETE CASCADE,
  UNIQUE KEY (note_id, reminder_id)
);

-- Usernote table fields : usernote_id, user_id, note_id
CREATE TABLE IF NOT EXISTS UserNote (
  usernote_id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  note_id INT NOT NULL,
  PRIMARY KEY (usernote_id),
  FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE,
  FOREIGN KEY (note_id) REFERENCES note(note_id) ON DELETE CASCADE,
  UNIQUE KEY (user_id, note_id)
);

-- Insert the rows into the created tables (Note, Category, Reminder, User, UserNote, NoteReminder and NoteCategory)
-- Notes
INSERT INTO note (note_title, note_content, note_status, note_creation_date)
       VALUES ('Penas y Dolores', 'Sobre los dolores y las penas', 'not-started', '2021-12-20 21:30');
INSERT INTO note (note_title, note_content, note_status, note_creation_date)
       VALUES ('Manos Arriba', 'Arriba las manos', 'in-progress', '2022-01-15 10:15');
INSERT INTO note (note_title, note_content, note_status, note_creation_date)
       VALUES ('Matematica', 'Veamos series de Fourier', 'in-progress', '2022-02-12 10:55');
INSERT INTO note (note_title, note_content, note_status, note_creation_date)
       VALUES ('Fisica', 'Quantum Theory', 'cancelled', '2022-04-01 22:03');
INSERT INTO note (note_title, note_content, note_status, note_creation_date)
       VALUES ('Estadistica', 'Tchevichev distribution', 'completed', '2022-08-01 9:47');
-- Users
INSERT INTO user (user_name, user_added_date, user_password, user_mobile)
       VALUES ('Oscar Ricci', '2022-10-22', 'secreto123', '11-2345-6789');
INSERT INTO user (user_name, user_added_date, user_password, user_mobile)
       VALUES ('Juan Petrucci', '2020-12-11', 'secreto234', '12-6789-4321');
INSERT INTO user (user_name, user_added_date, user_password, user_mobile)
       VALUES ('Ricardo Massaglia', '2021-11-01', 'secreto345', '35-8765-9021');
INSERT INTO user (user_name, user_added_date, user_password, user_mobile)
       VALUES ('Bernardo Uzquieva', '2019-07-05', 'secreto678', '23-7896-3214');
INSERT INTO user (user_name, user_added_date, user_password, user_mobile)
       VALUES ('Ermenegildo Damberg', '2019-05-19', 'secreto790', '58-9786-1456');
-- Category
INSERT INTO category (category_name, category_descr, category_creation_date, category_creator)
       VALUES ('Ciencia', 'temas científicos que no le interesan a nadie', '2019-08-19', 5);
INSERT INTO category (category_name, category_descr, category_creation_date, category_creator)
       VALUES ('Legales', 'temas legales que favorecen al más fuerte', '2022-04-21', 1);
INSERT INTO category (category_name, category_descr, category_creation_date, category_creator)
       VALUES ('Sentimientos', 'Quien no ha sufrido alguna vez', '2021-02-13', 1);
INSERT INTO category (category_name, category_descr, category_creation_date, category_creator)
       VALUES ('Trabajo', 'Qué dolor...', '2022-04-21', 3);
INSERT INTO category (category_name, category_descr, category_creation_date, category_creator)
       VALUES ('Deportes', 'En el centro del universo', '2022-07-21', 4);
-- Reminder
INSERT INTO reminder (reminder_name, reminder_descr, reminder_type, reminder_creation_date, reminder_creator)
       VALUES ('No olvidar', 'La memoria suele fallar', 'first', '2021-06-12', 5);
INSERT INTO reminder (reminder_name, reminder_descr, reminder_type, reminder_creation_date, reminder_creator)
       VALUES ('Pastilla Roja', 'El desmemoriado se acordo', 'second', '2022-04-08', 1);
INSERT INTO reminder (reminder_name, reminder_descr, reminder_type, reminder_creation_date, reminder_creator)
       VALUES ('Verde Verderol', 'Simpre verde, se lo olvido', 'due-date', '2020-01-30', 4);
INSERT INTO reminder (reminder_name, reminder_descr, reminder_type, reminder_creation_date, reminder_creator)
       VALUES ('No sense', 'Lo mas concreto', 'third', '2021-01-02', 2);
INSERT INTO reminder (reminder_name, reminder_descr, reminder_type, reminder_creation_date, reminder_creator)
       VALUES ('Quítalo', 'Sin peligro de ezquizer', 'off', '2021-05-10', 3);

-- NoteCategory
INSERT INTO NoteCategory (note_id, category_id) VALUES (1, 5);
INSERT INTO NoteCategory (note_id, category_id) VALUES (2, 3);
INSERT INTO NoteCategory (note_id, category_id) VALUES (3, 1);
INSERT INTO NoteCategory (note_id, category_id) VALUES (4, 2);
INSERT INTO NoteCategory (note_id, category_id) VALUES (5, 3);
INSERT INTO NoteCategory (note_id, category_id) VALUES (1, 3);
INSERT INTO NoteCategory (note_id, category_id) VALUES (2, 4);
INSERT INTO NoteCategory (note_id, category_id) VALUES (3, 3);
INSERT INTO NoteCategory (note_id, category_id) VALUES (4, 1);
INSERT INTO NoteCategory (note_id, category_id) VALUES (5, 2);
-- NoteReminder
INSERT INTO NoteReminder (note_id, reminder_id) VALUES (1, 5);
INSERT INTO NoteReminder (note_id, reminder_id) VALUES (2, 3);
INSERT INTO NoteReminder (note_id, reminder_id) VALUES (3, 1);
INSERT INTO NoteReminder (note_id, reminder_id) VALUES (4, 2);
INSERT INTO NoteReminder (note_id, reminder_id) VALUES (5, 3);
INSERT INTO NoteReminder (note_id, reminder_id) VALUES (1, 3);
INSERT INTO NoteReminder (note_id, reminder_id) VALUES (2, 4);
INSERT INTO NoteReminder (note_id, reminder_id) VALUES (3, 3);
INSERT INTO NoteReminder (note_id, reminder_id) VALUES (4, 1);
INSERT INTO NoteReminder (note_id, reminder_id) VALUES (5, 2);
-- UserNote
INSERT INTO UserNote (user_id, note_id) VALUES (1, 5);
INSERT INTO UserNote (user_id, note_id) VALUES (2, 3);
INSERT INTO UserNote (user_id, note_id) VALUES (3, 1);
INSERT INTO UserNote (user_id, note_id) VALUES (4, 2);
INSERT INTO UserNote (user_id, note_id) VALUES (5, 3);
INSERT INTO UserNote (user_id, note_id) VALUES (1, 3);
INSERT INTO UserNote (user_id, note_id) VALUES (2, 4);
INSERT INTO UserNote (user_id, note_id) VALUES (3, 3);
INSERT INTO UserNote (user_id, note_id) VALUES (4, 1);
INSERT INTO UserNote (user_id, note_id) VALUES (5, 2);

-- Fetch the row from User table based on Id and Password.
SELECT * FROM user WHERE id = 3 and password = 'secreto345';

-- Fetch all the rows from Note table based on the field note_creation_date.
SELECT * FROM note WHERE note_creation_date = '2022-02-12 10:55';

-- Fetch all the Categories created after the particular Date.
SELECT * FROM category WHERE category_creation_date > '2022-01-01';

-- Fetch all the Note ID from UserNote table for a given User.
SELECT note_id from UserNote WHERE user_id = 3;

-- Write Update query to modify particular Note for the given note id.
UPDATE note SET note_title = 'Pocas Penas y Pocos Dolores',
                note_status = 'in-progress'
            WHERE note_id = 1;

-- Fetch all the Notes from the Note table by a particular User.
SELECT * FROM note WHERE user_id = 3;

-- Fetch all the Notes from the Note table for a particular Category.
SELECT a.*
FROM note AS a, NoteCategory AS b
WHERE a.note_id = b.note_id
AND b.category_id = 2;

-- Fetch all the reminder details for a given note id.
SELECT a.*
FROM Reminder AS a, NoteReminder AS b
WHERE a.reminder_id = b.reminder_id
AND b.note_id = 4;

-- Fetch the reminder details for a given reminder id.
SELECT * FROM reminder WHERE reminder_id = 3;

-- Write a query to create a new Note from particular User (Use Note and UserNote tables - insert statement).
INSERT INTO note (note_title, note_content, note_status, note_creation_date)
  SELECT b.note_title, b.note_content, b.note_status, CURRENT_TIMESTAMP() AS note_creation_date
  FROM note AS b, (
          SELECT max(a.note_id) AS newNote_id
          FROM UserNote AS a
          WHERE a.user_id = 3) AS c
  WHERE b.note_id = c.newNote_id;
INSERT INTO UserNote (user_id, note_id)
SELECT 3 AS user_id, LAST_INSERT_ID() AS note_id;

-- Write a query to create a new Note from particular User to particular Category(Use Note and NoteCategory tables - insert statement)
INSERT INTO note (note_title, note_content, note_status, note_creation_date)
  SELECT b.note_title, b.note_content, b.note_status, CURRENT_TIMESTAMP() AS note_creation_date
  FROM note AS b, (
          SELECT max(a.note_id) AS newNote_id
          FROM NoteCategory AS a
          WHERE a.category_id = 3) AS c
  WHERE b.note_id = c.newNote_id;
INSERT INTO UserNote (note_id, category_id)
SELECT LAST_INSERT_ID() AS note_id, 3 AS category_id;

-- Write a query to set a reminder for a particular note (Use Reminder and NoteReminder tables - insert statement)
INSERT INTO reminder (reminder_name, reminder_descr, reminder_type, reminder_creation_date, reminder_creator)
       VALUES ('Dejalo', 'Muy perigoso de ezquizer', 'off', '2021-08-16', 4);
INSERT INTO NoteReminder (note_id, category_id)
SELECT 4 AS note_id, LAST_INSERT_ID();

-- Write a query to delete particular Note added by a User(Note and UserNote tables - delete statement)
DELETE
FROM note AS d, (
  SELECT a.note_id
  FROM UserNote AS a, (
    SELECT MAX(b.usernote_id) AS usernote_id
    FROM UserNote AS b ) AS c
  WHERE a.usernote_id = c.usernote_id) e
WHERE d.note_id = e.note_id;

-- Write a query to delete particular Note from particular Category(Note and NoteCategory tables - delete statement)
DELETE
FROM note AS d, (
  SELECT a.note_id
  FROM NoteCategory AS a, (
    SELECT MAX(b.notecategory_id) AS notecategory_id
    FROM NoteCategory AS b ) AS c
  WHERE a.notecategory_id = c.notecategory_id) e
WHERE d.note_id = e.note_id;