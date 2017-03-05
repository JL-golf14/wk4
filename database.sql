
CREATE TABLE todo (
id SERIAL PRIMARY KEY,
task varchar(480),
completed varchar(20),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);


INSERT INTO todo(task, completed)
VALUES
 ('work on my homework', 'complete'),
 ('work on my tasks', 'incomplete'),
 ('work on my css', 'complete'),
 ('work on my SQL', 'incomplete'),
 ('work on my javaScript', 'incomplete');

















-- CREATE TABLE todo (
-- id SERIAL PRIMARY KEY,
-- task varchar(480),
-- completed varchar(480),
-- created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);
--
-- INSERT INTO todo(task, completed)
-- VALUES
--  ('work on my homework', TRUE),
--  ('work on my tasks', FALSE),
--  ('work on my css', FALSE),
--  ('work on my SQL', TRUE),
--  ('work on my javaScript', FALSE);
