import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import DashboardSidebar from "@/layout/DashboardSidebar";
import connectDB from "@/utils/connectDB";
import User from "@/models/User";

async function DashboardLayout({ children }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/signin");

  await connectDB();
  const user = await User.findOne({ email: session.user.email });

  if (!user) return <h3>مشکلی پیش آمده است</h3>;

  return (
    <DashboardSidebar role={user.role} email={session.user.email}>
      {children}
    </DashboardSidebar>
  );
}

export default DashboardLayout;
