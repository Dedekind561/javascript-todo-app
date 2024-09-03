SELECT 
    email_address,
    SUM(CASE WHEN priority = 'H' THEN 1 ELSE 0 END) as high_priority,
    SUM(CASE WHEN priority = 'M' THEN 1 ELSE 0 END) as medium_priority,
    SUM(CASE WHEN priority = 'L' THEN 1 ELSE 0 END) as low_priority
FROM 
    todos
GROUP BY 
    email_address
ORDER BY 
    email_address;