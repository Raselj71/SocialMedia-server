import prisma from "../../db/connectdb.js";
import bcrypt from "bcrypt";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userData = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (userData && password) {
      const isMatch = await bcrypt.compare(
         password,
        userData.password
      );

      if (isMatch) {

        const user={id: userData.id.toString(),  
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          bio: userData.bio,
          profilePicture: userData.profilePicture,
          createdAt: userData.createdAt,
          updatedAt: userData.updatedAt}
    
          return res.status(200).json(user)
          
    
      } else {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

    }

  }catch(error){
        console.log(error)
  }
  
};

export const signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password, gender, dateOfBirth } =
      await req.body;

    const encryptedPassword = await bcrypt.hash(password, 10);

    const existuser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existuser) {
      return res.status(409).json({
        data: "user already exist",
        status: 409,
      });
    }
    const user = await prisma.user.create({
      data: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: encryptedPassword,
        gender: gender,
        dateofbirth: dateOfBirth,
      },
    });

    res.status(201).json({ data: user, status: 201 });
  } catch (error) {
     console.log(error)
  }
};

export const logininfo=async(req,res)=>{
       try {
            const user=await prisma.findUnique({
              where:{
                 id:parseInt(req.params.id)
              },
              

            })

            console.log(user)

            return res.status(200).json({message:id,})
        
       } catch (error) {
        
       }
}
