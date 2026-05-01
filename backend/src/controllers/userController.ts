import { Request, Response } from 'express';
import User from '../models/User';

export const getUsers = async (req: Request, res: Response) => {
  try {
    res.json(await User.find({}, '-password').sort({ createdAt: -1 }));
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { username, password, role, roleName, permissions } = req.body;
    if (await User.findOne({ username }))
      return res.status(400).json({ message: 'Username already exists' });

    const user = await new User({ 
      username, 
      password, 
      role: role || 'admin',
      roleName: roleName || 'Admin', 
      permissions: permissions || ['dashboard', 'website', 'team', 'system', 'logs'] 
    }).save();
    
    res.status(201).json({ 
      message: 'User created', 
      user: { 
        username: user.username, 
        role: user.role, 
        roleName: user.roleName, 
        permissions: user.permissions, 
        id: user._id 
      } 
    });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { username, password, role, roleName, permissions } = req.body;
    const updateData: any = {};
    if (username) updateData.username = username;
    if (password) updateData.password = password;
    if (role !== undefined) updateData.role = role;
    if (roleName !== undefined) updateData.roleName = roleName;
    if (permissions !== undefined) updateData.permissions = permissions;

    const user = await User.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    res.json({ 
      message: 'User updated', 
      user: { 
        username: user.username, 
        role: user.role, 
        roleName: user.roleName, 
        permissions: user.permissions, 
        id: user._id 
      } 
    });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted successfully' });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
