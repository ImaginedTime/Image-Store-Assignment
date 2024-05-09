import bcrypt from 'bcryptjs';
import User from '../models/user.js';

import { generateJWT, parseToken } from '../utils/token.js';

export const login = async (req, res) => {
    const { email, password } = req.body;
    
    // check if user exists
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(404).send({
            message: 'User not found'
        });
    }

    // verify the user password
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
        return res.status(400).send({
            message: 'Invalid password'
        });
    }

    const token = generateJWT({ id: user._id });

    return res.status(200).send({
        message: 'Login successful',
        token,
    });
}

export const register = async (req, res) => {
    const { name, email, password } = req.body;

    // check if user exists
    const exists = await User.findOne({ email });

    if (exists) {
        return res.status(400).send({
            message: 'User already exists'
        });
    }

    // hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
        name,
        email,
        password: hashedPassword
    });

    const token = generateJWT({ id: user._id });

    try {
        await user.save();
        return res.status(201).send({
            message: 'User created successfully',
            token,
        });
    } catch (error) {
        return res.status(500).send({
            message: 'Error creating user'
        });
    }
}

export const getUser = async (req, res) => {
    const token = parseToken(req);
    const user = await User.findById(token.id);

    if (!user) {
        return res.status(404).send({
            message: 'User not found'
        });
    }

    // remove the password, and the id from the user object
    user.password = undefined;
    user._id = undefined;

    return res.status(200).send(user);
}