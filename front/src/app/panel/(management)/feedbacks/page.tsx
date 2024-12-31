"use client";
import React, { useEffect, useState } from "react";
import api from "@/services/clientApis";
import notify from "@/utils/notify";
import { useTranslations } from "next-intl";
import Table from "@/components/general/Table";
import PanelTitle from "@/components/general/PanelTitle";
import { useAppDispatch } from "@/hooks/useReduxHooks";
import { displayLoader, hideLoader } from "@/store/features/globalSlice";
import Modal from "@/components/general/Modal";

interface Feedback {
  id: number;
  name: string;
  img: string;
  jobTitle: string;
  desc: string;
}

function Feedbacks() {
  const t = useTranslations();
  const dispatch = useAppDispatch();
  const { getAllFeedbacks, deleteFeedback } = api;

  const headers = ["name", "image", "job_title", "description", "action"];
  const [rows, setRows] = useState<Feedback[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [isProcessing, setIsProcessing] = useState(true);
  const [currentFeedback, setCurrentFeedback] = useState<Feedback>({});
  const [showModal, setShowModal] = useState(false);

  const getFeedbacks = async (page: number) => {
    setIsProcessing(true);
    dispatch(displayLoader());

    try {
      const res = await getAllFeedbacks(`?page=${page}`);
      const allData = res.data?.map((item: Feedback) => {
        const handledItem = [
          {
            id: item.id,
            item_en: item.name,
            item_ar: item.name,
          },
          {
            id: item.id,
            isImg: true,
            item: item.img,
          },
          {
            id: item.id,
            item_en: item.jobTitle,
            item_ar: item.jobTitle,
          },
          {
            id: item.id,
            item_en: item.desc,
            item_ar: item.desc,
          },
          {
            id: item.id,
            isAction: true,
            hasDelete: true,
            hasEdit: true,
            currentItem: {
              id: item.id,
              name: item.name,
              img: item.img,
              jobTitle: item.jobTitle,
              desc: item.desc,
            },
          },
        ];
        return handledItem;
      });

      res.pagination?.currentPage &&
        setCurrentPage(+res.pagination?.currentPage);
      res.pagination?.perPage && setPerPage(+res.pagination?.perPage);
      res.pagination?.totalCount && setTotalCount(+res.pagination?.totalCount);
      setRows(allData);
    } catch (err: unknown) {
      const error = err as { customCode?: string };
      if (error?.customCode) {
        notify(t(`errors.requests.${error.customCode}`), { type: "error" });
      }
    } finally {
      dispatch(hideLoader());
      setIsProcessing(false);
    }
  };
  const addAction = async () => {};
  const editAction = async () => {};
  const deleteAction = (obj: object) => {
    openModal();
    setCurrentFeedback(obj);
    console.log(obj);
  };
  const navigation = (type: "next" | "prev") => {
    if (type == "next") {
      setCurrentPage((c) => c + 1);
      getFeedbacks(currentPage + 1);
    } else if (type == "prev") {
      setCurrentPage((c) => c - 1);
      getFeedbacks(currentPage - 1);
    }
  };
  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };
  const deleteFeedbackFun = async () => {
    try {
      const res = await deleteFeedback(currentFeedback.id);

      if (res.success)
        notify(t(`global.deleted_successfully`), { type: "success" });
      getFeedbacks(currentPage);
    } catch (err: unknown) {
      const error = err as { customCode?: string };
      if (error?.customCode) {
        notify(t(`errors.requests.${error.customCode}`), { type: "error" });
      }
    } finally {
      dispatch(hideLoader());
      setShowModal(false);
    }
  };

  useEffect(() => {
    getFeedbacks(currentPage);
  }, []);
  return (
    <div>
      {showModal && (
        <Modal
          closeModal={closeModal}
          title={"delete_feedback"}
          action={deleteFeedbackFun}
          actionTitle="delete"
        >
          <div>
            {t("popup.delete_feedback_req", {
              name: currentFeedback?.name ? currentFeedback.name : "",
            })}
          </div>
        </Modal>
      )}
      <PanelTitle title="feedback" />

      <Table
        addTitle={"add_feedback"}
        isLoading={isProcessing}
        page={"dashboard"}
        headers={headers}
        rows={rows}
        addAction={addAction}
        editAction={editAction}
        deleteAction={deleteAction}
        hasPagination={true}
        currentPage={currentPage}
        navigation={navigation}
        perPage={perPage}
        totalCount={totalCount}
      />
    </div>
  );
}

export default Feedbacks;
