const router = require("express").Router();
const db = require("../model/db")
const jwt = require('jsonwebtoken');
const verifyToken = require("../middleWare/auth")


const path = require('path');
const multer = require('multer');


const storage = multer.diskStorage({
  destination: "./uploads",
  filename: function(req, file, cb) { 
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname))
  }
});

const upload = multer({
  storage: storage
}).single("file");



//get all posts

router.get("/posts", async(req, res) => {
try {

    let results = await db.query(`SELECT posts.*, users.username
FROM posts
JOIN users ON posts.user_id = users.id;
`)

    if (results.rows.length === 0) {
        res.send("no post avalible")
        
    }
     
    let posts = results.rows

    res.json({posts})
    


} catch (error) {
    console.log(error.message)
}
    



})




//get a specific post by id

router.get("/post/:id", async(req, res) =>{
    try {
        const id = parseInt(req.params.id)
        const result = await db.query(`SELECT posts.*, users.username
            FROM posts
            JOIN users ON posts.user_id = users.id
            WHERE posts.id = $1;
            `, [id])
            let post = result.rows[0]
            if (!post) {
                res.status(401).send("no post found")
                
            }

            res.json(post)
        
    } catch (error) {
        console.log(error.message)
    }
})




//create a post



router.post('/create/post',  upload,  verifyToken, async (req, res) => {
        try {
            const { title, content } = req.body;
          const file = req.file;
          const token = req.headers.authorization.split(" ")[1];
          const validToken = jwt.decode(token);
      
          if (!title || !content || !file) {
            return res.status(400).json({ error: "Missing required fields" });
          }
      
          if (!validToken) {
            return res.status(401).json({ error: "Invalid token" });
          }else{

            const userId = validToken.id;
          const img = file.filename;
      
          await db.query(
            `INSERT INTO posts(title, content, img, user_id) 
              VALUES ($1, $2, $3, $4) `,
            [title, content, img, userId]
          );

      
          res.json({message:"Post created successfully"});



          }
      

        } catch (error) {
          console.error(error);
          res.status(500).json({ error: "Internal Server Error" });
        }
      });




      // delete a specific post

      router.delete("/post/delete/:id", verifyToken, async(req, res) => {
        try{ 
        const id = parseInt(req.params.id)
        const token = req.headers.authorization.split(" ")[1];
          const validToken = jwt.decode(token);

         let result = await db.query("DELETE FROM posts WHERE id = $1 AND user_id = $2 ", [id, validToken.id])
         if (result.rows === 0) {
          return res.status(404).json({ 
            error: "Post not found or you are not authorized to delete this post" });
         }

         res.status(200).json({message: "Post deleted successfully"})

        }catch(error){
          console.log(error)
          res.status(500).json({error: "something went wrong"})
        }
      })


      //edit a post by a user
    
    router.patch("/post/edit/:id", upload, verifyToken, async(req, res) => {
      const id = parseInt(req.params.id)
      const {title, content} = req.body;
      const file = req.file
      const token = req.headers.authorization.split(" ")[1];
      const validToken = jwt.decode(token);

      try {
        if (!title && !content && !file) {
          return res.send("At least one field must be provided to update")
          
        }

        if (!validToken) {
         return res.json({error: "invalid token"})
        }
  
        else if(title){
          let updateTitle = await db.query("UPDATE posts SET title = $1 WHERE id = $2 AND user_id = $3 RETURNING title", 
            [title, id, validToken.id])
  
            res.json({message: `${updateTitle.rows[0].title} was updated successfully`})
  
        }else if(content){
          let updateContent = await db.query("UPDATE posts SET content = $1 WHERE id $2 AND user_id = $3 RETURNING content",
            [content,id, validToken.id])

            res.json({message: `${updateContent.rows[0].content} was updated successfully`})
        }else if(file){
          const img = file.fieldname
           await db.query("UPDATE posts SET img = $1 WHERE id = $2 AND  user_id = $3",
            [img, id, validToken.id]
  
          )

          res.send("file was updated successfully.")
        }
   


        
      } catch (error) { 
        console.log(error.message)
      }






    })
    


module.exports = router;