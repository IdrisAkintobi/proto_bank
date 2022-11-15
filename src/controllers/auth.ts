import argon2 from "argon2";
import asyncHandler from "express-async-handler";
import { v4 as uuidv4 } from "uuid";
import db from "../database/db.connect";
import genToken from "../utils/gen.token";
import { registerValidator, signInValidator } from "../utils/validator";

export const registerUser = asyncHandler(async (req, res) => {
  const { email, password, name, acc_type } = registerValidator.parse(req.body);
  const id = uuidv4();
  const hashedPassword = await argon2.hash(password);
  const trx = await db.transaction();
  try {
    await trx("users").insert({
      id,
      email,
      password: hashedPassword,
      name,
    });
    await trx("accounts").insert({
      accNumber: Math.floor(Math.random() * 1000000000),
      type: acc_type,
      user_id: id,
      balance: 0,
    });
    await trx.commit();
    res.status(201).json({ msg: "User created" });
  } catch (error) {
    await trx.rollback();
    console.log(error);
    res.status(400).json({ msg: "User not created" });
  }
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = signInValidator.parse(req.body);
  const user = await db("users").where({ email }).first();
  if (user && (await argon2.verify(user.password, password))) {
    res.json({
      token: genToken(user.id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});
