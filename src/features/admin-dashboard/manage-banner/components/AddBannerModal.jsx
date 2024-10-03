import React, { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import YellowButton from "../../../../components/buttons/YellowButton";
import RejectButton from "../../../../components/buttons/RejectButton";
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import IosSwitch from "../../../../components/ui/IosSwitch";
import FileUpload from "../../../../components/fileUpload/FileUpload";
import { useFormik } from "formik";
import { postBannerApi, postCategoriesApi } from "../../../../services/adminApiRoutes";
import Loading from "../../../../components/ui/Loading";

export default function AddBannerModal({ visible, setVisible, setBanner }) {
  const [loading, setLoading] = useState(false);
  const initialValues = {
    title: "",
    sub_title: "",
    description: "",
    plateform: "",
    position: "",
    img_file: null,
    is_active: true,
  };

  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      addBanner(values);
    },
  });

  const { values, handleSubmit, resetForm, setValues } = formik;

  async function addBanner(values) { 
    setLoading(true);
    const formData = new FormData(); 
    formData.append("title", values.title);
    formData.append("sub_title", values.sub_title);
    formData.append("description", values.description);
    formData.append("platfrorm", values.platfrorm);
    formData.append("position", values.position);
    formData.append("img_file", values.img_file);
    formData.append("is_active", values.is_active); 
    try {
      const response = await postBannerApi(formData); 
      formik.resetForm();
      setVisible(false);
      setBanner((prevBanners) => [...prevBanners, response?.data]);
    } catch (error) {
      console.log("Error adding banner", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {}, []);

  return (
    <div className="card flex justify-content-center">
      <Dialog
        visible={visible}
        style={{ width: "40vw" }}
        className="rounded-20"
        onHide={() => setVisible(false)}
        footer={<FooterContent formik={formik} setVisible={setVisible} />}
        closable={false}
        header={<CustomHeader formik={formik} />}
      >
        {loading ? (
          <Loading />  
        ) : (
        <form onSubmit={formik.handleSubmit}>
          <div className="p-fluid">
            <div className="mb-4">
              <FileUpload formik={formik} name="img_file" />
            </div>
            <div className="mb-4">
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Title"
                name="title"
                onChange={formik.handleChange}
                value={formik.values.title}
              />
            </div>
            <div className="mb-4">
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Sub Title"
                name="sub_title"
                onChange={formik.handleChange}
                value={formik.values.sub_title}
              />
            </div>
            <div className="mb-4">
                <FormControl fullWidth>
                  <InputLabel id="plateform-simple-select-label">
                    Select Plateform
                  </InputLabel>
                  <Select
                    labelId="plateform-simple-select-label"
                    id="plateform-simple-select" 
                    label="Select Plateform"
                    name="plateform"
                    onChange={formik.handleChange}
                    value={formik.values.plateform}
                  >
                    <MenuItem value="web">Web</MenuItem>
                    <MenuItem value="mobile">Mobile</MenuItem> 
                  </Select>
                </FormControl>
              </div>
            <div className="mb-4">
                <FormControl fullWidth>
                  <InputLabel id="position-simple-select-label">
                    Select Position
                  </InputLabel>
                  <Select
                    labelId="position-simple-select-label"
                    id="position-simple-select" 
                    label="Select Position"
                    name="position"
                    onChange={formik.handleChange}
                    value={formik.values.position}
                  >
                    <MenuItem value="top">Top</MenuItem>
                    <MenuItem value="middle">Middle</MenuItem>
                    <MenuItem value="bottom">Bottom</MenuItem>
                  </Select>
                </FormControl>
              </div>
            <div className="mb-4">
              <TextField
                fullWidth
                variant="outlined" 
                multiline={true}
                rows={3}
                placeholder="Description"
                name="description"
                onChange={formik.handleChange}
                value={formik.values.description}
              />
            </div>
          </div>
        </form>
        )}
      </Dialog>
    </div>
  );
}

function CustomHeader({ formik }) {
  return (
    <>
      <div className="d-flex align-items-center justify-content-between border-bottom pb-3">
        <h5 className="m-0 fs-bold">Add Banner</h5>
        <div>
        <IosSwitch
          checked={formik.values.is_active}
          name="is_active"  
          onChange={formik.handleChange}
        />
          <span className="fs-6 text-secondary fw-normal">Active</span>
        </div>
      </div>
    </>
  );
}

function FooterContent({ formik, setVisible, loading }) {
  return (
    <>
      <div className="d-inline-flex gap-3">
        <RejectButton lable="Cancel" handleClick={() => setVisible(false)} />
        <YellowButton lable="+ Add" handleClick={formik.handleSubmit} disabled={loading}/>
      </div>
    </>
  );
}
