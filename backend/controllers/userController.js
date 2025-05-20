import prisma from "../config/db.config.js";

export const createUser = async (req, res, next) => {
  try {
    const { name, email, age, role, salary } = req.body;
    const user = await prisma.user.create({
      data: {
        name,
        email,
        age : parseInt(age),
        role,
        salary
      },
    });
    if (!user)
      return res.status(400).json({
        success: false,
        message: "User not created",
      });
    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await prisma.user.findMany();
    if (users.length === 0)
      return res.status(404).json({
        success: false,
        message: "No users found",
      });
    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, age, role, salary } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: { id: parseInt(id) }
    });

    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: {
        name,
        email,
        age,
        role,
        salary
      },
    });

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};


export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const existingUser = await prisma.user.findUnique({
      where: { id: parseInt(id) }
    });

    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    await prisma.user.delete({
      where: { id: parseInt(id) }
    });

    res.status(200).json({
      success: true,
      message: "User deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};