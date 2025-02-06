import React, { useEffect, useState } from "react";
import Heading from "@/components/ui/Heading";
import YellowButton from "@/components/buttons/YellowButton";
import { getContactApi } from "../../../services/adminApiRoutes";
import Loading from "../../../components/ui/Loading";
import ContactTable from "./components/ContactTable";
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs'; 
import { Link } from "react-router-dom";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";


function ManageContact() { 
  const [contact, setContact] = useState([]);  
  const [loading, setLoading] = useState(false);
  const[filter,setFilter] = useState("")

  async function getContact() {
    setLoading(true);
    try {
      const response = await getContactApi();
      setContact(response?.data || []);
    } catch (error) {
      console.log("Error on Category List", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getContact();
  }, []);

  return (
    <>
      <div className="mt-5 mb-4 row">
        <div className="col-md-6">
          <Heading value={"Contact"} />
        </div>
        <div className="col-12 mt-4">
          <Breadcrumbs aria-label="breadcrumb">
            <Link to={"/admin/dashboard"}>Dashboard</Link>
            <Typography className="text-orange">Contact</Typography>
          </Breadcrumbs>
        </div>
      </div>

      <div className="">
        <div className="card">
          <div className="card-body">
           <div className="d-flex justify-content-between align-items-center my-3">
           <div className="col-md-9"></div>
            <div className="col-md-3">
                <div style={{ width: "14rem" }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label" size="small">Category</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Category"
                      onChange={(e) =>
                        setFilter(e.target.value)
                      }
                      size="small">
                      <MenuItem value="subscribe" >Subscribe</MenuItem>
                      <MenuItem value="unSubcribed">Unsubscribed</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
                      </div>
            {loading ? (
              <Loading />
            ) : (
              <ContactTable  contact={contact} filter={filter} setContact={setContact}/>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ManageContact;
