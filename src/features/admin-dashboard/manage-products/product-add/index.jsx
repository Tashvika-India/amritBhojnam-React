import React from 'react'
import Heading from "@/components/ui/Heading";
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import RejectButton from '../../../../components/buttons/RejectButton';
import YellowButton from '../../../../components/buttons/YellowButton';
import MultiFileUpload from './components/MultiFileUpload';
const ProductAdd = () => {
    return (
        <>
            <div className="mt-3 mb-5 row">
                <div className="col-md-6">
                    <Heading value={"Add New Products"} />
                </div>
            </div>
            <div className="">
                <div className="card mb-4">
                    <div className="card-body">
                        <h6 className='mb-4'>Image</h6>
                        <div className="">
                        <MultiFileUpload/>
                        </div>
                    </div>
                </div>
                <div className="card mb-4">
                    <div className="card-body">
                        <h6 className='mb-4'>Product</h6>
                        <div className="row">
                            <div className="col-md-4 mb-4">
                                <TextField id="outlined-basic" label="Product Name" variant="outlined" fullWidth />
                            </div>
                            <div className="col-md-8 mb-4">
                                <TextField id="outlined-basic" label="Short description" variant="outlined" fullWidth />
                            </div>
                            <div className="col-md-4 mb-4">
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Select Type</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value=""
                                        label="Select Type"
                                    // onChange={handleChange}
                                    >
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="col-md-4 mb-4">
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Select Category</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value=""
                                        label="Select Category"
                                    >
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="col-md-4 mb-4">
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Select Sub Category</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value=""
                                        label="Select Sub Category"
                                    >
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="col-md-4 mb-4">
                                <TextField type='date' id="outlined-basic" variant="outlined" fullWidth />
                            </div>
                            <div className="col-md-4 mb-4">
                                <TextField id="outlined-basic" label="Days" variant="outlined" fullWidth />
                            </div>
                            <div className="col-md-4 mb-4">
                                <TextField id="outlined-basic" label="Enter Tags" variant="outlined" fullWidth />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card mb-4">
                    <div className="card-body">
                        <h6 className='mb-4'>Product Detail</h6>
                        <div className="row">
                            <div className="col-md-4 mb-4">
                                <TextField id="outlined-basic" label="Unit Type" variant="outlined" fullWidth />
                            </div>
                            <div className="col-md-4 mb-4">
                                <TextField id="outlined-basic" label="Unit Title" variant="outlined" fullWidth />
                            </div>
                            <div className="col-md-12 mb-4">
                                <TextField id="outlined-basic" label="Description" multiline rows={3} variant="outlined" fullWidth />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card mb-4">
                    <div className="card-body">
                        <h6 className='mb-4'>Options</h6>
                        <div className="row">
                            <div className="col-md-4 mb-4">
                                <TextField id="outlined-basic" label="Option" variant="outlined" fullWidth />
                            </div>
                            <div className="col-md-4 mb-4">
                                <TextField id="outlined-basic" label="Price" variant="outlined" fullWidth />
                            </div>
                            <div className="col-md-4 mb-4">
                                <TextField id="outlined-basic" label="Stock" variant="outlined" fullWidth />
                            </div>
                            <div className="col-md-4 mb-4">
                            </div>
                            <div className="col-md-4 mb-4">
                                <TextField id="outlined-basic" label="Dicsount" variant="outlined" fullWidth />
                            </div>
                            <div className="col-md-4 mb-4">
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Discount Type</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value=""
                                        label="Discount Type"
                                    >
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="col-md-4 mb-4">
                            </div>
                            <div className="col-md-4 mb-4">
                                <TextField id="outlined-basic" label="SKU" variant="outlined" fullWidth />
                            </div>
                            <div className="col-md-4 mb-4">
                                <TextField id="outlined-basic" label="Unique Barcode(If you want)" variant="outlined" fullWidth />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card mb-4">
                    <div className="card-body">
                        <div className="d-flex gap-3 justify-content-end">
                            <YellowButton lable="Add Product" />
                            <RejectButton lable="Cancel" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductAdd