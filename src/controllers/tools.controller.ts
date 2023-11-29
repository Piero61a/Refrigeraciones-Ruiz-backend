import { Request, Response } from 'express';
import { pool } from '../db';

export const getTools = async (
  req: Request,
  res: Response
) => {
  try {
    const [rows] = await pool.query("SELECT * FROM tools");
    return res.send({
      status: 200,
      data: rows
    })
  } catch (error) {
    console.error('Error getting tools', error);
    return res.send({
      status: 500,
      msg: 'Server error'
    });
  }
}

export const getToolById = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  try {
    const [rows]: any[] = await pool.query(
      "SELECT * FROM tools WHERE id = ?",
      [id]
    )
    if (rows.length === 0) {
      return res.status(404).json({ msg: 'Tool not found' });
    }
    res.send({
      status: 200,
      data: rows[0]
    });

  } catch (error) {
    console.error('Error getting tool', error);
    return res.status(500).json({ msg: 'Server error' });
  }
}

export const createTool = async (
  req: Request,
  res: Response
) => {
  const { body: { name, description, bearer, dateOfAperture, returnDate, employee, service } } = req;
  try {
    const [rows] = await pool.query(
      "INSERT INTO tools ( name, description, bearer, dateOfAperture, returnDate, employee, service) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [name, description, bearer, dateOfAperture, returnDate, employee, service]
    )
    const newTool = {
      id: (rows as any).insertId,
      name,
      description,
      bearer,
      dateOfAperture,
      returnDate,
      employee,
      service
    }
    res.send({
      status: 200,
      data: newTool
    });
  } catch (error) {
    console.error('Error creating employee', error);
    return res.status(500).json({ msg: 'Server error' });
  }
}

export const updateTool = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  const { body: { name, description, bearer, dateOfAperture, returnDate, employee, service } } = req;
  try {
    const [result]: any[] = await pool.query(
      "UPDATE tools SET name = IFNULL( ?, name ), description = IFNULL( ?, description ), returnDate = IFNULL( ?, returnDate ), bearer = IFNULL( ?, bearer ), dateOfAperture = IFNULL( ?, dateOfAperture ), employee = IFNULL( ?, employee ), service = IFNULL( ?, service ) WHERE id = ?",
      [name, description, returnDate, bearer, dateOfAperture, employee, service, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        msg: 'Tool not found'
      });
    };

    const [rows]: any[] = await pool.query(
      "SELECT * FROM tools WHERE id = ?",
      [id]
    );
    res.send({
      status: 200,
      data: rows[0]
    });

  } catch (error) {
    console.error('Error updating tool', error);
    return res.status(500).json({ msg: 'Server error' });
  }
}

export const deleteTool = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  try {
    const [result]: any[] = await pool.query(
      "DELETE FROM tools WHERE id = ?",
      [id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({
        msg: 'Tool not found'
      });
    };
    res.send({
      status: 200,
      msg: `Tool ${id} deleted successfully`
    });
  } catch (error) {
    console.error('Error deleting tool', error);
    return res.status(500).json({ msg: 'Server error' });
  }
}