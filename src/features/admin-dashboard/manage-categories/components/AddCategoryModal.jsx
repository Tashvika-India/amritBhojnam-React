import React, { useState } from "react";
import { Dialog } from 'primereact/dialog';
import YellowButton from "../../../../components/buttons/YellowButton";
import RejectButton from "../../../../components/buttons/RejectButton";
import { TextField } from "@mui/material";
import IosSwitch from "../../../../components/ui/IosSwitch"; 
import FileUpload from "../../../../components/fileUpload/FileUpload";

export default function AddCategoryModal({ visible, setVisible }) {
    const [uploadedFile, setUploadedFile] = useState(null);

    const footerContent = (
        <div className="d-inline-flex gap-3">
            <RejectButton lable="Cancel"  handleClick={() => setVisible(false)} />
            <YellowButton lable="+ Add" />
        </div>
    );

    const customHeader = (
        <div className="d-flex align-items-center justify-content-between border-bottom pb-3">
            <h5 className="m-0 fs-bold">Add Category</h5>
            <div className="">
                <IosSwitch /> <span className="fs-6 text-secondary fw-normal">Active</span>
            </div>
        </div>
    );

    return (
        <div className="card flex justify-content-center">
            <Dialog
                visible={visible}
                style={{ width: '40vw' }}
                className="rounded-20"
                onHide={() => setVisible(false)}
                footer={footerContent}
                closable={false} // Removes the default close icon
                header={customHeader} // Custom header
            >
                <div className="p-fluid">
                    {/* File Upload */}
                    <div className="mb-4">
                        <FileUpload/>
                    </div>
                    <div className="mb-4">
                        <TextField
                            fullWidth
                            // value={values?.email}
                            // onChange={handleChange}
                            // onBlur={handleBlur}
                            name=" "
                            // error={ifError("email")}
                            // helperText={ifError("email") && errors.email}
                            variant="outlined"
                            placeholder="Category Name"
                        />
                    </div>
                    <div>
                        <TextField
                            fullWidth
                            // value={values?.email}
                            // onChange={handleChange}
                            // onBlur={handleBlur}
                            name=" "
                            multiline
                            rows={3}
                            // error={ifError("email")}
                            // helperText={ifError("email") && errors.email}
                            variant="outlined"
                            placeholder="Description"
                        />
                    </div>
                </div>
            </Dialog>
        </div>
    );
}
