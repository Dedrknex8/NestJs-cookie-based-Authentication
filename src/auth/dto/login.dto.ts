import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class LoginDto{
    @IsEmail({},{message : 'Enter a valid email id '})
    @IsNotEmpty({message : 'Email field cannot be empty'})
    email:string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6, {message : "Please provide a password greater than 6 character"})
    password:string
} 