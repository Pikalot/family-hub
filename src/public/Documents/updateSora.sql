ALTER TABLE owns_project
ADD owned_date DATE;

UPDATE Members
SET first_name = 'Sora'
WHERE mid = 2;

UPDATE Members
SET last_name = 'Ho'
WHERE mid = 2;

INSERT INTO Skills (skill) VALUES ('Creativity');

INSERT INTO has_skills VALUES 
    (2,
    (SELECT sid from Skills WHERE skill = 'Creativity'),
    100);

INSERT INTO Schools(name, city, state, country) VALUES	
	('Rocketship', 'San Jose', 'CA','USA');

INSERT INTO Contents (cid, mid, created_date) VALUES	
	(7, 2, NOW()),
	(8, 2, NOW()),
	(9, 2, NOW());

INSERT INTO Photos VALUES	
	(7, 'https://res.cloudinary.com/dqbzjuq9u/image/upload/v1737946959/Sora_Proj1_vw8dlu.jpg'),
	(8, 'https://res.cloudinary.com/dqbzjuq9u/image/upload/v1737946957/Sora_Proj3_frgoyy.jpg'),
	(9, 'https://res.cloudinary.com/dqbzjuq9u/image/upload/v1737946959/Sora_Proj2_us877i.jpg');

DELIMITER //

DROP TRIGGER before_insert_projects//
DROP TRIGGER before_insert_majors//

CREATE TRIGGER before_insert_projects       -- 16
BEFORE INSERT ON Projects
FOR EACH ROW
BEGIN
    DECLARE new_id INT;
    IF NOT EXISTS (SELECT 1 FROM Projects) THEN
        SET NEW.id = 'p001';
    ELSE
        SELECT MAX(CAST(SUBSTRING(id, 2) AS UNSIGNED)) + 1
        INTO new_id
        FROM Projects;
        SET NEW.id = CONCAT('p', LPAD(new_id, 3, '0'));
    END IF;
END//

CREATE TRIGGER before_insert_majors     -- 15
BEFORE INSERT ON Majors
FOR EACH ROW
BEGIN
    DECLARE new_id INT;
    IF NOT EXISTS (SELECT 1 FROM Majors) THEN
        SET NEW.id = 'm001';
    ELSE 
        SELECT MAX(CAST(SUBSTRING(id, 2) AS UNSIGNED)) + 1
        INTO new_id
        FROM Majors;
        SET NEW.id = CONCAT('m', LPAD(new_id, 3, '0'));
    END IF;
END//

DELIMITER ;

INSERT INTO Projects(id, name, repository, description, pid) VALUES	
	('p005', 'Nezuko Card', NULL, 'A gift from afar',7),
	('p006', "Mother's Day Project", NULL, 'For my mother',8),
	('p007', 'Christmas', NULL, '',9);

INSERT INTO owns_project VALUES	
	(2, 'p005', NOW()),
	(2, 'p006', NOW()),
	(2, 'p007', NOW());

INSERT INTO Majors (name) VALUE ('Elementary');

INSERT INTO graduates_at (mid, sid, major_id, grad_year) VALUES
    (2, 3, 'm005', 2028);