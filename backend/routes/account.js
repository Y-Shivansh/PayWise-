const express = require('express');
const mongoose = require('mongoose'); // Make sure to import mongoose
const { authMiddleware } = require("../middleware");
const { Account } = require('../db');

const router = express.Router();

router.get("/balance", authMiddleware, async (req, res) => {
    const account = await Account.findOne({
        userId: req.userId
    });
    res.json({
        balance: account.balance
    });
});

router.post("/transfer", authMiddleware, async (req, res) => {
    // Creating Session
    const session = await mongoose.startSession();

    session.startTransaction();
    const { amount, to } = req.body;
    const account = await Account.findOne({ userId: req.userId }).session(session);
    if (!account || account.balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "INSUFFICIENT BALANCE"
        });
    }

    // The .session(session) method is called on the Mongoose query to associate the operation with the transaction session. This means these findOne operations are now part of the transaction.
    // By using this, you ensure that the operations are aware of the transaction and will respect its boundaries. If the transaction is aborted, any changes made by these operations will be rolled back.
    const toAccount = await Account.findOne({ userId: to }).session(session);
    if (!toAccount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid Account"
        });
    }

    // Performing transaction
    await Account.updateOne({ userId: req.userId }, {
        $inc: {
            balance: -amount
        }
    }).session(session);
    await Account.updateOne({ userId: to }, {
        $inc: {
            balance: amount
        }
    }).session(session);

    // Commit transaction
    await session.commitTransaction();
    session.endSession();
    res.json({
        message: "Transfer successful"
    });
});

module.exports = router;
