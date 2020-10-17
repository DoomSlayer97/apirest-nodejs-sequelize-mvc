const { Usuario } = require("../models");
const validatorjs = require("validatorjs");
const bcrypt = require("bcrypt");
const app = require("../config/app");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize")

module.exports.auth = async (req, res) => {

  try {

    const {
      email,
      password
    } = req.body;

    const validator = new validatorjs(req.body, {
      email: "required|string|email",
      password: "required|string"
    });

    if (validator.fails()) return res.status(500).json({
      message: "invalid_params",
      errors: validator.errors.errors
    });

    const findedUser = await Usuario.findOne({ where: { email } });

    if (!findedUser) return res.status(404).json({
      message: "user_not_found"
    });

    const isPassword = bcrypt.compareSync(password, findedUser.password);

    if (!isPassword) return res.status(500).json({
      message: "invalid_password"
    });

    const token = jwt.sign({
      id: findedUser.id
    }, app.get("keyauth"), {
      expiresIn: "24h"
    });

    return res.status(200).json({
      message: "authenticated",
      token
    });
    
  } catch (e) {
    
    console.log(e);

    return res.status(500).json({
      message: "internal_error"
    });

  }

}

module.exports.create = async (req, res) => {

  try {

    const {
      username,
      email,
      password
    } = req.body;

    const validation = new validatorjs(req.body, {
      username: "required|string",
      email: "required|string",
      password: "required|string"
    });

    if (validation.fails()) return res.status(500).json({
      message: "invalid_params",
      errors: validation.errors.errors
    });

    const createUser = await Usuario.create({
      username,
      email,
      password: bcrypt.hashSync(password, 9)
    });

    createUser.password = "";

    return res.status(201).json({
      message: "created",
      user: createUser
    });
    
  } catch (e) {
    
    console.log(e);

    return res.status(500).json({
      message: "internal_error"
    });

  }

}

module.exports.findAll = async (req, res) => {

  try {

    const usuarioId = req.body.userAuth.id;
    
    const usuarios = await Usuario.findAll({
      where: {
        regStatus: 0,
        id: {
          [Op.ne]: usuarioId
        } 
      },
      attributes: {
        exclude: ["password"]
      }
    });

    return res.json({
      usuarios
    });

  } catch (e) {
   
    console.log(e);
    
    return res.status(500).json({
      message: "internal_error"
    });

  }

}

module.exports.findOne = async (req, res) => {

  try {

    const {
      id
    } = req.params;

    const usuario = await Usuario.findOne({
      where: { 
        id,
        regStatus: 0
      },
      attributes: {
        exclude: [ "password" ]
      }
    });

    return res.json({
      usuario
    });
    
  } catch (e) {
    
    console.log(e);

    return res.status(500).json({
      message: "internal_error"
    });

  }

}

module.exports.updateOne = async (req, res) => {

  try {

    const {
      username,
      email,
      password
    } = req.body;

    const { id } = req.params;

    await Usuario.update({
      username,
      email,
      password
    }, {
      where: { id }
    });

    return res.status(201).json({
      message: "updated"
    });
    
  } catch (e) {
    
    console.log(e);

    return res.status(500).json({
      message: "internal_error"
    });

  }

}

module.exports.deleteOne = async (req, res) => {

  try {

    const { id } = req.params;

    await Usuario.update({
      regStatus: 1
    }, {
      where: { id }
    });

    return res.status(201).json({
      message: "deleted"
    });
    
  } catch (e) {
    
    console.log(e);

    return res.status(500).json({
      message: "internal_error"
    });

  }

}

