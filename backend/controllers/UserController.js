import { where } from "sequelize";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";

export const getUsers = async (req, res) => {
  try {
    const response = await User.findAll({
      attributes: ['id', 'name', 'email']
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUsersById = async (req, res) => {
  try {
    const response = await User.findOne({
      where: {
        id: req.params.id
      }
    });
    if (response) {
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "User tidak ditemukan" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const register = async (req, res) => {
  const { name, email, password, confPassword } = req.body;
  if (password !== confPassword) {
    return res.status(400).json({ error: "Password dan Konfirmasi Password tidak cocok" });
  }
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);
  try {
    await User.create({
      name: name,
      email: email,
      password: hashPassword
    });
    res.json({ msg: "Registrasi Berhasil" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email
      }
    });
    if (user) {
      const match = await bcrypt.compare(req.body.password, user.password);
      if (match) {
        const id = user.id;
        const name = user.name;
        const email = user.email;

        const accessToken = jwt.sign({ id, name, email }, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: '20s'
        });

        const refreshToken = jwt.sign({ id, name, email }, process.env.REFRESH_TOKEN_SECRET, {
          expiresIn: '1d'
        });

        await User.update({ refresh_token: refreshToken }, {
          where: {
            id: id
          }
        });

        res.cookie('refreshToken', refreshToken, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000
        });

        res.json({ accessToken });
      } else {
        res.status(400).json({ error: "Password Salah" });
      }
    } else {
      res.status(404).json({ error: "Email tidak ditemukan" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(204);
  try {
    const user = await User.findOne({
      where: {
        refresh_token: refreshToken
      }
    });
    if (user) {
      const id = user.id;
      await User.update({ refresh_token: null }, {
        where: {
          id: id
        }
      });
      res.clearCookie('refreshToken');
      return res.sendStatus(200);
    } else {
      return res.sendStatus(204);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const [affectedRows] = await User.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    if (affectedRows > 0) {
      res.status(200).json({ msg: "Akun sudah diperbarui" });
    } else {
      res.status(404).json({ error: "User tidak ditemukan" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const deletedRows = await User.destroy({
      where: {
        id: req.params.id
      }
    });
    if (deletedRows > 0) {
      res.status(200).json({ msg: "Akun sudah dihapus" });
    } else {
      res.status(404).json({ error: "User tidak ditemukan" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
