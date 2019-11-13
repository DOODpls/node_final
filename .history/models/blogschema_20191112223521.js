const mongoose = require('mongoose');
const blggschema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true
    },
    date: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    blog_cont: {
      type: String,
      required: true
    }
  }
);


const blogschema = mongoose.model('blogList', blogschema);

module.exports = blogschema;