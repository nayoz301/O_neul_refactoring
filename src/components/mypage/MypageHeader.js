import React from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import { MainHeader, HeaderWrapper } from "../../styles/main/Main.style";
import { connect } from "react-redux";
import { logout } from "../../actions";

const MainHeaderCompo = ({ logout }) => {
  const history = useHistory();
  const Logout = () => {
    return axios
      .get("https://oneul.site/O_NeulServer/user/signout", {
        withCredentials: true,
      })
      .then(() => {
        console.log("λ‘κ·Έμμ");
        logout();
        history.push("/");
        Swal.fire({
          title: "π λ‘κ·Έμμ π₯²",
          showConfirmButton: true,
          timer: 5000,
        });
      });
  };

  return (
    <MainHeader>
      <HeaderWrapper>
        <Link to="/main">
          <h1>μ€λ ,</h1>
        </Link>
        <button onClick={Logout}>λ‘κ·Έμμ</button>
      </HeaderWrapper>
    </MainHeader>
  );
};

const mapStateToProps = ({ loginReducer }) => {
  return {
    userLogin: loginReducer,
  };
};

export default connect(mapStateToProps, { logout })(MainHeaderCompo);
