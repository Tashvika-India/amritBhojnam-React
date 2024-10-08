import React from "react";
import Header from "../../../layout/web-layout/Header";
import Footer from "../../../layout/web-layout/Footer";
import { TabPanel, TabView } from "primereact/tabview";
import { TextField } from "@mui/material";
import pencilImg from "../../../assets/images/web/account/pencil.png";

const UserProfile = () => {
  return (
    <div className="web-wrapper-main">
      <Header />
      {/* <Link to="/accounts"> </Link> */}
      <div className="container fb-container ps-5  pe-5">
        <TabView>
          <TabPanel header="My Account" leftIcon="pi pi-user me-2">
            <div className="account-section">
            <div className="d-flex justify-content-between">
              <p className="fb-fs-26">My Account</p>
              <div className="d-flex">
              <img
                  className="img-fluid"
                  src={pencilImg}
                  alt="pencil"
                  style={{width: "2rem", aspectRatio: "16/14", objectFit: "scale-down"}}
                />
                <p className="fw-500 mt-2">Edit</p>
                </div>
                </div>
              <TextField 
              className="w-50 rounded-20 me-5"
                id="outlined-basic"
                label="Outlined"
                variant="outlined"
              />
              <TextField
                id="outlined-basic"
                label="Outlined"
                variant="outlined"
              />
              <TextField
                id="outlined-basic"
                label="Outlined"
                variant="outlined"
              />
            </div>
          </TabPanel>
          <TabPanel header="Order History" leftIcon="pi pi-box me-2">
            <p className="m-0">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
              aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
              eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci
              velit, sed quia non numquam eius modi.
            </p>
          </TabPanel>
          <TabPanel header="Address Book" leftIcon="pi pi-map-marker me-2">
            <p className="m-0">
              At vero eos et accusamus et iusto odio dignissimos ducimus qui
              blanditiis praesentium voluptatum deleniti atque corrupti quos
              dolores et quas molestias excepturi sint occaecati cupiditate non
              provident, similique sunt in culpa qui officia deserunt mollitia
              animi, id est laborum et dolorum fuga. Et harum quidem rerum
              facilis est et expedita distinctio. Nam libero tempore, cum soluta
              nobis est eligendi optio cumque nihil impedit quo minus.
            </p>
          </TabPanel>
        </TabView>
      </div>
      <Footer />
    </div>
  );
};
export default UserProfile;
