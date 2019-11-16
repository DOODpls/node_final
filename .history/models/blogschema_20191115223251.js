const mongoose = require('mongoose');
const blogschema = new mongoose.Schema(
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
    },
    slug: {
      type: String,
      required: true
    }
  }
);


const blogschemas = mongoose.model('bloglists', blogschema);

module.exports = blogschemas;