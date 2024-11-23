import React from "react";
import useGetData from "../../../hooks/useGetData";
import { BsChat } from "react-icons/bs";
import axiosInstance from "../../../service/axiosInstance";
import Pagination from "../../../components/pagination/Pagination";
const Users = ({ onClose }) => {
  const { data, setQuery } = useGetData("/api/user");

  const createChatRoom = async (userId) => {
    try {
      const response = await axiosInstance.post("/api/chat/room", {
        user_id: userId,
      });
      if (response.status === 201) {
        onClose();
      }
    } catch (err) {
      console.log("error", err);
    }
  };
  // for next page
  const onPageChange = async (page) => {
    setQuery({ page: page });
  };
  return (
    <div className="grid gap-8 py-5">
      <ul className="grid gap-2">
        {data?.results?.map((item) => (
          <li className="py-2 border-b border-border flex items-center justify-between gap-2 ">
            <figure className="flex items-center gap-2">
              <img
                src={item?.avatar}
                className="w-[45px] h-[45px] rounded-full object-cover object-center"
              />
              <h2 className="text-text-1">{item?.full_name}</h2>
            </figure>
            <span role="button" onClick={() => createChatRoom(item?.userId)}>
              <BsChat size={18} color="var(--primary)" />
            </span>
          </li>
        ))}
      </ul>
      {data?.results && (
        <Pagination
          currentPage={data?.page}
          totalCount={data?.pages}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
};

export default Users;
