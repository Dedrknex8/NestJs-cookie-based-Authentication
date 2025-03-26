# Steps to reproduce this project
1. Install/create new nest project

`nest new prijectName`

2. Install module service and controller 

`nest g controller auth`

3.Create a prisma 
`npx prisma generate`

- Initited prisma in current wdir/

4. Install primsa client 

`npm i @prisma/client`

5. Create DTO for register endpoint 

a) install dependency for it 
`npm i --save class-validator class-transformer`

b)npm i --save @nestjs/config      
- This is config module which is used to make use dotenv process files 
