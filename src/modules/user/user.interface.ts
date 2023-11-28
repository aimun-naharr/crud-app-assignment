type TFullName = {
  firstName: string;
  lastName: string;
};
type TAddress = {
  street: string;
  city: string;
  country: string;
};

type TUser = {
  userId: number;
  username: string;
  password: string;
  fullname: TFullName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: TAddress;
  //  Todo: orders
};

export default TUser;
