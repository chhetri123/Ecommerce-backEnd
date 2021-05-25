const express=require('express')

const userRepo =require('../../repositories/user')

 const router=express.Router()
router.get('/signup', (req, res) => {
  res.send(`
        <div>
        ${req.session.userId}
        <form method="POST">
            <input name="email" type="text" placeholder="email" />
            <input name="password" type="password" placeholder="password" />
            <input name="passswordConform"  type="password"  placeholder="conform password" />
            <button>Sign up</button>
        </form>
        </div>    
      `);
});

router.post('/signup', async (req, res) => {
  //   get access to email password passswordConform
  const { email, password, passswordConform } = req.body;

  const existingUser = await userRepo.getOneBy({ email });
  if (existingUser) {
    return res.send('Email in use');
  }
  if (password !== passswordConform) {
    return res.send('password must match');
  }
  const user=await userRepo.create({email,password});

req.session.userId=user.id

  res.send('accound created');
});
router.get('/signout',(req,res)=>{
req.session=null;
res.send("You are logged out")



})

router.get('/signin',(req,res)=>{
  res.send(`
   <div>
        <form method="POST">
            <input name="email" type="text" placeholder="email" />
            <input name="password" type="password" placeholder="password" />
            <button>Sign In</button>
        </form>
        </div>  `)
})
router.post('/signin',async (req,res)=>{
const {email,password}=req.body
const user=await userRepo.getOneBy({email})

if(!user){
  return res.semd("email not found")
}

const validPassword =await userRepo.comparePassword(
  user.password,password
)
if(!validPassword){
  return res.send("Invalid passsword")
} 
req.session.userId=user.id;
res.send("you are signed in")

})
module.exports=router;