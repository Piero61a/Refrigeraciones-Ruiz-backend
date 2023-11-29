import { Request, Response } from 'express';
import { pool } from '../db';

export const getService = async (
  req: Request,
  res: Response
) => {
  try {
    const [rows] = await pool.query("SELECT * FROM services");
    return res.send({
      status: 200,
      data: rows
    })
  } catch (error) {
    console.error('Error getting service', error);
    return res.send({
      status: 500,
      msg: 'Server error'
    });
  }
}

export const getServiceById = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  try {
    const [rows]: any[] = await pool.query(
      "SELECT * FROM services WHERE id = ?",
      [id]
    )
    if (rows.length === 0) {
      return res.status(404).json({ msg: 'Service not found' });
    }
    res.send({
      status: 200,
      data: rows[0]
    });

  } catch (error) {
    console.error('Error getting service', error);
    return res.status(500).json({ msg: 'Server error' });
  }
}

export const createService = async (
  req: Request,
  res: Response
) => {
  const { body: { service, description, client, dateOfAssistance, budget, status } } = req;
  try {
    const [rows] = await pool.query(
      "INSERT INTO services ( service, description, client, dateOfAssistance, budget, status ) VALUES (?, ?, ?, ?, ?, ?)",
      [service, description, client, dateOfAssistance, budget, status]
    )
    const newTool = {
      id: (rows as any).insertId,
      service,
      description,
      client,
      dateOfAssistance,
      budget,
      status,
    }
    res.send({
      status: 200,
      data: newTool
    });
  } catch (error) {
    console.error('Error creating service', error);
    return res.status(500).json({ msg: 'Server error' });
  }
}

export const updateService = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  const { body: { service, description, client, dateOfAssistance, budget, status } } = req;
  try {
    const [result]: any[] = await pool.query(
      "UPDATE services SET service = IFNULL( ?, service ), description = IFNULL( ?, description ), budget = IFNULL( ?, budget ), client = IFNULL( ?, client ), dateOfAssistance = IFNULL( ?, dateOfAssistance ), status = IFNULL( ?, status ) WHERE id = ?",
      [service, description, budget, client, dateOfAssistance, status,  id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        msg: 'Service not found'
      });
    };

    const [rows]: any[] = await pool.query(
      "SELECT * FROM services WHERE id = ?",
      [id]
    );
    res.send({
      status: 200,
      data: rows[0]
    });

  } catch (error) {
    console.error('Error updating service', error);
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
      "DELETE FROM services WHERE id = ?",
      [id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({
        msg: 'Service not found'
      });
    };
    res.send({
      status: 200,
      msg: `Service ${id} deleted successfully`
    });
  } catch (error) {
    console.error('Error deleting service', error);
    return res.status(500).json({ msg: 'Server error' });
  }
}