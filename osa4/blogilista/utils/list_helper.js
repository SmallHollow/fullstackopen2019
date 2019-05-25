const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.length === 0 ? 0 : blogs.reduce((sum,blog) => (sum+blog.likes),0)
}

const favoriteBlog = (blogs) => {
  let temp = {
      title: '',
      author: '',
      likes: 0
    }

  let max = 0
  blogs.forEach(blog => {
    if (blog.likes > max) {
      temp = {
        title: blog.title,
        author: blog.author,
        likes: blog.likes
      }
      max = blog.likes
    }
  })

  return temp
}

module.exports = {
  dummy, favoriteBlog, totalLikes
}
