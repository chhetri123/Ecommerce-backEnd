const layout=require('../layout')

module.exports=({req})=>{
    return  layout({content:` 
    
    <div>
        ${req.session.userId}
        <form method="POST">
            <input name="email" type="text" placeholder="email" />
            <input name="password" type="password" placeholder="password" />
            <input name="passswordConform"  type="password"  placeholder="conform password" />
            <button>Sign up</button>
        </form>
        </div>`,header:'Sign Up'})
}