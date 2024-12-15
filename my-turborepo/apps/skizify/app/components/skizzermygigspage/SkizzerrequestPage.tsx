"use client";
import { skizzerRequests } from "../../lib/actions/skizzerRequests";
import EnhancedGigCards from "./SkizzzerRequestCard2";
import { GiguserContent, GigStatus } from "@repo/store/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../@/components/ui/select";
import { useState, useEffect } from "react";
import SkeletonSkizzergigs from "./SkeletonSkizzergigs";

export default function SkizzerrequestPage() {
  const [filter, setFilter] = useState<GigStatus | "ALL">("ALL");
  const [requests, setRequests] = useState<GiguserContent[]>([]);

  // Fetch requests on component mount
  useEffect(() => {
    const fetchRequests = async () => {
      const fetchedRequests = (await skizzerRequests()) as GiguserContent[];
      setRequests(fetchedRequests);
    };
    fetchRequests();
  }, []);

  if (!requests || requests.length === 0) {
    return <div>
      <SkeletonSkizzergigs />
    </div>;
  }

  const filteredRequests =
    filter === "ALL"
      ? requests
      : requests.filter((request) => request.status === filter);

  return (
    <div className="min-h-screen bg-white p-4 dark:bg-gradient-to-br dark:from-black dark:to-neutral-900 sm:p-8">
      <div className="mb-6 flex justify-end">
        <div className="group relative">
          <Select
            defaultValue="ALL"
            onValueChange={(value) => setFilter(value as GigStatus | "ALL")}
          >
            <SelectTrigger className="w-[200px] rounded-md border-neutral-300 bg-gradient-to-r from-neutral-100 to-neutral-200 shadow-sm transition-all duration-300 hover:scale-[1.02] hover:border-neutral-400 hover:shadow-md dark:border-neutral-700 dark:from-neutral-800 dark:to-neutral-900 dark:hover:border-neutral-600">
              <SelectValue
                placeholder="Filter by status"
                className="text-neutral-700 dark:text-neutral-200"
              />
            </SelectTrigger>
            <SelectContent className="space-y-1 rounded-md border border-neutral-200 bg-white p-1 shadow-lg backdrop-blur-lg dark:border-neutral-800 dark:bg-neutral-900">
              <SelectItem
                value="ALL"
                className="rounded-md px-4 py-2 text-neutral-700 transition-colors duration-200 bg-white dark:bg-transparent hover:bg-neutral-100/80 dark:text-neutral-200 dark:hover:bg-neutral-800/80"
              >
                All Requests
              </SelectItem>
              <SelectItem
                value={GigStatus.CONFIRMED}
                className="rounded-md px-4 py-2 text-neutral-700 transition-colors duration-200 bg-white dark:bg-transparent hover:bg-neutral-100/80 dark:text-neutral-200 dark:hover:bg-neutral-800/80"
              >
                {GigStatus.CONFIRMED}
              </SelectItem>
              <SelectItem
                value={GigStatus.PENDING}
                className="rounded-md px-4 py-2 text-neutral-700 transition-colors duration-200 bg-white dark:bg-transparent hover:bg-neutral-100/80 dark:text-neutral-200 dark:hover:bg-neutral-800/80"
              >
                {GigStatus.PENDING}
              </SelectItem>
              <SelectItem
                value={GigStatus.REJECTED}
                className="rounded-md px-4 py-2 text-neutral-700 transition-colors duration-200 bg-white dark:bg-transparent hover:bg-neutral-100/80 dark:text-neutral-200 dark:hover:bg-neutral-800/80"
              >
                {GigStatus.REJECTED}
              </SelectItem>
            </SelectContent>
          </Select>
          <div className="pointer-events-none absolute inset-0 rounded-md bg-gradient-to-r from-neutral-400/20 to-neutral-300/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-neutral-600/20 dark:to-neutral-500/20"></div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4 4xl:grid-cols-5">
        {filteredRequests.map((gig: GiguserContent) => (
          <EnhancedGigCards key={gig.id} gig={gig} />
        ))}
      </div>
    </div>
  );
}
