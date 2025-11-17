"use client";
import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SearchField from "../../components/textFields/searchField";
import { FunnelIcon } from "@heroicons/react/24/solid";
import Button from "../../components/button/squareButton";
import Table from "../../components/table/vendorTable";
import Filter from "../../components/filters/page";
import AddVendorForm from "../../components/form/addVendorForm";
import { GetVendors } from "../../lib/api/vendor/vendorApi";
import { useViewOnly } from "@/context/ViewOnlyContext";

const Page = () => {
  const [search, setSearch] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [showAddVendorModal, setShowAddVendorModal] = useState(false);
  const { isViewOnly } = useViewOnly();

  const [filters, setFilters] = useState({
    subscription: "", // e.g. "Free", "Standard"
    permitStatus: "", // e.g. "valid" | "expired"
    city: "",
  });

  const [data, setData] = useState<any[]>([]);

  // ✅ Compute filtered + searched data
  const filteredData = useMemo(() => {
    const query = search.toLowerCase().trim();
    const today = new Date();

    return data.filter((item) => {
      // Compute status
      const permitDate = new Date(item.permitExpiration);
      const monthsUntilExpiry =
        (permitDate.getFullYear() - today.getFullYear()) * 12 +
        (permitDate.getMonth() - today.getMonth());

      let status = "inactive";

      if (item.activeStatus) {
        if (permitDate < today) {
          status = "expired";
        } else if (monthsUntilExpiry <= 2) {
          status = "expiring soon";
        } else {
          status = "active";
        }
      }

      // 🔍 Search filter
      const matchesSearch =
        !query ||
        `${item.firstName} ${item.lastName}`.toLowerCase().includes(query) ||
        item.businessName?.toLowerCase().includes(query) ||
        item.businessAddress?.toLowerCase().includes(query);

      // 🎟️ Subscription filter
      const matchesSubscription =
        !filters.subscription ||
        item.subscriptionTitle?.toLowerCase() ===
          filters.subscription.toLowerCase();

      // 🧾 Permit/activation filter
      const matchesPermit =
        !filters.permitStatus ||
        status.toLowerCase() === filters.permitStatus.toLowerCase();

      // 🏙️ City filter
      const matchesCity =
        !filters.city ||
        item.city?.toLowerCase().includes(filters.city.toLowerCase());

      return (
        matchesSearch && matchesSubscription && matchesPermit && matchesCity
      );
    });
  }, [search, data, filters]);

  // ✅ Fetch vendor data
  useEffect(() => {
    GetVendors()
      .then((res) => {
        console.log("data fetched successfully:", res);
        setData(res.foodTrucksData || []);
      })
      .catch((error) => {
        console.error("error in fetching vendors:", error.message);
      });
  }, []);

  return (
    <motion.div
      className="m-4 relative overflow-hidden"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {/* Header Section */}
      <motion.div
        className="flex flex-wrap items-center justify-between gap-4 px-4 sm:px-6 md:px-7"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4, ease: "easeOut" }}
      >
        {/* Search + Filter */}
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
          <div className="flex-grow sm:flex-grow-0 sm:w-64">
            <SearchField value={search} setValue={setSearch} />
          </div>
          <button
            className="cursor-pointer transition-transform hover:scale-110 flex-shrink-0"
            onClick={() => setShowFilter((prev) => !prev)}
          >
            <FunnelIcon className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Add Vendor */}
        {isViewOnly ? null : (
          <div>
            <div className="w-full sm:w-auto flex justify-end">
              <Button
                text="Add Vendor"
                onClick={() => setShowAddVendorModal(true)}
              />
            </div>
          </div>
        )}
      </motion.div>

      {/* Table Section */}
      <motion.div
        className="m-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <Table data={filteredData} />
      </motion.div>

      {/* 🧩 Filter Sidebar */}
      <AnimatePresence>
        {showFilter && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowFilter(false)}
            />
            <Filter
              showFilter={showFilter}
              setShowFilter={setShowFilter}
              filters={filters}
              setFilter={setFilters}
            />
          </>
        )}
      </AnimatePresence>

      {/* 🧩 Add Vendor Modal */}
      <AnimatePresence>
        {showAddVendorModal && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddVendorModal(false)}
            />
            <AddVendorForm
              showModel={showAddVendorModal}
              setModel={setShowAddVendorModal}
            />
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Page;
