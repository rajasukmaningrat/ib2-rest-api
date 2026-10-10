import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} from "../services/user.service.js";
import { isValidUserId } from "../utils/user.validation.js";

const isValidBody = (body) => {
  return (
    body !== null &&
    typeof body === "object" &&
    !Array.isArray(body)
  );
};

const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const listUsers = async (req, res) => {
  try {
    const users = await getUsers();
    return res.json(users);
  } catch (error) {
    console.error("Gagal mengambil data users:", error);
    return res.status(500).json({
      message: "Gagal mengambil data users"
    });
  }
};

export const showUser = async (req, res) => {
  if (!isValidUserId(req.params.id)) {
    return res.status(400).json({
      message: "ID user tidak valid"
    });
  }

  try {
    const user = await getUserById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User tidak ditemukan"
      });
    }

    return res.json(user);
  } catch (error) {
    console.error("Gagal mengambil data user:", error);
    return res.status(500).json({
      message: "Gagal mengambil data user"
    });
  }
};

export const storeUser = async (req, res) => {
  if (!isValidBody(req.body)) {
    return res.status(400).json({
      message: "Request body harus berupa object"
    });
  }

  const { fullname, username, email, password } = req.body;

  if (
    typeof fullname !== "string" ||
    typeof username !== "string" ||
    typeof email !== "string" ||
    typeof password !== "string" ||
    !fullname.trim() ||
    !username.trim() ||
    !email.trim() ||
    !password.trim()
  ) {
    return res.status(400).json({
      message: "fullname, username, email, dan password wajib diisi"
    });
  }

  if (!isValidEmail(email.trim())) {
    return res.status(400).json({
      message: "Format email tidak valid"
    });
  }

  if (password.length < 8) {
    return res.status(400).json({
      message: "Password minimal 8 karakter"
    });
  }

  try {
    const result = await createUser({
      fullname: fullname.trim(),
      username: username.trim(),
      email: email.trim(),
      password
    });

    return res.status(201).json({
      message: "User berhasil dibuat",
      id: result.insertId
    });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        message: "Email atau data unik sudah digunakan"
      });
    }

    console.error("Gagal membuat user:", error);
    return res.status(500).json({
      message: "Gagal membuat user"
    });
  }
};

export const editUser = async (req, res) => {
  if (!isValidUserId(req.params.id)) {
    return res.status(400).json({
      message: "ID user tidak valid"
    });
  }

  if (!isValidBody(req.body)) {
    return res.status(400).json({
      message: "Request body harus berupa object"
    });
  }

  const { fullname, username, email, password } = req.body;
  const allowedFields = ["fullname", "username", "email", "password"];
  const fields = Object.keys(req.body);

  if (
    fields.length === 0 ||
    fields.some((field) => !allowedFields.includes(field))
  ) {
    return res.status(400).json({
      message: "Field update kosong atau tidak diizinkan"
    });
  }

  for (const field of ["fullname", "username", "email"]) {
    if (
      Object.hasOwn(req.body, field) &&
      (typeof req.body[field] !== "string" || !req.body[field].trim())
    ) {
      return res.status(400).json({
        message: `${field} tidak boleh kosong`
      });
    }
  }

  if (Object.hasOwn(req.body, "email") && !isValidEmail(email.trim())) {
    return res.status(400).json({
      message: "Format email tidak valid"
    });
  }

  if (
    Object.hasOwn(req.body, "password") &&
    (typeof password !== "string" || password.length < 8)
  ) {
    return res.status(400).json({
      message: "Password minimal 8 karakter"
    });
  }

  const updatedUser = { ...req.body };

  for (const field of ["fullname", "username", "email"]) {
    if (typeof updatedUser[field] === "string") {
      updatedUser[field] = updatedUser[field].trim();
    }
  }

  try {
    const result = await updateUser(req.params.id, updatedUser);

    if (result === null) {
      return res.status(404).json({
        message: "User tidak ditemukan"
      });
    }

    return res.json({
      message: "User berhasil di-update"
    });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        message: "Email atau data unik sudah digunakan"
      });
    }

    console.error("Gagal update user:", error);
    return res.status(500).json({
      message: "Gagal update user"
    });
  }
};

export const destroyUser = async (req, res) => {
  if (!isValidUserId(req.params.id)) {
    return res.status(400).json({
      message: "ID user tidak valid"
    });
  }

  try {
    const result = await deleteUser(req.params.id);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "User tidak ditemukan"
      });
    }

    return res.json({
      message: "User berhasil dihapus"
    });
  } catch (error) {
    console.error("Gagal menghapus data user:", error);
    return res.status(500).json({
      message: "Gagal menghapus data user"
    });
  }
};