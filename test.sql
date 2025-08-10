SELECT 
  P.id,
  P.name,
  ANY_VALUE(M.username) AS username,
  ANY_VALUE(S.skill) AS skill
FROM Projects P
LEFT JOIN owns_project O 
ON P.id = O.pid
LEFT JOIN Members M
ON O.mid = M.mid
LEFT JOIN uses_skills U
ON U.project_id = P.id
LEFT JOIN Skills S
ON U.skill_id = S.sid
WHERE 
P.name LIKE('%a%e%') OR
S.skill LIKE('%a%e%')
GROUP BY P.id
ORDER BY
  CASE
    WHEN P.name = 'ae'       THEN 1
    WHEN P.name LIKE('ae%')   THEN 2
    WHEN P.name LIKE('%ae%')     THEN 3
    ELSE 4
  END,
  CHAR_LENGTH(P.name),
  P.name,
  skill
LIMIT 5;