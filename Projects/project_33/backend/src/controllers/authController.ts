import { Request, Response } from 'express';
import User from '../models/userModel';
import { Session } from 'express-session';

// Extend the Request interface to include the custom session type
interface CustomRequest extends Request {
    session: Session & { userId?: string }; // Extend session with userId
}

// Register User
export const register = async (req: CustomRequest, res: Response) => {
    const { username, email, password } = req.body;

    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = new User({ username, email, password });
        await user.save();

        req.session.userId = user._id.toString();  // Ensure it's a string
        res.status(201).json({ message: 'User registered successfully', userId: user._id });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
};

// Login User
export const login = async (req: CustomRequest, res: Response) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user || user.password !== password) { // Added password comparison
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        req.session.userId = user._id.toString(); // Store userId in session
        res.status(200).json({ message: 'Logged in successfully', userId: user._id });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
};

// Logout User
export const logout = (req: CustomRequest, res: Response) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: 'Error logging out' });
        }
        res.status(200).json({ message: 'Logged out successfully' });
    });
};

export const getUserById = async (req: CustomRequest, res: Response) => {
    try {
      const user = await User.findById(req.params.id).select('-password');
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching user profile', error });
    }
  };

// Fetch Current User
export const getCurrentUser = async (req: CustomRequest, res: Response) => {
    try {
        const user = await User.findById(req.session.userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching current user', error });
    }
};

// Fetch All Users
export const getAllUsers = async (req: CustomRequest, res: Response) => {
    try {
        const users = await User.find().select('-password');  // Remove the exclusion of the current user
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
};

// Follow User
export const followUser = async (req: CustomRequest, res: Response) => {
    try {
        const userToFollow = await User.findById(req.params.id);
        const currentUser = await User.findById(req.session.userId);

        if (userToFollow && currentUser && !currentUser.following.includes(userToFollow._id)) {
            currentUser.following.push(userToFollow._id);
            await currentUser.save();

            userToFollow.followers.push(currentUser._id);
            await userToFollow.save();

            res.status(200).json({ message: 'Followed user successfully' });
        } else {
            res.status(400).json({ message: 'Error following user' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error following user', error });
    }
};

// Unfollow User
export const unfollowUser = async (req: CustomRequest, res: Response) => {
    try {
        const userToUnfollow = await User.findById(req.params.id);
        const currentUser = await User.findById(req.session.userId);

        if (userToUnfollow && currentUser) {
            currentUser.following = currentUser.following.filter(id => id.toString() !== userToUnfollow._id.toString());
            await currentUser.save();

            userToUnfollow.followers = userToUnfollow.followers.filter(id => id.toString() !== currentUser._id.toString());
            await userToUnfollow.save();

            res.status(200).json({ message: 'Unfollowed user successfully' });
        } else {
            res.status(400).json({ message: 'Error unfollowing user' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error unfollowing user', error });
    }
};

export const updateUserProfile = async (req: CustomRequest, res: Response) => {
    const { username, email, bio, profilePicture, coverPhoto } = req.body;
  
    try {
      const user = await User.findById(req.session.userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Update fields only if they are provided in the request
      if (email) {
        user.username = username
        user.email = email
        user.bio = bio
        user.profilePicture = profilePicture
        user.coverPhoto = coverPhoto
    };
  
      await user.save();
  
      res.status(200).json({ message: 'Profile updated successfully', user });
    } catch (error) {
      res.status(500).json({ message: 'Error updating profile', error });
    }
  };