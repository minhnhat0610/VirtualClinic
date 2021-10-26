create database virtualclinic;
use virtualclinic;
create table User(
	UserID int primary key auto_increment,
    Email tinytext,
    Password tinytext,
    FirstName tinytext,
    LastName tinytext,
    DOB datetime,
    Phone bigint
);
select *
from User;

Select RecordID, Sys, Dia, Pulse, Result, DATE_FORMAT(date, "%m/%d/%Y") as Date
from User22BP_Record
order by RecordID desc;
insert into User(Email,Password,FirstName,LastName,DOB,Phone)
values('corydang0610@gmail.com','asd','Cory','Dang','1998-10-06',123);

create table User9BP_Record(
	RecordID int primary key auto_increment,
    Sys smallint,
    Dia smallint,
    Pulse smallint, 
    Result tinytext,
    Date datetime,
    UserID int,
    foreign key (UserID) references User(UserID)
);

CREATE table User12BPRecord(
                RecordID int primary key auto_increment,
                Sys smallint,
                Dia smallint,
                Pulse smallint, 
                Result tinytext,
                Date datetime,
                UserID int,
                foreign key (UserID) references User(UserID));
                

