create table ChangeRequest
(
  id            int auto_increment
    primary key,
  projectID     char(13)           not null,
  teacherName   varchar(20)        not null,
  teacherID     char(12)           not null,
  projectName   varchar(20)        not null,
  changeContent varchar(255)       not null,
  state         int(1) default '0' not null,
  issue         varchar(255)       null
)
  charset = utf8;

create table FundManagement
(
  id            int auto_increment
    primary key,
  projectID     char(13)                   not null,
  paymentDate   date                       not null,
  fundsReceived float(9, 2)                not null,
  paymentSlip   float(9, 2) default '0.00' null,
  balance       float(9, 2) default '0.00' null
)
  charset = utf8;

create table Manager
(
  mid      char(12)    not null
    primary key,
  password char(12)    not null,
  name     varchar(30) not null,
  type     int(1)      not null
  comment '1 超级管理员
0 普通管理员',
  position char(30)    not null,
  section  char(30)    null
)
  charset = utf8;

create table Notice
(
  id        int auto_increment
    primary key,
  title     varchar(30)  not null,
  content   varchar(255) not null,
  recipient varchar(30)  not null,
  time      date         not null,
  teacherID char(12)     not null
)
  charset = utf8;

create table Process
(
  id           int auto_increment
    primary key,
  pid          char(12)           not null,
  setLevel     int(1)             not null,
  currentLevel int(1) default '0' not null,
  type         int(1)             not null
  comment '0 审核流程
1 结题流程'
)
  charset = utf8;

create table ProcessDocuments
(
  id          int auto_increment
    primary key,
  projectID   char(13)                           not null,
  filePath    varchar(255)                       not null,
  type        int(1)                             not null,
  fileName    varchar(255) default '11111111111' not null,
  state       int(1) default '0'                 not null,
  teacherName varchar(20)                        not null,
  teacherID   char(12)                           not null
)
  charset = utf8;

create table Project
(
  id             int auto_increment
    primary key,
  teacherID      char(12)           not null,
  teacherName    varchar(20)        not null,
  projectName    varchar(20)        not null,
  projectContent varchar(255)       not null,
  funds          float(9, 2)        not null,
  startTime      date               not null,
  endTime        date               not null,
  projectMembers varchar(255)       not null,
  fileName       varchar(255)       not null,
  filePath       varchar(255)       not null,
  type           int(1)             not null,
  state          int(1) default '0' not null,
  issue          varchar(255)       null,
  section        varchar(20)        not null,
  isVet          int(1)             not null
  comment '是否设置审批流程',
  projectID      char(13)           null
)
  charset = utf8;

create table Rank
(
  id       int auto_increment
    primary key,
  rank     int(1)      not null,
  position varchar(30) not null
)
  charset = utf8;

create table ScientificResearch
(
  id          int auto_increment
    primary key,
  teacherName varchar(30)                        not null,
  teacherID   char(12)                           not null,
  title       varchar(20)                        not null,
  filePath    varchar(255)                       not null,
  type        varchar(20)                        not null,
  fileName    varchar(255) default '11111111111' not null,
  state       int(1) default '0'                 null,
  projectID   char(13)                           not null,
  constraint ScientificResearch_id_uindex
  unique (id)
)
  charset = utf8;

create table Section
(
  id          int auto_increment
    primary key,
  sectionName varchar(20) not null,
  constraint Section_id_uindex
  unique (id)
)
  charset = utf8;

create table Teacher
(
  teacherID   char(12)                          not null
    primary key,
  password    varchar(30)                       not null,
  teacherName varchar(30)                       not null,
  section     varchar(20)                       not null,
  phone       varchar(30) default '11111111111' null,
  constraint Teacher_teacherID_uindex
  unique (teacherID)
)
  charset = utf8;


