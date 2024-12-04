import { IsEmail, IsString, IsNotEmpty, IsBoolean, IsOptional } from 'class-validator';

export class CreateUserDto {
	@IsEmail()
	@IsNotEmpty()
	public email: string;

	@IsString()
	@IsNotEmpty()
	public username: string;

	@IsBoolean()
	public isActive: boolean;

	@IsString()
	@IsNotEmpty()
	public password: string;
}

export class UpdateUserDto {
	@IsEmail()
	@IsOptional()
	public email?: string;

	@IsString()
	@IsOptional()
	public username?: string;

	@IsBoolean()
	@IsOptional()
	public isActive?: boolean;
}

export class QueryUserDto {
	@IsBoolean()
	@IsOptional()
	public auth?: boolean;
}

export class QueriesUserDto extends QueryUserDto {
	@IsEmail()
	@IsOptional()
	public email?: string;

	@IsString()
	@IsOptional()
	public username?: string;

	@IsBoolean()
	@IsOptional()
	public isActive?: boolean;
}
