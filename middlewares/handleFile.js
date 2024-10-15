

// const handleFile =  (fieldName, model, path) => {
//     return async (req, res, next) => {
//         const id = req.params.id
//         console.log(req.file)
//         console.log(req.body)

//         if (!req.file) {
//           console.log("No file specified");
//           req.body[fieldName] = null;

//           next()
//         } else {
//           console.log("File received: ", req.file.filename);
//           req.body[fieldName] = req.file.filename;
      
//           //deleting prev file
//           try {
//             const doc = await model.findById({_id: id})

//             const prevFile = doc[fieldName]
            
//             if (doc && prevFile) {
//                 const oldFilePath = path.join(__dirname, "../public", path, prevFile); // Adjust path if necessary
//                 if (fs.existsSync(oldFilePath)) {
//                   fs.unlinkSync(oldFilePath); // Deletes the old file
//                   console.log("Old File deleted:", prevFile);
//                   next()
//                 }
//               } else {
//                  throw new Error("Couldnt find doc")
//               }
            
//           } catch (error) {
//             return res.status(500).json({message: error.message});
//           }
          
//         }
//     }
// };

// module.exports = handleFile
