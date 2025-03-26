import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";


export class RegisterDto{
    //For email
    @IsEmail({}, {message: 'Please provide a valid email id'})
    @IsNotEmpty()
    email:string;

    //conditon for email id
    @IsString()
    @IsNotEmpty()
    @MinLength(6, {message : "Please provide a password greater than 6 character"})
    password:string
}