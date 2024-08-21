"use client";
import { deleteAdminById } from "@/actions/admins";
import { DeleteAlert } from "@/components/AlertButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatDate, formatFullName } from "@/lib/utils";
import { Admin } from "@prisma/client";
import { User } from "lucide-react";

const Profile = ({ adminData }: { adminData: Admin }) => {
  const fullName = formatFullName(adminData.firstName, adminData.lastName);

  return (
    <Card className='max-w-xl shadow'>
      <CardHeader className='flex flex-row justify-between items-center mt-2'>
        <div className='space-y-2'>
          <CardTitle>{fullName}</CardTitle>
          <CardDescription>{adminData.role}</CardDescription>
        </div>
        <User />
      </CardHeader>
      <Separator />
      <CardContent className='my-5'>
        <table className='w-full'>
          <td className='leading-10'>
            <tr>First Name</tr>
            <tr>Last Name</tr>
            <tr>Email</tr>
            <tr>Username</tr>
            <tr>Status</tr>
            <tr>Role</tr>
            <tr>Last Active</tr>
            <tr>Created at</tr>
          </td>
          <td className='leading-10'>
            <tr className='capitalize'>: {adminData.firstName}</tr>
            <tr className='capitalize'>: {adminData.lastName}</tr>
            <tr>: {adminData.email}</tr>
            <tr>: {adminData.username}</tr>
            <tr>: {adminData.isActive ? "Online" : "Offline"}</tr>
            <tr>: {adminData.role}</tr>
            <tr>: {formatDate(adminData.updatedAt)}</tr>
            <tr>: {formatDate(adminData.createdAt)}</tr>
          </td>
        </table>
      </CardContent>
      <CardFooter className='flex gap-2 justify-end flex-wrap'>
        <DeleteAlert deleteType='account' id={adminData.id}>Delete Account</DeleteAlert>
        <Button size='sm'>Change Password</Button>
        <Button size='sm'>Change Role</Button>
      </CardFooter>
    </Card>
  );
};

export default Profile;
