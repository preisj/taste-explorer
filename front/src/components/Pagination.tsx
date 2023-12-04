import React from "react";
import { ArrowLeft, ArrowRight } from "phosphor-react";

export interface Props {
  currentPage: number;
  perPage: number;
  totalPages: number;
  handlePagination: (page: number) => void;
}
export const Pagination: React.FC<Props> = ({
  currentPage,
  totalPages,
  handlePagination,
}) => {
  return (
    <div className="flex justify-center align-bottom bottom-0 absolute ml-[22%] w-[20%] mb-4">
      <div className="flex flex-col items-center justify-center mt-3">
        <span className="text-black text-sm mb-1">Showing 5 of 50 results</span>
        <div className="flex justify-center">
          {currentPage !== 1 && (
            <button
              onClick={() => handlePagination(currentPage - 1)}
              type="button"
              className="rounded-lg h-8 w-8 items-center flex justify-center border-solid border-[1px] transition-all m-1 text-black"
            >
              <ArrowLeft size={16} />
            </button>
          )}
          <button
            onClick={() => handlePagination(1)}
            type="button"
            className="rounded-lg h-8 w-8 items-center flex justify-center border-solid border-[1px] transition-all m-1 text-black border-black"
          >
            {1}
          </button>
          {currentPage > 3 && (
            <div className="rounded-lg h-8 w-8 items-center flex justify-center border-solid border-[1px] transition-all m-1 text-black border-black">
              ...
            </div>
          )}
          {currentPage === totalPages && totalPages > 3 && (
            <button
              onClick={() => handlePagination(currentPage - 2)}
              type="button"
              className="rounded-lg h-8 w-8 items-center flex justify-center border-solid border-[1px] transition-all m-1 text-black border-black"
            >
              {currentPage - 2}
            </button>
          )}
          {currentPage > 2 && (
            <button
              onClick={() => handlePagination(currentPage - 1)}
              type="button"
              className="rounded-lg h-8 w-8 items-center flex justify-center border-solid border-[1px] transition-all m-1 text-black border-black"
            >
              {currentPage - 1}
            </button>
          )}
          {currentPage !== 1 && currentPage !== totalPages && (
            <button
              onClick={() => handlePagination(currentPage)}
              type="button"
              className="rounded-lg h-8 w-8 items-center flex justify-center border-solid border-[1px] transition-all m-1 text-black border-black"
            >
              {currentPage}
            </button>
          )}
          {currentPage < totalPages - 1 && (
            <button
              onClick={() => handlePagination(currentPage + 1)}
              type="button"
              className="rounded-lg h-8 w-8 items-center flex justify-center border-solid border-[1px] transition-all m-1 text-black border-black "
            >
              {currentPage + 1}
            </button>
          )}
          {currentPage === 1 && totalPages > 3 && (
            <button
              onClick={() => handlePagination(currentPage + 2)}
              type="button"
              className="rounded-lg h-8 w-8 items-center flex justify-center border-solid border-[1px] transition-all m-1 text-black border-black "
            >
              {currentPage + 2}
            </button>
          )}
          {currentPage < totalPages - 2 && (
            <div className="rounded-lg h-8 w-8 items-center flex justify-center border-solid border-[1px] transition-all m-1 text-black border-black ">
              ...
            </div>
          )}
          <button
            onClick={() => handlePagination(totalPages)}
            type="button"
            className="rounded-lg h-8 w-8 items-center flex justify-center border-solid border-[1px] transition-all m-1 text-black border-black "
          >
            {totalPages}
          </button>
          {currentPage !== totalPages && (
            <button
              onClick={() => handlePagination(currentPage + 1)}
              type="button"
              className="rounded-lg h-8 w-8 items-center flex justify-center border-solid border-[1px]  transition-all m-1 text-black border-black "
            >
              <ArrowRight size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
