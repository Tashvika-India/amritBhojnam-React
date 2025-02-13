import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { MdDelete } from "react-icons/md"; 
import DeleteModal from "../../../../components/ui/DeleteModal";
import { notifyError, notifySuccess } from "../../../../components/ui/Notification";
import {deleteMealHealthIssue, getMealHealthIssueApi } from "../../../../services/adminApiRoutes"; 
import AddHealthIssue from "./AddHealthIssue";
import YellowButton from "../../../../components/buttons/YellowButton";
import Loading from "../../../../components/ui/Loading";

function HealthIssueTable() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [current, setCurrent] = useState(null);
  const [visible, setVisible] = useState(false);
  const [issue, setIssue] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getDataList() {
    try {
      const response = await getMealHealthIssueApi();
      setIssue(response?.data?.results || []);
    } catch (error) {
      console.log("Error on health issue list", error);
    }
  }

  const showDeleteModal = (data) => {
    setCurrent(data);
    setModalVisible(true);
  };

  const hideDeleteModal = () => {
    setModalVisible(false);
    setCurrent(null);
  };


  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteMealHealthIssue(current.id);
      setModalVisible(false);
      setCurrent(null);
      getDataList();
      setLoading(false);
      notifySuccess("Health Issue deleted successfully");
    } catch (error) {
      console.error("Error deleting Health Issue:", error);
      notifyError(error.response?.data?.error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getDataList();
  }, []);


  const editButtonTemplate = (rowData) => (
    <div className="w-100 d-flex gap-3">
      <button
        className="text-danger d-flex gap-2 align-items-center border-0 rounded"
        title="Delete"
        style={{ backgroundColor: "#d5768f38", padding: ".3rem .523rem"}}
        onClick={() => showDeleteModal(rowData)}>
        <MdDelete size={20} />
      </button>
    </div>
  );

  return (
    <>
      <div className="row">
        <div className=" d-flex justify-content-between align-items-center mb-3">
          <h5 className="fw-500 mb-0 text-dark-grey">Health Issue</h5>
          <YellowButton handleClick={() => setVisible(true)} lable={"+ Add"} />
        </div>
      </div>
      {
        loading ? (
          <Loading />
        ) : (
          <>
            <DataTable responsiveLayout="scroll" paginator value={issue} rows={10} rowkey="id">
              <Column field="health_issues" header="NAME" className="fw-400" ></Column>
              <Column field="user_count" header="USER" className="fw-400" ></Column>
              <Column header="ACTION" body={editButtonTemplate} style={{ width: "15%" }}></Column>
            </DataTable>
            <DeleteModal visible={isModalVisible} onHide={hideDeleteModal} onDelete={handleDelete} />
            <AddHealthIssue visible={visible} setVisible={setVisible} getDataList={getDataList} />
          </>
        )
      }
    </>
  );
}

export default HealthIssueTable;
