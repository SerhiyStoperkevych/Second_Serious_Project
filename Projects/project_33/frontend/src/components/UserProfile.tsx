import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface User {
  _id: string;
  username: string;
  profilePicture: string;
  bio?: string;
  followers: string[];
  following: string[];
}

const UserProfile: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/api/auth/users/${userId}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  if (loading) return <p>Loading...</p>;

  return user ? (
    <div className="flex flex-col items-center">
      <img
        src={user.profilePicture || '/default-profile.jpg'}
        alt={user.username}
        className="w-24 h-24 rounded-full mb-4"
      />
      <h2 className="text-2xl font-bold">{user.username}</h2>
      {user.bio && <p className="text-center">{user.bio}</p>}
      <div className="flex space-x-4 mt-4">
        <p>{user.followers.length} Followers</p>
        <p>{user.following.length} Following</p>
      </div>
    </div>
  ) : (
    <p>User not found.</p>
  );
};

export default UserProfile;
