export class UserDTO {
    constructor(user) {
        this.id = user._id;
        this.name = user.name;
        this.lastname = user.lastname;
        this.email = user.email;
        this.role = user.role;
        this.age = user.age;
        this.createdAt = user.createdAt;
        this.updatedAt = user.updatedAt;
        this.password = user.password; 
    }
}
