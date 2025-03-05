import { User } from "../../models/index";
import { check } from "../../utils/index";

class UserAuth{
    async signupUser (name, email, password){
        
        check(!name || !email || !password, 400, "All field are required")
        let existUser = await User.findOne({email})

        check(existUser, 400, "User already exist")

        await User.create({
            name,
            email,
            password
        })
    }
}

export { UserAuth }
