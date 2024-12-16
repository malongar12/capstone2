const express = require('express')
const jwt = require('jsonwebtoken');





const verifyToken = (req, res, next) => {

  try {

    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(403).json({ message: 'Token is required' });
      }
        

      jwt.verify(token, "mySecret", (error, decoded) => {
        if (error) {
          console.log(error)
          return res.status(401).json({ message: 'Unauthorized' });
        }
        
      })

      next()
    
  
      



    
  } catch (error) {
    console.log(error)
  }
   
        
}



module.exports = verifyToken;
