const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.length === 0
    ? 0
    : blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  let temp = {
    title: '',
    author: '',
    likes: 0,
  };

  let max = 0;
  blogs.forEach((blog) => {
    if (blog.likes > max) {
      temp = {
        title: blog.title,
        author: blog.author,
        likes: blog.likes,
      };
      max = blog.likes;
    }
  });

  return temp;
};

// 4.6*: apufunktioita ja yksikkötestejä, step4

const mostBlogs = (blogs) => {
  const blogAuthors = new Set([...blogs.map((blog) => blog.author)]);
  const blogArray = [...blogAuthors].map((author) => {
    return {
      author: author,
      blogs: blogs.reduce((acc, cur) => {
        return author === cur.author ? acc + 1 : acc;
      }, 0),
    };
  });
  let theBlog = blogArray[0];
  blogArray.forEach((blog) => {
    if (blog.blogs > theBlog.blogs)
      theBlog = blog;
  })
  return theBlog;
};

// 4.7*: apufunktioita ja yksikkötestejä, step5

const mostLikes = (blogs) => {
  const blogAuthors = new Set([...blogs.map((blog) => blog.author)]);
  const blogArray = [...blogAuthors].map((author) => {
    return {
      author: author,
      likes: blogs.reduce((acc, cur) => {
        return author === cur.author ? acc + cur.likes : acc;
      }, 0),
    };
  });
  let theBlog = blogArray[0];
  blogArray.forEach((blog) => {
    if (blog.likes > theBlog.likes)
      theBlog = blog;
  })
  return theBlog;
};

module.exports = {
  dummy,
  favoriteBlog,
  totalLikes,
  mostBlogs,
  mostLikes,
};
