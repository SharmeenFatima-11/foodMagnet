"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import TopCard from "../../components/card/userManagement/topCard";
import AdminUserCard from "../../components/card/userManagement/adminUsersCard";
import UserForm from "../../components/form/addUserForm";
import EditUserForm from "../../components/form/editUserForm";
import DeleteUserCard from "../../components/card/userManagement/deleteUser";
import { GetUsers } from "../../lib/api/userManagement/userApis";

const Page = () => {
  const router = useRouter();
  const [showAddUserPopup, setShowAddUserPopup] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [showEditUserPopup, setShowEditUserPopup] = useState(false);
  const [showDeleteUserPopup, setShowDeleteUserPopup] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [adminUsers, setAdminUsers] = useState([]);
  const [viewOnlyUsers, setViewOnlyUsers] = useState([])

  useEffect(() => {
    GetUsers()
      .then((data) => {
        console.log("users", data);
        setAdminUsers(data.adminUsers);
        setViewOnlyUsers(data.viewOnlyUsers);
      })
      .catch((error) => {
        console.error("get users failed:", error.message);
      });
  }, [isAdded]);

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
          Home
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
        users={viewOnlyUsers}
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
              setIsAdded={setIsAdded}
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
              setIsAdded={setIsAdded}
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
              setModel={setShowDeleteUserPopup}
              user={selectedUser}
              setIsAdded={setIsAdded}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Page;
