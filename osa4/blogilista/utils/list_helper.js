const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0
  } else if (blogs.length === 1) {
    return blogs[0].likes
  } else {
    likeCount = 0
    blogs.forEach(blog => {
      likeCount += blog.likes
    })
    return likeCount
  }
}

module.exports = {
  dummy, totalLikes
}
