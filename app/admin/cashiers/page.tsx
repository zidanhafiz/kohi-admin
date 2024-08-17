import adminModels from "@/models/admin";
import CashierTable from "./table";
import Analytics from "./analytics";
import { CircleUser, History, Lock, Users } from "lucide-react";

const getAdminsData = async () => {
  try {
    const admins = await adminModels.getAllAdmins();

    const totalCashiers = admins.filter((d) => d.role === "CASHIER").length;
    const totalAdmins = admins.filter((d) => d.role === "ADMIN").length;
    const activeCashiers = admins.filter((d) => d.isActive)[0];
    const lastActiveCashier = admins.filter((d) => d.isActive)[0];

    const titles = ["Total Cashiers", "Total Admins", "Active Cashiers", "Last Active Cashier"];
    const values = [totalCashiers, totalAdmins, activeCashiers.fullName, lastActiveCashier.fullName];
    const informations = [`Of ${admins.length} total users`, `Of ${admins.length} total users`, `From 2 hours ago`, `Last yesterday`];
    const icons = [<Users key={1} />, <Lock key={2} />, <CircleUser key={3} />, <History key={4} />];

    const analytics = titles.map((title, i) => {
      return {
        title,
        icon: icons[i],
        value: values[i],
        information: informations[i],
      };
    });

    return { admins, analytics };
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("An error occured while fetching admins");
  }
};

const CashierPage = async () => {
  const { admins, analytics } = await getAdminsData();

  return (
    <div>
      <Analytics analytics={analytics} />
      <CashierTable data={admins} />
    </div>
  );
};

export default CashierPage;
