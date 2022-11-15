import asyncHandler from "express-async-handler";
import { v4 as uuidv4 } from "uuid";
import db from "../database/db.connect";
import { AccountType, TransactionType } from "../utils/type.interface";
import { transactionValidator } from "../utils/validator";
export const deposit = asyncHandler(async (req, res) => {
  const { amount, description, receiver } = transactionValidator.parse(
    req.body
  );
  const id = uuidv4();
  const trx = await db.transaction();
  const currUser = req.user;
  const userAccount = await trx<AccountType>("accounts")
    //@ts-ignore
    .where({ user_id: currUser.id });
  if (userAccount[0].accNumber === receiver)
    throw new Error("You can not transact with self");
  if (userAccount[0].balance < amount) throw new Error("Insufficient funds");
  try {
    await trx<AccountType>("accounts")
      //@ts-ignore
      .where({ user_id: currUser.id })
      .decrement("balance", amount);
    await trx<TransactionType>("transactions").insert({
      id,
      //@ts-ignore
      sender: userAccount[0].accNumber,
      receiver,
      type: "deposit",
      description,
      amount,
    });

    await trx<AccountType>("accounts")
      .where({
        accNumber: receiver,
      })
      .increment("balance", amount);
    await trx.commit();
    res.status(201).json({ msg: "Transaction completed" });
  } catch (error) {
    await trx.rollback();
    console.log(error);
    res.status(400).json({ msg: "Transaction not completed" });
  }
});
