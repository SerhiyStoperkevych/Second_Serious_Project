import React, { useState } from 'react';
import axios from 'axios';

const CreatePost: React.FC = () => {
  const [postText, setPostText] = useState('');
  const [postImage, setPostImage] = useState<File | null>(null);
  const [postVideo, setPostVideo] = useState<File | null>(null);

  // Handle form submission to create a new post
  const handlePostSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('text', postText);
    if (postImage) formData.append('image', postImage);
    if (postVideo) formData.append('video', postVideo);

    try {
      await axios.post('/api/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // Clear the form
      setPostText('');
      setPostImage(null);
      setPostVideo(null);
      // Optionally refresh feed after posting
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <form onSubmit={handlePostSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
      <textarea
        value={postText}
        onChange={(e) => setPostText(e.target.value)}
        placeholder="What's on your mind?"
        className="w-full p-2 border rounded mb-4"
      />
      <div className="flex items-center mb-4">
        <label className="block mr-4">Image</label>
        <input type="file" accept="image/*" onChange={(e) => setPostImage(e.target.files?.[0] || null)} />
      </div>
      <div className="flex items-center mb-4">
        <label className="block mr-4">Video</label>
        <input type="file" accept="video/*" onChange={(e) => setPostVideo(e.target.files?.[0] || null)} />
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">Post</button>
    </form>
  );
};

export default CreatePost;
