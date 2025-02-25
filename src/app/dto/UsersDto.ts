export class UsersDto {
  id: number;
  firstName?: string;
  lastName?: string;
  password?: string;
  email?: string;
  address?: string;
  imageUrl?: string;
  role?: string;
  phoneNumber?: string;

  constructor(
    id: number,
    firstName?: string,
    lastName?: string,
    password?: string,
    email?: string,
    address?: string,
    imageUrl?: string,
    role?: string,
    phoneNumber?: string
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.password = password;
    this.email = email;
    this.address = address;
    this.imageUrl = imageUrl;
    this.role = role;
    this.phoneNumber = phoneNumber;
  }
}