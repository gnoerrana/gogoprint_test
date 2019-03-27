# gogoprint_test

Technology Stack :
Magento 2 Version : 2.3.0

Installation :
create database and import from sql file at "Database" Folder

- create env.php file on "app/etc" folder.
- open command, go to project folder and run: 
  - php/bin magento setup:upgrade
  - php/bin magento setup:di:compile
  - php/bin magento setup:static-content deploy -f
  - sudo chmod -R 777 var generated pub/static
  
 
