import React from "react";
import Dropdown, { StatusType } from "@/components/atoms/Dropdown";
import { MockItemRequest } from "@/lib/types/mock/request";
import { RequestStatus } from "@/lib/types/request";

interface ItemRequestsTableProps {
  requests: MockItemRequest[];
  onStatusChange: (id: string, newStatus: RequestStatus) => void;
  loading?: boolean;
}

//stole date format func from online; busy work
function formatDate(date: Date | string | null): string {
  if (!date) return "-";
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "2-digit",
  });
}

export default function ItemRequestsTable({
  requests,
  onStatusChange,
  loading = false,
}: ItemRequestsTableProps) {
  if (loading) {
    return (
      <div className="w-full">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <span className="ml-3 text-gray-text">Loading requests...</span>
        </div>
      </div>
    );
  }

  if (requests.length === 0) {
    return (
      <div className="w-full">
        <div className="flex items-center justify-center py-12 text-gray-text">
          Nothing found.
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* desktop view */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-stroke bg-[#FCFCFD]">
              <th className="px-4 py-3 text-left text-sm font-normal text-gray-text">
                Name
              </th>
              <th className="px-4 py-3 text-left text-sm font-normal text-gray-text">
                Item Requested
              </th>
              <th className="px-4 py-3 text-left text-sm font-normal text-gray-text">
                Created
              </th>
              <th className="px-4 py-3 text-left text-sm font-normal text-gray-text">
                Updated
              </th>
              <th className="px-4 py-3 text-left text-sm font-normal text-gray-text">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-stroke">
            {requests.map((request) => (
              <tr key={request.ID}>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-text-dark">
                  {request.requestorName}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-text-dark">
                  {request.itemRequested}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-text">
                  {formatDate(request.createdDate)}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-text">
                  {formatDate(request.lastEditedDate || " ---- ")}
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <Dropdown
                    status={request.status as StatusType}
                    onChange={(newStatus) =>
                      onStatusChange(request.ID, newStatus as RequestStatus)
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/*mobile view*/}
      <div className="md:hidden divide-y divide-gray-stroke">
        {requests.map((request) => (
          <div key={request.ID} className="p-4 space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium text-gray-text-dark">
                  {request.requestorName}
                </h4>
                <p className="text-sm text-gray-text mt-1">
                  {request.itemRequested}
                </p>
              </div>
            </div>
            <div className="flex gap-4 text-xs text-gray-text">
              <div>
                <span className="font-medium">Created:</span>{" "}
                {formatDate(request.createdDate)}
              </div>
              <div>
                <span className="font-medium">Updated:</span>{" "}
                {formatDate(request.lastEditedDate || " --")}
              </div>
            </div>
             <Dropdown
                status={request.status as StatusType}
                onChange={(newStatus) =>
                  onStatusChange(request.ID, newStatus as RequestStatus)
                }
              />
          </div>
        ))}
      </div>
    </div>
  );
}
