
import React, { useState,useEffect } from "react";
import { getNotificationApi } from "../../../../services/adminApiRoutes";
import { Paginator } from 'primereact/paginator';

const NotificationTable = ({totalRecord,setTotalRecord}) => {
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const[page,setPage] = useState(1)

const[notification,setNotification] = useState([])
const[loading,setLoading] = useState(false)

const handleNotification =async()=>{
  setLoading(true)
try{
  const response = await getNotificationApi( page,rows)
  setNotification(response?.data?.results)
  setTotalRecord(response?.data?.count)

}catch(error){
  console.log(error)
}finally{
  setLoading(false)
}
}
const onPageChange = (event) => {
  setFirst(event.first); 
  setRows(event.rows); 
 setPage(event.first / event.rows + 1); 

};
useEffect(()=>{

  handleNotification()
},[page,rows])
  return (
    <div className="card">
      <div className="card-body">
       { notification?.map((item)=><div className="d-flex justify-content-between align-items-center pb-3" style={{borderBottom: "1px solid #EEEEEE"}}>
          <ul>
            <li className="d-flex gap-3 align-items-center">
              <img
                className="img-fluid mt-1 mx-1"
                src={item?.icon_url?item?.icon_url:"https://dev-env.amritbhojanam.com/media/notification_icons/received.png"}
                alt="star"
              />
              <div>
                <p className="fb-fs-18 fw-600 mb-2">{item?.web_notification_title}</p>
                <p className="mb-0">
                {item?.sub_title}
                </p>
              </div>
            </li>
          </ul>
          <ul>
            <li>
                <p className="text-mid-grey mb-0">{item?.days} Day ago</p>
            </li>
          </ul>
        </div>)}
        <div className="card">
            <Paginator first={first} rows={rows} totalRecords={totalRecord}  onPageChange={onPageChange} />
        </div>
      </div>
    </div>
  );
};

export default NotificationTable;
