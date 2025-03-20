import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';
import { Avatar } from 'primereact/avatar';
import { Stack } from 'react-bootstrap';

const ActiveCustomersTable = () => {
  const reviews = [
    { customerId: '367332', customerName: 'Aman Kumar', phone: '+91 1234567890', email: 'Lorem ipsum is simply dummy text...', date: '5 Aug, 2024', time: '07:00PM', rating: 5, initials: 'AK' },
    { customerId: '634782', customerName: 'Raj Singh', phone: '+91 1234567890', email: 'Lorem ipsum is simply dummy text...', date: '5 Aug, 2024', time: '07:00PM', rating: 4, initials: 'RS' },
    { customerId: '745883', customerName: 'David', phone: '+91 1234567890', email: 'Lorem ipsum is simply dummy text...', date: '5 Aug, 2024', time: '07:00PM', rating: 5, initials: 'D' },
    { customerId: '846272', customerName: 'Piyush', phone: '+91 1234567890', email: 'Lorem ipsum is simply dummy text...', date: '5 Aug, 2024', time: '07:00PM', rating: 4.5, initials: 'P' },
    { customerId: '857353', customerName: 'Rahul Singh', phone: '+91 1234567890', email: 'Lorem ipsum is simply dummy text...', date: '5 Aug, 2024', time: '07:00PM', rating: 4.5, initials: 'RS' },
    { customerId: '634782', customerName: 'Mohit Kumar', phone: '+91 1234567890', email: 'Lorem ipsum is simply dummy text...', date: '5 Aug, 2024', time: '07:00PM', rating: 4, initials: 'MK' }
];

const getRandomColor = () => {
  // Generate a random color in hex format
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const isGreyColor = (color) => {
  // Check if the color is grey by comparing RGB values
  const rgb = parseInt(color.slice(1), 16);
  const r = (rgb >> 16) & 0xFF;
  const g = (rgb >> 8) & 0xFF;
  const b = rgb & 0xFF;
  return r === g && g === b; // Check if all RGB components are equal
};

const lightenColor = (color, percent) => {
  // Lighten the color by the given percentage
  const rgb = parseInt(color.slice(1), 16);
  let r = (rgb >> 16) & 0xFF;
  let g = (rgb >> 8) & 0xFF;
  let b = rgb & 0xFF;

  r = Math.min(255, r + (255 - r) * percent);
  g = Math.min(255, g + (255 - g) * percent);
  b = Math.min(255, b + (255 - b) * percent);

  return `#${((1 << 24) + (Math.round(r) << 16) + (Math.round(g) << 8) + Math.round(b)).toString(16).slice(1)}`;
};

const dateTimeTemplate = (rowData) => {
    return `${rowData.date} ${rowData.time}`;
};

const ratingBodyTemplate = (rowData) => {
    return <Rating value={rowData.rating} readOnly stars={5} cancel={false} />;
};

const actionBodyTemplate = () => {
    return (
        <Button icon="pi pi-pencil" className="p-button-rounded p-button-text" />
    );
};
const nameBodyTemplate =(rowData)=>{
  let backgroundColor = getRandomColor();
  let color = getRandomColor();

  // If the color is grey, set the background color to a lighter shade
  if (isGreyColor(backgroundColor)) {
      backgroundColor = lightenColor(backgroundColor, 0.3); // 30% lighter
  }

  return (
      <div className="d-flex align-items-center gap-3">
          <Avatar
              style={{ backgroundColor: backgroundColor, color: color }}
              label={rowData.initials}
              shape="circle"
              className="p-4"
          />
          <div>
              <span>{rowData.customerName}</span>
          </div>
      </div>
  );
}
return (
    <div className="card">
        <DataTable value={reviews} paginator rows={10} responsiveLayout="scroll">
            <Column field="customerId" header="CUSTOMER ID"></Column>
            <Column field="name" header="NAME"  body={nameBodyTemplate}></Column>
            <Column field="email" header="EMAIL"></Column>
            <Column field="phone" header="PHONE"></Column>
            <Column header="Action" body={actionBodyTemplate}></Column>
        </DataTable>
    </div>
)};

export default ActiveCustomersTable;
