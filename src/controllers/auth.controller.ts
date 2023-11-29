import { Request, Response } from 'express';
import { pool } from '../db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../config';


export const createUser = async (
  req: Request,
  res: Response
) => {
  const { name, lastname, email, password, birthday, mobile, emergencyphone } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  console.log(req.body)
  try {
    const row = await pool.query(
      "INSERT INTO users ( name, lastname, email, password, birthday, mobile, emergencyphone) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [name, lastname, email, hash, birthday, mobile, emergencyphone]
    );

    const newUser = {
      id: (row as any).insertId,
      name,
      lastname,
      email,
      birthday,
      mobile,
      emergencyphone
    };

    res.send({
      status: 200,
      data: newUser
    });

  } catch (error) {
    console.error('Error creating account', error);

    res.status(500).json({
      ok: false,
      msg: error
    });

  };
};


export const login = async (
  req: Request,
  res: Response
) => {
  const { username, password } = req.body;
  try {

    const [row]: any[] = await pool.query(
      "SELECT * FROM users WHERE email = ?",
      [username]
    );

    if (row.length === 0) {
      return res.json({
        status: 401,
        msg: 'Invalid username'
      });
    }

    const validPassword = await bcrypt.compare(password, row[0].password);

    if (!validPassword) {
      return res.json({
        status: 401,
        msg: 'Invalid username'
      });
    }
    const token = jwt.sign({
      username: row[0].username,
    }, SECRET_KEY, { expiresIn: '1h' })

    res.json({
      status: 200,
      data: {
        id: row[0].id,
        name: row[0].name,
        lastname: row[0].lastname,
        email: row[0].email,
        birthday: row[0].birthday,
        mobile: row[0].mobile,
        emergencyphone: row[0].emergencyphone,
        token: token
      }
    });
  } catch (error) {
    console.error('Error logging in', error);
    res.status(500).json({
      msg: error
    });
  };
};

export const updateUsersById = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  const { name, lastname, email, birthday, mobile, emergencyphone } = req.body;
  try {
    const [result]: any[] = await pool.query(
      "UPDATE users SET name = IFNULL( ?, name ), lastname = IFNULL( ?, lastname ), email = IFNULL( ?, email ), birthday = IFNULL( ?, birthday ), mobile = IFNULL( ?, mobile ), emergencyphone = IFNULL( ?, emergencyphone ) WHERE id = ?",
      [name, lastname, email, birthday, mobile, emergencyphone, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).send({ message: 'User not found' });
    }
    const [rows]: any[] = await pool.query(
      'SELECT * FROM users WHERE id = ?',
      [id]
    );
    res.send({
      status: 200,
      data: rows[0]
    });

  } catch (error) {
    console.error('Error updating account', error);

    res.status(500).json({
      ok: false,
      msg: error
    });

  };
}

export const getUsersById = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  try {
    const [rows]: any[] = await pool.query(
      'SELECT * FROM users WHERE id = ?',
      [id]
    );
    let user = {
      id: rows[0].id,
      name: rows[0].name,
      lastname: rows[0].lastname,
      email: rows[0].email,
      birthday: rows[0].birthday,
      mobile: rows[0].mobile,
      emergencyphone: rows[0].emergencyphone
    
    }
    res.send({
      status: 200,
      data: user
    });

  } catch (error) {
    console.error('Error getting user', error);

    res.status(500).json({
      ok: false,
      msg: error
    });

  };
}