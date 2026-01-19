import { PaginationProps } from "@/lib/types/props/pagination";
import { RightArrowIcon } from "../icons/RightArrowIcon";
import { LeftArrowIcon } from "../icons/LeftArrowIcon";

const ArrowButton = ({
  children,
  onClick,
  disabled = false,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}) => (
  <button
    type="button"
    disabled={disabled}
    className={`w-8 h-8 p-1 bg-gray-fill-light rounded border border-gray-stroke justify-center items-center inline-flex transition-colors
      ${disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer hover:bg-gray-fill"}`}
    onClick={disabled ? undefined : onClick}
  >
    {children}
  </button>
);

export default function Pagination({
  pageNumber,
  pageSize,
  totalRecords,
  onPageChange,
}: PaginationProps) {
  const firstRecordOnPage = (pageNumber - 1) * pageSize + 1;
  const lastRecordOnPage = Math.min(
    firstRecordOnPage + pageSize - 1,
    totalRecords
  );

  const isValidPage =
    firstRecordOnPage > 0 && firstRecordOnPage <= totalRecords;

  const canGoPrev = firstRecordOnPage > 1;
  const canGoNext = lastRecordOnPage < totalRecords;

  return (
    <div className="justify-start items-center gap-4 inline-flex text-sm text-gray-text">
      {firstRecordOnPage} - {lastRecordOnPage} of {totalRecords}
      <div className="inline-flex gap-2">
        <ArrowButton
          onClick={() => onPageChange(pageNumber - 1)}
          disabled={!canGoPrev}
        >
          <LeftArrowIcon />
        </ArrowButton>
        <ArrowButton
          onClick={() => onPageChange(pageNumber + 1)}
          disabled={!canGoNext}
        >
          <RightArrowIcon />
        </ArrowButton>
      </div>
    </div>
  );
}
