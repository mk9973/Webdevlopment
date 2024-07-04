import { ApplicationError } from "../../error-handler/applicationError.js";
import { getDB } from "../../config/mongodb.js";
export default class UserModel{
    constructor(name, email, password, type,id){
        this.name=name;
        this.email=email;
        this.password=password;
        this.type=type;
        //here we use '_id' to match with mongo db '_id' because of conflict
        this._id=id;
    }

    // static async signUp(name, email, password, type){
    //     //here we are using mongo database
    //     //in asynchronous operation we should always use 'try'- 'catch' block
    //     try{
    //     //1. Get the database
    //     const db= getDB();
    //     //2. Get the coleection
    //     const collection=db.collection("users");
    //     const newUser = new UserModel(
    //         name,
    //         email,
    //         password,
    //         type
    //         );
        
    //     //3. Insert the document.
    //     await collection.insertOne(newUser)
    //         return newUser;
    //     }catch(err){
    //         throw new ApplicationError("Something went wrong",500);
    //     }

        //here we have used array for store the data
        // const newUser = new UserModel(
        // name,
        // email,
        // password,
        // type
        // );
        // newUser.id=users.length +1;
        // users.push(newUser);
        // return newUser;
    // }

    // static signIn(email, password){
    //     const user = users.find((u)=> u.email==email && u.password==password);
    //     return user;
    // }

    static getAll(){
        return users;
    }
}

let users =[{
    id: 1,
    name: 'Seller User',
    email: 'seller@ecom.com',
    password: 'Password1',
    type: 'seller',
},
{
    id: 2,
    name: 'Customer User',
    email: 'customer@ecom.com',
    password: 'Password1',
    type: 'customer',
},
];