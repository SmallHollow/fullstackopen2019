const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.length === 0 ? 0 : blogs.reduce((sum,blog) => (sum+blog.likes),0)
}

const favoriteBlog = (blogs) => {
  return {
    title: "foo",
    author: "boo",
    likes: 0
  }
}

module.exports = {
  dummy, favoriteBlog, totalLikes
}
