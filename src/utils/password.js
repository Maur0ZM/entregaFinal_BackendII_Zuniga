import bcrypt from 'bcrypt';
//Hasheo password
export const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

//Verificación de password
export const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password);
