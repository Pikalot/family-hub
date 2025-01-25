CREATE TABLE Members ( -- 1
    mid INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(255) UNIQUE,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(30) NOT NULL CHECK (CHAR_LENGTH(password) >= 8),
    role ENUM('admin', 'user'),
    dob DATE,
    ocupation VARCHAR(255),
    description TEXT,
    pid BIGINT
);


CREATE TABLE Employers ( -- 2
    eid INTEGER AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    city VARCHAR(100),
    state CHAR(2),
    country VARCHAR(20)
);


CREATE TABLE works_at ( -- 3
    mid INTEGER,
    eid INTEGER,
    from_date VARCHAR(20) NOT NULL,
    to_date VARCHAR(20),
    title VARCHAR(255),
    PRIMARY KEY (mid, eid),
    FOREIGN KEY (mid) REFERENCES Members(mid)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (eid) REFERENCES Employers(eid)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);


CREATE TABLE Schools ( -- 4
    sid INTEGER AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    city VARCHAR(100),
    state CHAR(2),
    country VARCHAR(20)
);


CREATE TABLE Majors( -- 5
    id CHAR(4) PRIMARY KEY,
    name VARCHAR(255) 
);


CREATE TABLE graduates_at ( 
-- 6
    mid INTEGER,
    sid INTEGER,
    major_id CHAR(4),
    degree ENUM(
        'AA', 
        'AS', 
        'BA', 
        'BS',
        'MA',
        'MS',
        'MFA',
        'LLM',
        'PhD',
        'MD',
        'DDS',
        'DFA'),
    gpa FLOAT(3, 2),
    PRIMARY KEY (mid, sid, major_id),
    FOREIGN KEY (mid) REFERENCES Members(mid)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (sid) REFERENCES Schools(sid)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (major_id) REFERENCES Majors(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);


CREATE TABLE Courses ( -- 7
    code VARCHAR(50),
    sid INTEGER,
    name VARCHAR(255),
    PRIMARY KEY (code, sid),
    FOREIGN KEY (sid) REFERENCES Schools(sid) 
        ON DELETE CASCADE
        ON UPDATE CASCADE
);


CREATE TABLE takes_course ( -- 8
    mid INTEGER,
    code VARCHAR(50),
    sid INTEGER,
    grade VARCHAR(2),
    PRIMARY KEY (mid, sid, code),
    FOREIGN KEY (mid) REFERENCES Members(mid)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (code, sid) REFERENCES Courses(code, sid)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);


CREATE TABLE Projects ( -- 9
    id CHAR(4) PRIMARY KEY,
    name VARCHAR(255),
    repository VARCHAR(255) UNIQUE,
    description TEXT,
    pid BIGINT
);


CREATE TABLE owns_project (     -- 10
    mid INTEGER, 
    pid CHAR(4),
    PRIMARY KEY (mid, pid),
    FOREIGN KEY (mid) REFERENCES Members(mid)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (pid) REFERENCES Projects(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);


CREATE TABLE Contents (     -- 11
    cid BIGINT AUTO_INCREMENT PRIMARY KEY,
    mid INT NOT NULL,
    created_date DATE NOT NULL,
    text TEXT,
    short_video VARCHAR(255),
    FOREIGN KEY (mid) REFERENCES Members(mid)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);


CREATE TABLE Photos(        -- 12
    pid BIGINT PRIMARY KEY,
    source VARCHAR(255) NOT NULL UNIQUE,
    FOREIGN KEY (pid) REFERENCES Contents(cid)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);


ALTER TABLE Members     -- 13
ADD CONSTRAINT frkey_pid_ref_photos
FOREIGN KEY (pid) REFERENCES Photos(pid)
ON DELETE SET NULL
ON UPDATE CASCADE;


CREATE TABLE Personal_URLs (    -- 14
    uid INTEGER PRIMARY KEY,    
    name VARCHAR(100),
    url VARCHAR(255) UNIQUE,
    mid INTEGER,
    FOREIGN KEY (mid) REFERENCES Members(mid)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE Skills (   -- 15
    sid INTEGER PRIMARY KEY AUTO_INCREMENT,
    skill VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE has_skills (     -- 16
    mid INTEGER,
    sid INTEGER,
    proficiency INTEGER CHECK (proficiency >= 0 AND proficiency <= 100),
    PRIMARY KEY (mid, sid),
    FOREIGN KEY (mid) REFERENCES Members(mid)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (sid) REFERENCES Skills(sid)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- POPULATE TEST DATABASE

INSERT INTO Members(first_name, last_name, email, username, password, role, ocupation, description) VALUES	        -- 17
	('Tuan-Anh', 'Ho', 'thepikalot@yahoo.com', 'admin1', 'Admin@123', 'admin', 'Software Engineering Student', 
        'Passionating about financial technology while exploring how machine learning can enhance security in digital transactions, he aims to develop software solutions for multi-platform transactions. He is an indoor enthusiast since he spends the second-largest amount of time on video games and resting. As a great fan of the RPG genre, Tuan-Anh has completed some Final Fantasy series and Xenogears over four times, spending 100+ hours on each run. His love for video games and anime has greatly influenced the ideas of his projects.'),
	('Jane', 'Doe', NULL, 'user1', 'User@123', 'user','Student','I love Toca Boca');

INSERT INTO Skills VALUES   -- 18
    (1, 'Java'),
    (2, 'CSS'),
    (3, 'HTML'),
    (4, 'Python'),
    (5, 'NodeJs'),
    (6, 'NextJs'),
    (7, 'MariaDB'),
    (8, 'MySQL'),
    (9, 'Git'),
    (10, 'Jenkins'),
    (11, 'IntelliJ'),
    (12, 'PyCharm');

INSERT INTO has_skills VALUES -- 19
    (1, 1, 95),
    (1, 2, 80),
    (1, 3, 71),
    (1, 4, 79),
    (1, 6, 70),
    (1, 8, 92),
    (1, 11, 95);

INSERT INTO Employers(name, city, state, country) VALUES	-- 20
	('Metropolitan Bank', 'San Jose', 'CA','USA'),
	('Cathay Bank', 'San Jose', 'CA','USA'),
	('San Jose State University', 'San Jose', 'CA','USA');
	
	
INSERT INTO works_at VALUES	-- 19
	(1, 3, '5/2024', 'Current', 'Intern'),
	(1, 1, '10/2019', '2/2025', 'Branch Operations Officer'),
	(1, 2, '1/2018', '9/2019', 'Relationship Banker');
		
	
INSERT INTO Schools(name, city, state, country) VALUES	        -- 20
	('San Jose State University', 'San Jose', 'CA','USA'),
	('Evergreen Valley College', 'San Jose', 'CA','USA');
	

INSERT INTO Majors VALUES	            -- 21
	('m001', 'Computer Science'),
	('m002', 'Software Engineering'),
	('m003', 'Medical Assistant'),
	('m004', 'Mathematics');
	
		
INSERT INTO graduates_at VALUES	        -- 22
	(1, 1, 'm002', 'BS', 3.91),
	(1, 2, 'm001', 'AS', 3.9);
	
		
INSERT INTO Courses VALUES	
	('CMPE 102', 1,'Assembly Language Programming'),
	('CS 146', 1,'Data Structures and Algorithms'),
	('ISE 130', 1,'Engineering Probability and Statistics'),
	('CS 157A', 1,'Introduction to Database Management Systems'),
	('CS 151', 1,'Object-Oriented Design'),
	('CMPE 131', 1,'Software Engineering'),
	('COMSC 076', 2,'Computer Science II: Introduction to Data Structures '),
	('COMSC 077', 2,'Introduction to Computer Systems');
	
	
INSERT INTO takes_course VALUES	
	(1, 'CMPE 102', 1, 'A+'),
	(1, 'CS 146', 1, 'A'),
	(1, 'ISE 130', 1, 'A'),
	(1, 'CS 157A', 1, 'A'),
	(1, 'CS 151', 1, 'A'),
	(1, 'CMPE 131', 1, 'A-'),
	(1, 'COMSC 076', 2, 'A'),
	(1, 'COMSC 077', 2, 'A');
	
	
INSERT INTO Projects (id, name, repository, description) VALUES
	('p001', 'GameTrees', 'https://github.com/Pikalot/GameTrees', 'A website that allows users to search the cheapest games from any registered store on the platform, write reviews, create a cross-store wishlist, import cross platform user stats, and more! Utilizes APIs and a MySQL DB to maintain platform data, and is modularized as to be easy to read and expandable.'),
	('p002', 'EVMax', 'https://github.com/Pikalot/EVMax', NULL),
	('p003', 'SJSU AI Research', NULL, NULL),
	('p004', 'Math Practice for Sora', 'https://github.com/Pikalot/SoraMathPratice', 'This is a simple project to inspire a passion in Math for Sora.');
	
	
INSERT INTO owns_project VALUES	
	(1, 'p001'),
	(1, 'p002'),
	(1, 'p003'),
	(1, 'p004');
	
		
INSERT INTO Personal_URLs VALUES	
	(1, 'GitHub', 'https://github.com/Pikalot', 1),
	(2, 'LinkedIn', 'https://www.linkedin.com/in/pikalot', 1);


-- CREATE TRIGGERS
DELIMITER //

CREATE TRIGGER before_insert_majors     -- 15
BEFORE INSERT ON Majors
FOR EACH ROW
BEGIN
    DECLARE new_id INT;
    IF (SELECT id FROM Majors) IS NULL
        THEN SET NEW.id = 'm001';
    ELSE 
        SELECT MAX(CAST(SUBSTRING(id, 2) AS UNSIGNED)) + 1
        INTO new_id
        FROM Majors;
        SET NEW.id = CONCAT('m', LPAD(new_id, 3, '0'));
    END IF;
END//


CREATE TRIGGER before_insert_projects       -- 16
BEFORE INSERT ON Projects
FOR EACH ROW
BEGIN
    DECLARE new_id INT;
    IF (SELECT pid FROM Projects) IS NULL
        THEN SET NEW.pid = 'p001';
    ELSE
        SELECT MAX(CAST(SUBSTRING(pid, 2) AS UNSIGNED)) + 1
        INTO new_id
        FROM Projects;
        SET NEW.pid = CONCAT('p', LPAD(new_id, 3, '0'));
    END IF;
END//

DELIMITER ;