INSERT INTO Contents(cid, mid, created_date)
VALUES 
    (1, 1, NOW()),
    (2, 1, NOW()),
    (3, 1, NOW()),
    (4, 1, NOW()),
    (5, 1, NOW()),
    (6, 1, NOW());

INSERT INTO Photos VALUES	
	(1, 'https://res.cloudinary.com/dqbzjuq9u/image/upload/v1737705960/crop-portrait_enhanced_qbrjpn.png'),
	(2, 'https://res.cloudinary.com/dqbzjuq9u/image/upload/v1737707459/Sora-removebg-preview_enhanced_j7tipm.png'),
	(3, 'https://res.cloudinary.com/dqbzjuq9u/image/upload/v1737799671/EVMax_rsclkm.png'),
	(4, 'https://res.cloudinary.com/dqbzjuq9u/image/upload/v1737799514/AI_Research_yj1tzz.png'),
	(5, 'https://res.cloudinary.com/dqbzjuq9u/image/upload/v1737799293/MathPractice_dzzqlt.png'),
	(6, 'https://res.cloudinary.com/dqbzjuq9u/image/upload/v1737798559/GameTree_s8brlw.png');


UPDATE Members
SET pid = 1
WHERE mid = 1;
    
UPDATE Members
SET pid = 2
WHERE mid = 2;

UPDATE Projects
SET pid = 3
WHERE id = 'p002';

UPDATE Projects
SET pid = 4
WHERE id = 'p003';

UPDATE Projects
SET pid = 5
WHERE id = 'p004';

UPDATE Projects
SET pid = 6
WHERE id = 'p001';