import Expense from "./expense.model.js";

/**
 * ADD EXPENSE (for logged-in user)
 */
export const addExpense = async (req, res) => {
  try {
    const { title, amount, type, category, dateTime, userId } = req.body;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const expense = await Expense.create({
      title,
      amount,
      type,
      category,
      dateTime,
      user: userId, // 🔑 attach user
    });

    res.status(201).json({
      success: true,
      expense,
    });
  } catch (error) {
    console.error("Add expense error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to add expense",
    });
  }
};

/**
 * GET EXPENSES (ONLY logged-in user)
 */
export const getExpenses = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const expenses = await Expense.find({ user: userId }).sort({
      dateTime: -1,
    });

    res.json({
      success: true,
      expenses,
    });
  } catch (error) {
    console.error("Get expense error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch expenses",
    });
  }
};

/**
 * DELETE EXPENSE (only own expense)
 */
export const deleteExpense = async (req, res) => {
  try {
    const { userId } = req.query;
    const { id } = req.params;

    const expense = await Expense.findOne({ _id: id, user: userId });

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found",
      });
    }

    await Expense.deleteOne({ _id: id });

    res.json({
      success: true,
      message: "Expense deleted",
    });
  } catch (error) {
    console.error("Delete expense error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to delete expense",
    });
  }
};
