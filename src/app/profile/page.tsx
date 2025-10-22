"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import TopCard from "../../components/card/userManagement/topCard";
import AdminUserCard from "../../components/card/userManagement/adminUsersCard";
import UserForm from "../../components/form/addUserForm";
import EditUserForm from "../../components/form/editUserForm";
import DeleteUserCard from "../../components/card/userManagement/deleteUser";

const Page = () => {
  const router = useRouter();
  const [showAddUserPopup, setShowAddUserPopup] = useState(false);
  const [showEditUserPopup, setShowEditUserPopup] = useState(false);
  const [showDeleteUserPopup, setShowDeleteUserPopup] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [adminUsers, setAdminUsers] = useState([
    {
      name: "Mercedes Johnson",
      email: "mercedes.johnson@gmail.com",
      date: "06/12/20",
    },
    {
      name: "Frances Canales",
      email: "frances.canales@gmail.com",
      date: "06/12/20",
    },
    {
      name: "Jessica Balara",
      email: "jessica.balara@gmail.com",
      date: "06/12/20",
    },
  ]);

  const handleEdit = (data: any) => {
    console.log("handle edit");
    setShowEditUserPopup((prev) => !prev);
    setSelectedUser(data);
    console.log("edit data", data);
  };

  const handleDelete = (data: any) => {
    console.log("handle delete");
    setShowDeleteUserPopup((prev) => !prev);
    setSelectedUser(data);
    console.log("edit data", data);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-2 h-[91%] overflow-y-auto"
    >
      {/* Breadcrumb */}
      <div className="flex items-center mx-10 mt-4 mb-2 gap-x-2">
        <p
          onClick={() => router.push("/vendor")}
          className="text-[#9FA2B4] text-sm cursor-pointer"
        >
          Vendor
        </p>
        <ChevronRight className="w-4 h-4 text-gray-400 cursor-pointer" />
        <p className="text-[#8B4DC5] text-sm cursor-pointer">User Management</p>
      </div>

      {/* Top Card */}
      <TopCard
        showPopup={showAddUserPopup}
        setShowPopup={setShowAddUserPopup}
      />

      {/* Admin User Cards */}
      <AdminUserCard
        users={adminUsers}
        isAdmin={true}
        setModel={handleEdit}
        setdeleteModel={handleDelete}
      />
      <AdminUserCard
        users={adminUsers}
        isAdmin={false}
        setModel={handleEdit}
        setdeleteModel={handleDelete}
      />

      {/* User Form Modal */}
      <AnimatePresence>
        {showAddUserPopup && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          >
            <UserForm
              showModel={showAddUserPopup}
              setModel={setShowAddUserPopup}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit User Form Modal */}
      <AnimatePresence>
        {showEditUserPopup && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          >
            <EditUserForm
              showModel={showEditUserPopup}
              setModel={setShowEditUserPopup}
              user={selectedUser}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete User Form Modal */}
      <AnimatePresence>
        {showDeleteUserPopup && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          >
            <DeleteUserCard
              showModel={showDeleteUserPopup}
              setModel={setShowDeleteUserPopup}
              user={selectedUser}
              onDelete={(email) => {
                setAdminUsers((prev) => prev.filter((u) => u.email !== email));
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Page;
