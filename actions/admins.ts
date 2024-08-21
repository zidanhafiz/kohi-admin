"use server";
import adminModels from "@/models/admin";

export const deleteAdminById = async () => {
  try {
    // if (!id) {
    //   throw Error("Admin ID is required");
    // }

    // await adminModels.deleteAdminById(id);

    return { success: true };
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return {
        success: false,
        message: error.message,
      };
    }
    return {
      success: false,
      message: "An error occured while deleting admin",
    };
  }
};
