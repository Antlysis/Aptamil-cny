interface AuthData {
  [key: string]: string;
}
export const checkInputFormat = (data: AuthData) => {
  const { name, phone, email, password } = data;
  let field = null;
  let message = null;
  let result = true;

  if (name) {
    const nameRegex = /^[a-zA-Z ]+$/;
    if (!nameRegex.test(name)) {
      field = 'name';
      message = 'Please avoid using special characters in "Name" input field';
      result = false;
    }
  }
  if (phone) {
    const numberRegex = /^(1)[0-46-9]([0-9]){7,8}$/;
    if (!numberRegex.test(phone)) {
      field = 'number';
      message = 'You have entered an invalid phone number';
      result = false;
    }
  }
  if (email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      field = 'email';
      message = 'You have entered an invalid email address';
      result = false;
    }
  }
  if (password) {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      field = 'password';
      message =
        'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character';
      result = false;
    }
  }
  return { result, field, message };
};
