import bcrypt  from 'bcrypt';

import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';


import User from "../model/user.js";
import Token from "../model/token.js";


dotenv.config();

export  const SignupUser = async (request, response) => {

      const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(request.body.password, salt);
    const user = new User({
        name: request.body.name,
        email: request.body.email,
        password: hashedPassword,
      
    });
    try {

       await user.save();
        return response.status(200).json({message: 'signup successfully'});

    } catch (error) {
        return response.status(500).json({message: 'Got Eror In signup'})

    }

}

export const LoginUser = async (request, response) => {
    let user = await User.findOne({email:request.body.email});

    if(!user){
        return response.status(400).json({message: 'Email does not matched'});

    }
    try{
     let match = await bcrypt.compare(request.body.password, user.password);
       if(match){
            const accessToken = jwt.sign(user.toJSON(),process.env.ACCESS_SECRET_KEY, {expiresIn: '15m'});
            const refreshToken =jwt.sign(user.toJSON(),process.env.REFRESH_SECRET_KEY);

           const token = new Token({token: refreshToken});
           await token.save();

           return response.status(200).json({
             accessToken: accessToken,
             refreshToken: refreshToken,
             name: user.name,
             email: user.email
            });

       }else{
        return response.status(400).json({message: 'Password not Matched'});
       }
    }catch (error){

        return response.status(500).json({message:'Error while Login'});
    }
}

