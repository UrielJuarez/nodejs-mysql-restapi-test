import {pool} from '../db.js'


export const getEmployees = async (req,res) => {
   try {
    //throw new Error('DB Error')
    const [rows] = await pool.query('Select * from employee')
    res.json({rows})
   } catch (error) {
    return res.status(500).json({
        mensaje:'algo fue mal'
    })
   }
}

export const getEmployee = async (req,res) => {
    try {
        //throw new Error('DB Error inesperado')

        const [rows] = await pool.query('Select * from employee where id = ?',[req.params.id])
    if (rows.length <= 0) {
        res.status(200).json({
            message: 'Employee not found'
        })
        
    }

    console.log(rows)
    res.json(rows[0])
        
    } catch (error) {
        return res.status(500).json({
            mensaje:'algo fue mal'
        })
    }
}

export const createEmployees = async (req, res) => {

    try {
    const {name,salary} = req.body
    const [rows] = await pool.query('Insert into employee (name,salary) VALUES (?,?)',[name, salary])
    console.log(req.body)
    res.send({
        id: rows.insertId,
        name,
        salary
    })
        
    } catch (error) {
        return res.status(500).json({
            mensaje:'algo fue mal'
        })
    }
}
export const deleteEmployees = async (req,res) => {
    try {

        
    const [result] = await pool.query('delete from employee where id = ?',[req.params.id])
    if (result.affectedRows <= 0) {
        res.status(200).json({
            message: 'no se elimino nada, registro no encontrado'
        })
        
    }

    console.log(result)

    res.send('Empleados eliminado')
        
    } catch (error) {
        
        return res.status(500).json({
            mensaje:'algo fue mal'
        })
        
    }

}
 

export const updateEmployees = async (req,res) => {
    const {id} = req.params
    const {name, salary} = req.body
    try {
        
    const [result] = await pool.query('update employee set name=ifnull(?,name), salary=ifnull(?,salary) where id=?',[name, salary,id])

    if (result.affectedRows === 0) {
        return res.status(404).json({
            message : 'empleado no encontrado'
        })   
    }

    const [rows] = await pool.query('Select * from employee where id=?',[id])
    console.log(result)
    res.json(rows[0])
    } catch (error) {
        return res.status(500).json({
            mensaje:'algo fue mal'
        })
    }
}