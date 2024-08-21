import adminModels from "@/models/admin";
import Profile from "./profile";
import { Admin } from "@prisma/client";

const getAdminDetails = async (id: string) => {
  try {
    const admins = await adminModels.getAdminById(id);

    return admins;
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      throw Error(error.message);
    }
    throw Error("An error occured while fetching admin");
  }
};

const DetailsPage = async ({ params }: { params: { id: string } }) => {
  const adminData = await getAdminDetails(params.id) as Admin;

  return (
    <div className='my-4'>
      <Profile adminData={adminData} />
    </div>
  )
};

export default DetailsPage;
