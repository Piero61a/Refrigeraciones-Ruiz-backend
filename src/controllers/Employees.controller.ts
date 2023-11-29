import { Request, Response } from 'express';
import { pool } from '../db';

export const getEmployees = async (
  req: Request,
  res: Response
) => {
  try {
    const [rows] = await pool.query("SELECT * FROM employees");
    return res.send({
      status: 200,
      data: rows
    })
  } catch (error) {
    console.error('Error getting employees', error);
    return res.send({
      status: 500,
      msg: 'Server error'
    });
  }
}

export const getEmployeeById = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  try {
    const [rows]: any[] = await pool.query(
      "SELECT * FROM employees WHERE id = ?",
      [id]
    )
    if (rows.length === 0) {
      return res.status(404).json({ msg: 'Employee not found' });
    }
    res.send({
      status: 200,
      data: rows[0]
    });

  } catch (error) {
    console.error('Error getting employee', error);
    return res.status(500).json({ msg: 'Server error' });
  }

}

export const createEmployee = async (
  req: Request,
  res: Response
) => {
  const { body: { name, lastname, mobile, emergencyphone, birthday } } = req;
  try {
    const [rows] = await pool.query(
      "INSERT INTO employees ( name, lastname, mobile, emergencyphone, birthday) VALUES (?, ?, ?, ?, ?)",
      [name, lastname, mobile, emergencyphone, birthday]
    )
    const newClient = {
      id: (rows as any).insertId,
      name,
      lastname,
      mobile,
      emergencyphone,
      birthday
    }
    res.send({
      status: 200,
      data: newClient
    });
  } catch (error) {
    console.error('Error creating employee', error);
    return res.status(500).json({ msg: 'Server error' });
  }
}

export const updateEmployee = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  const { body: { name, lastname, mobile, emergencyphone, birthday } } = req;
  try {
    const [result]: any[] = await pool.query(
      "UPDATE employees SET name = IFNULL( ?, name ), lastname = IFNULL( ?, lastname ), birthday = IFNULL( ?, birthday ), mobile = IFNULL( ?, mobile ), emergencyphone = IFNULL( ?, emergencyphone ) WHERE id = ?",
      [name, lastname, birthday, mobile, emergencyphone, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        msg: 'Employee not found'
      });
    };

    const [rows]: any[] = await pool.query(
      "SELECT * FROM employees WHERE id = ?",
      [id]
    );
    res.send({
      status: 200,
      data: rows[0]
    });

  } catch (error) {
    console.error('Error updating employee', error);
    return res.status(500).json({ msg: 'Server error' });
  }
}

export const deleteEmployee = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  try {
    const [result]: any[] = await pool.query(
      "DELETE FROM employees WHERE id = ?",
      [id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({
        msg: 'Employee not found'
      });
    };
    res.send({
      status: 200,
      msg: `Employee ${id} deleted successfully`
    });
  } catch (error) {
    console.error('Error deleting employee', error);
    return res.status(500).json({ msg: 'Server error' });
  }
}