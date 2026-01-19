"use client";

import { useEffect, useState, useCallback } from "react";
import ItemRequestsTable from "@/components/tables/Table";
import Pagination from "@/components/molecules/Pagination";
import StatusTabs, { StatusTab } from "@/components/molecules/StatusTabs";
import { MockItemRequest } from "@/lib/types/mock/request";
import { RequestStatus } from "@/lib/types/request";
import { PAGINATION_PAGE_SIZE } from "@/lib/constants/config";

interface ApiResponse {
  data: MockItemRequest[]; //just used this from mock folder; didn't want to create a new one
  totalPages: number;
  totalRecords: number;
  currentPage: number;
  pageSize: number;
}

export default function ItemRequestsPage() {
  const [requests, setRequests] = useState<MockItemRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [activeTab, setActiveTab] = useState<StatusTab>("all");

  const fetchRequests = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      let url = `/api/request?page=${currentPage}`;
      if (activeTab !== "all") {
        url += `&status=${activeTab}`;
      }

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Failed to fetch requests: ${response.statusText}`);
      }

      const data: ApiResponse = await response.json();
      setRequests(data.data || []);
      setTotalRecords(data.totalRecords || 0);
    } catch (err) {
      console.error("Error fetching requests:", err);
      setError(err instanceof Error ? err.message : "An error occurred while fetching requests");
      setRequests([]);
      setTotalRecords(0);
    } finally {
      setLoading(false);
    }
  }, [currentPage, activeTab]);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  const handleStatusChange = async (id: string, newStatus: RequestStatus) => {
    try {
      const response = await fetch("/api/request", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          status: newStatus,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to update status: ${response.statusText}`);
      }

      setRequests((prev) =>
        prev.map((req) =>
          req.ID === id ? { ...req, status: newStatus, lastEditedDate: new Date() } : req
        )
      );

      if (activeTab !== "all" && newStatus !== activeTab) {
        fetchRequests();
      }
    } catch (err) {
      console.error("Error updating status:", err);
      setError(err instanceof Error ? err.message : "An error occurred while updating status");
      fetchRequests();
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleTabChange = (tab: StatusTab) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  return (
    <div className="max-w mx-10 px-4 py-4">
      <div className="bg-white p-6">
        <h2 className="text-xl text-black-text-dark mb-4">Item Requests</h2>

        {error && (
          <div className="mb-4 p-4 bg-black border border-red rounded-lg text-white">
            <p className="font-medium">Error</p>
            <p className="text-sm">{error}</p>
            <button
              onClick={fetchRequests}
              className="mt-2 text-sm no-underline"
            >
              Try again
            </button>
          </div>
        )}

        <div className="mb-0">
          <StatusTabs activeTab={activeTab} onTabChange={handleTabChange} />
        </div>

        <div className="max-w border-t border-[#EAECF0] overflow-hidden">
          <ItemRequestsTable
            requests={requests}
            onStatusChange={handleStatusChange}
            loading={loading}
          />
        </div>

        {!loading && totalRecords > 0 && (
          <div className="mt-4 flex justify-end">
            <Pagination
              pageNumber={currentPage}
              pageSize={PAGINATION_PAGE_SIZE}
              totalRecords={totalRecords}
              onPageChange={handlePageChange}
            />
          </div>
        )}
        
      </div>
    </div>
  );
}
