import { prisma } from "@/lib/prisma";
import { Admin } from "@/types/admin";

const createAdmin = async (data: Admin) => {
  try {
    const admin = await prisma.admin.create({
      data: {
        ...data,
        updatedAt: new Date(),
      },
    });

    return admin;
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("An error occured while fetching admins");
  } finally {
    await prisma.$disconnect();
  }
};

const getAllAdmins = async () => {
  try {
    const admins = await prisma.admin.findMany();

    return admins;
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("An error occured while fetching admins");
  } finally {
    await prisma.$disconnect();
  }
};

const getAdminById = async (id: string) => {
  try {
    const admin = await prisma.admin.findUnique({
      where: {
        id,
      },
    });

    return admin;
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("An error occured while fetching admin");
  } finally {
    await prisma.$disconnect();
  }
};

const getAdminByEmail = async (email: string) => {
  try {
    const admin = await prisma.admin.findUnique({
      where: {
        email,
      },
    });

    return admin;
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("An error occured while fetching admin");
  } finally {
    await prisma.$disconnect();
  }
};

const getAdminByUsername = async (username: string) => {
  try {
    const admin = await prisma.admin.findUnique({
      where: {
        username,
      },
    });

    return admin;
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("An error occured while fetching admin");
  } finally {
    await prisma.$disconnect();
  }
};

const getAdminByPhone = async (phone: string) => {
  try {
    const admin = await prisma.admin.findUnique({
      where: {
        phone,
      },
    });

    return admin;
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("An error occured while fetching admin");
  } finally {
    await prisma.$disconnect();
  }
};

const adminModels = {
  createAdmin,
  getAllAdmins,
  getAdminById,
  getAdminByEmail,
  getAdminByUsername,
  getAdminByPhone,
};

export default adminModels;
