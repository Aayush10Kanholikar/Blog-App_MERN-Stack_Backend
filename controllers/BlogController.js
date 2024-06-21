import blogModel from "./../models/blogModel.js";

class BlogController {
  static getAllBlogs = async (req, res) => {
    try {
      const fetchAllBlog = await blogModel.find({user: req.user._id});
      return res.status(200).json({ fetchAllBlog });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };
  static addnewBlog = async (req, res) => {
    const { title, category, description } = req.body;
                              
    try {
      if (title && category && description) {
        const addBlog = new blogModel({
          title: title,
          description: description,
          category: category,
          thumbnail: req.file.filename,
          user: req.user._id,
        });
        const savedBLog = await addBlog.save();
        if(savedBLog){
        return res.status(200).json({ message: "New Blog Added Successfully" });

        }
        else{
        return res.status(400).json({ message: "Blog not added" });

        }
      } else {
        return res.status(400).json({ message: "All fields are required" });
      }
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };
  static getsingleBlog = async (req, res) => {
    const {id} =req.params
    try {
        if(id){
            const fetchBlogByID = await blogModel.findById(id)
      return res.status(200).json(fetchBlogByID);

        }
        else{
      return res.status(400).json({ message: "Invalid URL"});

        }
        
    } catch (error) {
      return res.status(400).json({ message: error.message });
        
    }
  };
}

export default BlogController;
