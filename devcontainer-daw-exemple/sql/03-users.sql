CREATE USER 'dbadmin'@'%' IDENTIFIED WITH mysql_native_password BY 'Thos-2024';
FLUSH PRIVILEGES;
GRANT ALL PRIVILEGES ON project.* TO 'dbadmin'@'%';
FLUSH PRIVILEGES;