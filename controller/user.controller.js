const db = require('../db')
const express = require('express')
const url = require("url");
const app = express()
class UserController{
    async createUser(req, res){
        const {name, surname,roleid,login,password} = req.body
        const newPerson = await db.query(`INSERT INTO person (name,surname,roleid,login,password) values ($1,$2,$3,$4,$5) RETURNING *`, [name,surname,roleid,login,password])
        console.log(name,surname)
        res.json(newPerson.rows[0])
    }
    async getUsers(req,res){
        const users = await db.query(`SELECT * FROM person`)
        //console.log(users.rows)
        res.json(users.rows)
    }
    async getOneUser(req,res){
        const id = req.params.id
        const user = await db.query(`SELECT * FROM person WHERE id = $1`, [id])
        res.json(user.rows[0])
    }
    async updateUser(req,res){
        const {id,name,surname,roleid,login,password} = req.body
        const user = await db.query(
            `UPDATE person set name = $1, surname = $2, roleid = $3, login = $4, password = $5 where id = $6 RETURNING *`,
            [name,surname,roleid,login,password,id]
        )
        res.json(user.rows[0])
    }
    async deleteUser(req,res){
        const id = req.params.id
        const user = await db.query(`DELETE FROM person WHERE id = $1`, [id])
        res.json(user.rows[0])
    }
    async loginUser(req,res){
        try {
            const {login,password} = req.body
            const user = await db.query("SELECT * FROM PERSON WHERE login = $1", [login])
            if (!user){
                return res.status(400).json({message: `Пользователь ${login} не найден`})
            }
            if (user.rows[0].password == password){
                console.log("Верификация успешна!!")
                console.log(user.rows[0])
                //res.json(user.rows[0])


            }
            else{
                console.log("Пароль неверный")
                return res.status(400).json({message: `Login error`})
            }
        }
        catch (e){
            console.log(e)
            res.status(400).json({message: `Login error`})
        }


    }

}

module.exports = new UserController()