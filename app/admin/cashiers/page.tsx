import adminModels from "@/models/admin";
import CashierTable from "./table"
import CardList from "./cardList";
import { getCashiersAnalytics } from "@/lib/analytics";

const users = [
  {
    id: 1,
    username: "john_doe",
    fullName: "John Doe",
    email: "john@gmail.com",
    role: "CASHIER",
    phone: "08123456789",
    lastActive: "2 hours ago"
  },
  {
    id: 2,
    username: "jane_doe",
    fullName: "Jane Doe",
    email: "jane@gmail.com",
    role: "MANAGER",
    phone: "08123456780",
    lastActive: "5 hours ago"
  },
  {
    id: 3,
    username: "alice_smith",
    fullName: "Alice Smith",
    email: "alice@gmail.com",
    role: "CASHIER",
    phone: "08123456781",
    lastActive: "3 hours ago"
  },
  {
    id: 4,
    username: "bob_johnson",
    fullName: "Bob Johnson",
    email: "bob@gmail.com",
    role: "SUPERVISOR",
    phone: "08123456782",
    lastActive: "6 hours ago"
  },
  {
    id: 5,
    username: "charlie_brown",
    fullName: "Charlie Brown",
    email: "charlie@gmail.com",
    role: "CASHIER",
    phone: "08123456783",
    lastActive: "1 hour ago"
  },
  {
    id: 6,
    username: "dave_wilson",
    fullName: "Dave Wilson",
    email: "dave@gmail.com",
    role: "MANAGER",
    phone: "08123456784",
    lastActive: "4 hours ago"
  },
  {
    id: 7,
    username: "eva_adams",
    fullName: "Eva Adams",
    email: "eva@gmail.com",
    role: "CASHIER",
    phone: "08123456785",
    lastActive: "2 hours ago"
  },
  {
    id: 8,
    username: "frank_thomas",
    fullName: "Frank Thomas",
    email: "frank@gmail.com",
    role: "SUPERVISOR",
    phone: "08123456786",
    lastActive: "7 hours ago"
  },
  {
    id: 9,
    username: "george_miller",
    fullName: "George Miller",
    email: "george@gmail.com",
    role: "CASHIER",
    phone: "08123456787",
    lastActive: "5 hours ago"
  },
  {
    id: 10,
    username: "hannah_jones",
    fullName: "Hannah Jones",
    email: "hannah@gmail.com",
    role: "MANAGER",
    phone: "08123456788",
    lastActive: "8 hours ago"
  },
  {
    id: 11,
    username: "ian_clark",
    fullName: "Ian Clark",
    email: "ian@gmail.com",
    role: "CASHIER",
    phone: "08123456790",
    lastActive: "10 hours ago"
  },
  {
    id: 12,
    username: "jack_king",
    fullName: "Jack King",
    email: "jack@gmail.com",
    role: "SUPERVISOR",
    phone: "08123456791",
    lastActive: "9 hours ago"
  },
  {
    id: 13,
    username: "karen_green",
    fullName: "Karen Green",
    email: "karen@gmail.com",
    role: "MANAGER",
    phone: "08123456792",
    lastActive: "11 hours ago"
  },
  {
    id: 14,
    username: "lisa_white",
    fullName: "Lisa White",
    email: "lisa@gmail.com",
    role: "CASHIER",
    phone: "08123456793",
    lastActive: "12 hours ago"
  },
  {
    id: 15,
    username: "mike_hall",
    fullName: "Mike Hall",
    email: "mike@gmail.com",
    role: "SUPERVISOR",
    phone: "08123456794",
    lastActive: "13 hours ago"
  },
  {
    id: 16,
    username: "nina_scott",
    fullName: "Nina Scott",
    email: "nina@gmail.com",
    role: "MANAGER",
    phone: "08123456795",
    lastActive: "14 hours ago"
  },
  {
    id: 17,
    username: "oscar_harris",
    fullName: "Oscar Harris",
    email: "oscar@gmail.com",
    role: "CASHIER",
    phone: "08123456796",
    lastActive: "15 hours ago"
  },
  {
    id: 18,
    username: "paul_martin",
    fullName: "Paul Martin",
    email: "paul@gmail.com",
    role: "SUPERVISOR",
    phone: "08123456797",
    lastActive: "16 hours ago"
  },
  {
    id: 19,
    username: "quincy_wright",
    fullName: "Quincy Wright",
    email: "quincy@gmail.com",
    role: "MANAGER",
    phone: "08123456798",
    lastActive: "17 hours ago"
  },
  {
    id: 20,
    username: "rachel_brown",
    fullName: "Rachel Brown",
    email: "rachel@gmail.com",
    role: "CASHIER",
    phone: "08123456799",
    lastActive: "18 hours ago"
  }
];

const getAdminsData = async () => {
  try {
    const admins = await adminModels.getAllAdmins();

    return admins;
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("An error occured while fetching admins");
  }
}

const CashierPage = async () => {
  const adminsData = await getAdminsData();
  const analytics = await getCashiersAnalytics(adminsData);

  return (
    <div>
      <CardList analytics={analytics} />
      <CashierTable data={adminsData} />
    </div>
  )
}

export default CashierPage