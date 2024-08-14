"use client";

import { useRouter } from "next/navigation";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import Card from "@/module/Card";
import styles from "@/module/DashboardCard.module.css";

function DashboardCard({ data }) {
  const router = useRouter();
  const editHandler = () => {
    router.push(`/dashboard/my-profiles/${data._id}`);
  };

  const deleteHandler = () => {};

  return (
    <div className={styles.container}>
      <Card data={data} />
      <div className={styles.main}>
        <button onClick={editHandler}>
          ویرایش
          <FiEdit />
        </button>
        <button onClick={deleteHandler}>
          حذف آگهی <AiOutlineDelete />
        </button>
      </div>
    </div>
  );
}

export default DashboardCard;
