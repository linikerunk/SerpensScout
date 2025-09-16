import React from 'react'

const PostCard = ({ post }) => {
  return (
    <article className="card group cursor-pointer">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h4 className="text-xl font-semibold text-scout-900 mb-2 group-hover:text-scout-700 transition-colors">
            <a href="#" className="hover:text-scout-600 transition-colors">
              {post.title}
            </a>
          </h4>
          <p className="text-scout-600 mb-4">
            {post.description}
          </p>
          <div className="flex items-center text-sm text-scout-500">
            <span>{post.readTime}</span>
          </div>
        </div>
      </div>
    </article>
  )
}

export default PostCard
