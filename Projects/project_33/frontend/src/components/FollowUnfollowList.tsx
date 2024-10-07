import React, { useState, useEffect } from 'react'; 
import axios from 'axios';
import { Link } from 'react-router-dom';

interface User {
  _id: string;
  username: string;
  profilePicture: string;
  followers: string[];
}

interface UserProfile {
  _id: string;
  username: string;
  following: string[];
}

const FollowUnfollowList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersResponse = await axios.get('/api/auth/users');
        const currentUserResponse = await axios.get('/api/auth/me');

        setUsers(usersResponse.data);
        setCurrentUser(currentUserResponse.data.user);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleFollow = async (userId: string) => {
    try {
      await axios.post(`/api/auth/follow/${userId}`);
      setCurrentUser((prev) =>
        prev && {
          ...prev,
          following: [...prev.following, userId],
        }
      );
    } catch (error) {
      console.error('Error following user:', error);
    }
  };

  const handleUnfollow = async (userId: string) => {
    try {
      await axios.post(`/api/auth/unfollow/${userId}`);
      setCurrentUser((prev) =>
        prev && {
          ...prev,
          following: prev.following.filter((id) => id !== userId),
        }
      );
    } catch (error) {
      console.error('Error unfollowing user:', error);
    }
  };

  if (loading) return <p>Loading users...</p>;

  const filteredUsers = users.filter((user) => user._id !== currentUser?._id);

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-6">Users</h2>
      {filteredUsers.map((user) => (
        <div key={user._id} className="flex items-center mb-4 w-full max-w-md">
          <img
            src={user.profilePicture || '/default-profile.jpg'}
            alt={user.username}
            className="w-12 h-12 rounded-full mr-4"
          />
          <h3 className="text-lg font-semibold">{user.username}</h3>
          <Link to={`/profile/${user._id}`} className="flex items-center flex-grow">
            <h2
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >Profile</h2>
          </Link>
          {currentUser?.following.includes(user._id) ? (
            <button
              onClick={() => handleUnfollow(user._id)}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Unfollow
            </button>
          ) : (
            <button
              onClick={() => handleFollow(user._id)}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Follow
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default FollowUnfollowList;
