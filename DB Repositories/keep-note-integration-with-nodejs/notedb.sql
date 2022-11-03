
-- create a schema called `notesdb`
DROP SCHEMA IF EXISTS notesdb;
CREATE SCHEMA notesdb;
USE notesdb;

CREATE TABLE IF NOT EXISTS note (
  note_id INT NOT NULL AUTO_INCREMENT,
  note_title VARCHAR(40),
  note_content VARCHAR(256),
  note_status varchar(80),
  note_creation_date DATETIME,
  category_id INT,
  reminder_id INT,
  PRIMARY KEY (note_id),
  FOREIGN KEY (category_id) REFERENCES category(category_id) ON DELETE SET NULL,
  FOREIGN KEY (reminder_id) REFERENCES reminder(reminder_id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS category (
  category_id INT NOT NULL AUTO_INCREMENT,
  category_name VARCHAR(30) NOT NULL,
  category_description VARCHAR(256),
  category_creation_date DATE,
  PRIMARY KEY (category_id)
);

CREATE TABLE IF NOT EXISTS reminder (
  reminder_id INT NOT NULL AUTO_INCREMENT,
  reminder_name VARCHAR(30) NOT NULL,
  reminder_description VARCHAR(256),
  reminder_creation_date DATE,
  PRIMARY KEY (reminder_id)
);
