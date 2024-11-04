import React, { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import YellowButton from "../../../../components/buttons/YellowButton";
import RejectButton from "../../../../components/buttons/RejectButton";
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import IosSwitch from "../../../../components/ui/IosSwitch";
import FileUpload from "../../../../components/fileUpload/FileUpload";
import { bannerSchema } from "../../../../schemas/banner-schema";
import { useFormik } from "formik";
import { postBannerApi, putBannerApi } from "../../../../services/adminApiRoutes";
import Loading from "../../../../components/ui/Loading";
import { notifyError, notifySuccess } from "../../../../components/ui/Notification";

export default function AddBannerModal({ visible, setVisible, setBanner, getBanner, editData }) {
  const [loading, setLoading] = useState(false);
  const initialValues = {
    title: "",
    sub_title: "",
    description: "",
    platform: "",
    position: "",
    img_file: null,
    is_active: true,
  };
  
  const formik = useFormik({
    initialValues: editData ? editData : initialValues,
    enableReinitialize: true,
    validationSchema: bannerSchema,
    onSubmit: async (values) => {
      if (editData) {
        await UpdateBanner(values); // PUT or PATCH for edit
      } else {
        await addBanner(values); // POST for new banner
      }
    },
  });


  const { values, handleSubmit, handleBlur, resetForm, setValues, errors } = formik;

  async function addBanner(values) {
    setLoading(true);
    const formData = new FormData();

    formData.append("title", values.title);
    formData.append("sub_title", values.sub_title);
    formData.append("description", values.description);
    formData.append("platform", values.platform);
    formData.append("position", values.position);

    // Only append the file if it's a new upload
    if (values.img_file instanceof File) {
      formData.append("img_file", values.img_file);
    }

    formData.append("is_active", values.is_active);

    try {
      const response = await postBannerApi(formData);
      formik.resetForm();
      setVisible(false);
      setBanner((prevBanners) => [...prevBanners, response?.data]);
      notifySuccess("Banner Added Successfully");
    } catch (error) {
      console.error("Error adding banner", error);
      notifyError("Failed to add banner!");
    } finally {
      setLoading(false);
    }
  }


  async function UpdateBanner(values) {
    setLoading(true);
    const formData = new FormData();

    formData.append("title", values.title);
    formData.append("sub_title", values.sub_title);
    formData.append("description", values.description);
    formData.append("platform", values.platform);
    formData.append("position", values.position);

    // Append file only if it's changed
    if (values.img_file instanceof File) {
      formData.append("img_file", values.img_file);
    }

    formData.append("is_active", values.is_active);

    try {
      const response = await putBannerApi(editData.id, formData);
      formik.resetForm();
      getBanner();
      setVisible(false);
      notifySuccess("Banner Updated Successfully");
    } catch (error) {
      console.error("Failed to update banner!", error);
      notifyError("Failed to update banner!");
    } finally {
      setLoading(false);
    }
  }



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
                  onBlur={handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.title}
                />
                <p>{errors.title}</p>
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
                 <p>{errors.sub_title}</p>
              </div>
              <div className="mb-4">
                <FormControl fullWidth>
                  <InputLabel id="platform-simple-select-label">
                    Select platform
                  </InputLabel>
                  <Select
                    labelId="platform-simple-select-label"
                    id="platform-simple-select"
                    label="Select platform"
                    name="platform"
                    onChange={formik.handleChange}
                    value={formik.values.platform}>
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

function FooterContent({ formik, setVisible, loading, editData }) {
  return (
    <>
      <div className="d-inline-flex gap-3">
        <RejectButton lable="Cancel" handleClick={() => setVisible(false)} />
        <YellowButton lable="Save Changes" handleClick={formik.handleSubmit} disabled={loading} />
      </div>
    </>
  );
}
