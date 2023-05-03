const AuthorModel = require('../models/authorModel')
const BlogModel = require('../models/blogModel')
 const {isValidObjectId} = require('mongoose')

// CREATING NEW BLOGS
let createNewBlog = async function (req, res) {
    try {
        res.setHeader('Access-Control-Allow-Origin','*')

        let data = req.body
        let { title, body, authorId, tags, category, subcategory} = data

        if (Object.keys(data).length == 0)
            return res.status(400).send({ status: false, msg: "Data is required to create a blog." })

        if (!title || !body || !tags || !category || !subcategory)
            return res.status(400).send("All fields are required.")

      
        if (!isValidObjectId(authorId))
            return res.status(400).send({ status: false, msg: "auhtorId is invalid." })

        let findAuthor = await AuthorModel.findById(authorId)
        if (!findAuthor)
            return res.status(404).send({ status: false, msg: "Author with the given AuthorId does not exists." })


        let saveData = await BlogModel.create(data)
        res.status(201).send({ status: true, msg: saveData })
    } catch (error) {
        return res.status(500).send({ msg: error.message })
    }
}


 
const getAllBlogs = async function (req, res) {
    try {
        res.setHeader('Access-Control-Allow-Origin','*')

        const blogs = await BlogModel.find({ isDeleted: false, isPublished: true })
        if (blogs.length==0) {
            return res.status(404).send({ status: false, msg: 'No data exists' })
        }
        return res.status(200).send({ status: true, data: blogs })
    }
    catch (err) {
        return res.status(500).send({ status: false, error: err.message })
    }

}


 
const getBlogs = async function (req, res) {
    try {
res.setHeader('Access-Control-Allow-Origin','*')
const w= Object.keys(req.query)
if(!["tags","category",'subCategory',"title","body"].includes(...w)) return res.status(400).send({msg:"query should tags category subCategory title body only"})

        let data = req.query
        data.isDeleted = false
        data.isPublished = true
                          
        const blog = await BlogModel.find(data)
        if(blog.length==0){
            return res.status(404).send({status : false, msg : 'Blog does not exists'})
        }
        return res.status(200).send({status : true, data : blog})
    }
    catch(err){
        return res.status(500).send({status : false, error : err.message})
    }
}


 
let updateBlog = async function (req, res) {
    try {
        res.setHeader('Access-Control-Allow-Origin','*')

            const blogId = req.params.blogId;
            let data = req.body;

        if (!isValidObjectId(blogId)) {
              return res.status(400).send({ status: false, msg: 'Invalid Object Id' })
            }
       
         
        let blog = await BlogModel.findById(blogId)
        if (!blog) return res.status(404).send({ status: false, msg: "Blog does not exist." })

         
        

        let updatedBlogs = await BlogModel.findOneAndUpdate({ _id: blogId },
            {
                title: data.title,
                body: data.body,
                category: data.category,
                isPublished:data.isPublished,
                publishedAt: new Date(),
                $push: { tags: data.tags, subCategory: data.subCategory }
            },
            { new: true })

        return res.status(200).send({ status: true, msg: updatedBlogs })
    } catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}



 
const deleteBlog = async function (req, res) {
    try {

        const blogId = req.params.blogId
        if (!isValidObjectId(blogId)) {
            return res.status(400).send({ status: false, msg: 'Invalid Object Id' })
        }

        const findBlog = await BlogModel.findById(blogId)
        if (!findBlog) { return res.status(404).send({ status: false, msg: "" }) }


          await BlogModel.findByIdAndUpdate(blogId, {
            $set: {
                isDeleted: true,
                deletedAt: new Date(),
                isPublished:false
            }
        }, { new: true })
        return res.status(200).send({ msg:" " })

    }
    catch (err) {
        return res.status(500).send({ status: false, error: err.message })
    }
}


 
let deleteAllBlogs = async function (req, res) {
    try {

const w= Object.keys(req.query)

if(!["tags","category",'subCategory',"title","body","authorId"].includes(...w)) return res.status(400).send({msg:"query should tags category subCategory title body only"})
   

        let data = req.query
        data.authorId=req.decodeToken
        // data.isDeleted=false
    
      let findBlogs = await BlogModel.find(data)
      if (findBlogs.length==0) return res.status(404).send({ status: false, msg: "data is not present in db according to your qwery." })
      
      let dataa= findBlogs.filter(a=>a.isDeleted==false)
      if(dataa.length==0) return res.status(400).send({msg:"already blogs has been deleted"})
 
        let deleteBlogs = await BlogModel.updateMany(data,{ isDeleted : true,isPublished:false, deletedAt: new Date() })
        return res.status(200).send({ status: true, deleteBlogs, msg: "blogs deleted successfully." })
    } catch (error) {
        return res.status(500).send({ msg: error.message })

    }
}

 



module.exports.createNewBlog = createNewBlog
module.exports.getAllBlogs = getAllBlogs
module.exports.getBlogs = getBlogs
module.exports.updateBlog = updateBlog
module.exports.deleteAllBlogs = deleteAllBlogs
module.exports.deleteBlog = deleteBlog

 
 
 



