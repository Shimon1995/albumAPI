export class FindUserDTO {
  username: string;
  options?: {
    email: string;
    firstName: string;
    lastName: string;
  };
}
