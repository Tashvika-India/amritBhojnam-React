import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { getProductApi, postOptionsApi, putOptionsApi } from '../../../../services/adminApiRoutes';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import YellowButton from '../../../../components/buttons/YellowButton';
import useURLFilters from '../../../../custom-compoents/useURLFilters';
import { notifyError, notifySuccess } from '../../../../components/ui/Notification';

const ProductOption = ({ isEditMode = false, existingData = {} }) => {
    const formik = useFormik({
        initialValues: {
            product_id: existingData.product_id || '',
            option: existingData.option || '',
            price: existingData.price || '',
            stock: existingData.stock || '',
            discount: existingData.discount || '',
            discount_type: existingData.discount_type || '',
            sku: existingData.sku || '',
            unique_barcode: existingData.unique_barcode || '',
        },
        validationSchema: Yup.object({
            product_id: Yup.string().required('Product List is required'),
            option: Yup.string().required('Option is required'),
            price: Yup.number().required('Price is required').positive('Must be a positive number'),
            stock: Yup.number().required('Stock is required').min(0, 'Cannot be negative'),
            discount: Yup.number().optional(),
            discount_type: Yup.string().optional(),
            sku: Yup.string().optional(),
            unique_barcode: Yup.string().optional(),
        }),
        onSubmit: async (values, { resetForm }) => {
            console.log(values);
            try {
                if (isEditMode) {
                    await putOptionsApi(existingData.id, values);
                    notifySuccess("Product option updated successfully"); 
                } else {
                    await postOptionsApi(values);
                    notifySuccess("Product option added successfully!"); 
                    resetForm();
                }
            } catch (error) {
                console.error('Error submitting form:', error);
                notifyError("Something went wrong, please try again."); 
                alert('Something went wrong, please try again.');
            }
        },
    });

    const [filter, setFilter] = useURLFilters([]);
    const [loading, setLoading] = useState(false);

    const [products, setProducts] = useState([]);

    async function getProductList() {
        setLoading(true);
        try {
            const response = await getProductApi(filter);
            setProducts(response?.data || []);
        } catch (error) {
            console.log("Error on Product List", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getProductList();
    }, []);

    return (
        <div className="">
            <div className="card mb-4">
                <div className="card-body">
                    <h4 className="mb-4">Product Options</h4>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="row">
                            <div className="col-md-4 mb-4">
                                <FormControl fullWidth>
                                    <InputLabel id="product-list-label">Product List</InputLabel>
                                    <Select
                                        labelId="product-list-label"
                                        id="product_id"
                                        label="Product List"
                                        name="product_id"
                                        value={formik.values.product_id}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    >
                                    {products?.map((products) => (
                                            <MenuItem key={products.id} value={products.id}>
                                                {products.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    {formik.touched.product_id && formik.errors.product_id && (
                                        <div className="text-danger">{formik.errors.product_id}</div>
                                    )}
                                </FormControl>
                            </div>
                            <div className="col-md-4 mb-4">
                                <TextField
                                    id="option"
                                    label="Option"
                                    name="option"
                                    value={formik.values.option}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    variant="outlined"
                                    fullWidth
                                />
                                {formik.touched.option && formik.errors.option && (
                                    <div className="text-danger">{formik.errors.option}</div>
                                )}
                            </div>
                            <div className="col-md-4 mb-4">
                                <TextField
                                    id="price"
                                    label="Price"
                                    name="price"
                                    type='number'
                                    value={formik.values.price}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    variant="outlined"
                                    fullWidth
                                />
                                {formik.touched.price && formik.errors.price && (
                                    <div className="text-danger">{formik.errors.price}</div>
                                )}
                            </div>
                            <div className="col-md-4 mb-4">
                                <TextField
                                    id="stock"
                                    label="Stock"
                                    name="stock"
                                    type='number'
                                    value={formik.values.stock}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    variant="outlined"
                                    fullWidth
                                />
                                {formik.touched.stock && formik.errors.stock && (
                                    <div className="text-danger">{formik.errors.stock}</div>
                                )}
                            </div>
                            <div className="col-md-4 mb-4">
                                <TextField
                                    id="discount"
                                    label="Discount"
                                    name="discount"
                                    type='number'
                                    value={formik.values.discount}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    variant="outlined"
                                    fullWidth
                                />
                                {formik.touched.discount && formik.errors.discount && (
                                    <div className="text-danger">{formik.errors.discount}</div>
                                )}
                            </div>
                            <div className="col-md-4 mb-4">
                                <FormControl fullWidth>
                                    <InputLabel id="discount-type-label">Discount Type</InputLabel>
                                    <Select
                                        labelId="discount-type-label"
                                        label="Discount Type"
                                        id="discount_type"
                                        name="discount_type"
                                        value={formik.values.discount_type}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    >
                                        <MenuItem value="percentage">Percentage</MenuItem>
                                        <MenuItem value="fixed">Fixed</MenuItem>
                                    </Select>
                                    {formik.touched.discount_type && formik.errors.discount_type && (
                                        <div className="text-danger">{formik.errors.discount_type}</div>
                                    )}
                                </FormControl>
                            </div>
                            <div className="col-md-4 mb-4">
                                <TextField
                                    id="sku"
                                    label="SKU"
                                    name="sku"
                                    value={formik.values.sku}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    variant="outlined"
                                    fullWidth
                                />
                                {formik.touched.sku && formik.errors.sku && (
                                    <div className="text-danger">{formik.errors.sku}</div>
                                )}
                            </div>
                            <div className="col-md-4 mb-4">
                            <TextField
                                    id="unique_barcode"
                                    label="Unique Barcode (Optional)"
                                    name="unique_barcode"
                                    value={formik.values.unique_barcode}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    variant="outlined"
                                    fullWidth
                                />
                                {formik.touched.unique_barcode && formik.errors.unique_barcode && (
                                    <div className="text-danger">{formik.errors.unique_barcode}</div>
                                )}
                            </div>
                            <div className="col-12 d-flex gap-3 justify-content-end">
                                <YellowButton
                                    lable={isEditMode ? 'Update Options' : 'Add Options'}
                                    handleClick={formik.handleSubmit}
                                />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProductOption;
