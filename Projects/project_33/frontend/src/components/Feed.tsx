import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Post {
  id: string;
  text: string;
  imageUrl?: string;
  videoUrl?: string;
  likes: number;
  comments: { user: string, comment: string }[];
}

const Feed: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('/api/posts');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="w-full max-w-lg mx-auto">
      {posts.map((post) => (
        <div key={post.id} className="bg-white p-4 rounded-lg shadow-lg mb-4">
          <p>{post.text}</p>
          {post.imageUrl && <img src={post.imageUrl} alt="Post" className="w-full mt-4" />}
          {post.videoUrl && <video src={post.videoUrl} controls className="w-full mt-4" />}
          <div className="flex justify-between items-center mt-4">
            <button className="bg-blue-500 text-white px-3 py-1 rounded">Like</button>
            <button className="bg-gray-500 text-white px-3 py-1 rounded">Comment</button>
            <button className="bg-green-500 text-white px-3 py-1 rounded">Share</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Feed;
