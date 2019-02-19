SET  NAMES  UTF8;
DROP  DATABASE  IF  EXISTS  wz;
CREATE  DATABASE  wz  CHARSET=UTF8;
USE  wz;
CREATE  TABLE  wz_user(
  uid  INT  PRIMARY KEY AUTO_INCREMENT,
  uname  VARCHAR(32)  NOT NULL DEFAULT '',
  upwd  VARCHAR(32)  NOT NULL DEFAULT '',
  email  VARCHAR(64) NOT NULL,
  phone  VARCHAR(16),
  user_name  VARCHAR(32),
  gender  BOOL 
);
INSERT  INTO  wz_user  VALUES
(null,"jsheng",md5('js123456'),"js123@163.com","13512345678","gjs",1),
(null,"wqi",md5('wq123456'),"wq123@163.com","13522345678","xwq",1),
(null,"jpeng",md5('jp123456'),"jp123@163.com","13532345678","jp",1),
(null,"ffang",md5('ff123456'),"ff123@163.com","13542345678","msf",0),
(null,"jning",md5('jn123456'),"jn123@163.com","13552345678","zjn",1)
