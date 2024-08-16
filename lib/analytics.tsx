import { CircleUser, History, Lock, Users } from "lucide-react";
import { Admin } from "@/types/admin";
import { Analytic } from "@/types/analytic";

export const getCashiersAnalytics = async (data: Admin[]) => {
  const totalCashiers = data.filter((d) => d.role === "CASHIER").length;
  const totalAdmins = data.filter((d) => d.role === "ADMIN").length;
  const activeCashiers = data.filter((d) => d.isActive)[0];
  const lastActiveCashier = data.filter((d) => d.isActive)[0];

  const titles = ["Total Cashiers", "Total Admins", "Active Cashiers", "Last Active Cashier"];
  const values = [totalCashiers, totalAdmins, activeCashiers.fullName, lastActiveCashier.fullName];
  const informations = [`Of ${data.length} total users`, `Of ${data.length} total users`, `From 2 hours ago`, `Last yesterday`];
  const icons = [<Users key={1}/>, <Lock key={2}/>, <CircleUser key={3}/>, <History key={4}/>];

  const analytics = titles.map((title, i) => {
    return {
      title,
      icon: icons[i],
      value: values[i],
      information: informations[i],
    };
  });

  return analytics as Analytic[];
};
