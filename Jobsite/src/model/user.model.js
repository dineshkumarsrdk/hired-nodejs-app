export default class UserModel {
    constructor(id, name, email, password) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password
    }
    // user registration
    static registerUser(user) {
        // const {name, email, password} = user;
        const userExist = users.find(u => u.email === user.email);
        if(userExist){
            return false;
        } else {
            // destructuring the user object
            const {name, email, password} = user;
            const newUser = new UserModel(users.length+1, name, email, password);
            users.push(newUser);
            return true;
        }
    }
    // user login
    static loginUser(user) {
        const userRegistered = users.find(u => u.email === user.email && u.password === user.password);
        if(userRegistered){
            return userRegistered;
        }
    }
}

const users = [];