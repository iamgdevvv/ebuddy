import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class RegisterDto {
	@IsEmail()
	@IsNotEmpty()
	public email: string;

	@IsString()
	@IsNotEmpty()
	public username: string;

	@IsString()
	@IsNotEmpty()
	public password: string;
}

export class LoginDto {
	@IsString()
	@IsNotEmpty()
	public username: string;

	@IsString()
	@IsNotEmpty()
	public password: string;
}
