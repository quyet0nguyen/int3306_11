var React = require('react');
require('../bootstrap.min.css');
require('./signupForm.css');

module.exports = SignUpForm;
function SignUpForm(props){
  React.Component.call(this, props);
  this.state = {
        taskName: ""
    }

    this.render = function() {
  return(
  <div className="bg">
    <div className="container col-md-6">
      <img className="logo my-3 mx-auto d-block" width="120px" />
      <h1 className="text-center my-3 textwhite">Hệ Thống Quản Lý Phòng Học</h1>
      <form className="needs-validation">
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="firstName" className="textwhite">First Name</label>
            <input type="text" className="form-control " id="firstName" />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="lastName" className="textwhite">Last Name</label>
            <input type="text" className="form-control" id="lastName" />
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="userName" className="textwhite">Chọn Tên Người Dùng Của Bạn</label>
          <input type="text" className="form-control" id="userName" placeholder="UserName" />
        </div>
        <div className="mb-3">
          <label htmlFor="passWord" className="textwhite">Tạo Mật Khẩu</label>
          <input type="password" className="form-control" id="password" />
        </div>
        <div className="mb-3">
          <label htmlFor="passWord1" className="textwhite">Xác Nhận Mật Khẩu Của Bạn</label>
          <input type="password" className="form-control" id="password1" />
        </div>

        <label htmlFor="birthDay" className="textwhite">Sinh Nhật</label>
        <div className="row mb-3">
          <input type="text" id="date" placeholder="Date" className="col-md-3 mx-3 form-control" />
          <input type="text" id="month" placeholder="Month" className="col-md-3 mx-3 form-control" />
          <input type="text" id="year" placeholder="Year" className="col-md-3 mx-3 form-control" />
        </div>
        <div className="mb-3">
          <label htmlFor="sex" className="textwhite">Giới Tính</label>
          <select className="custom-select d-block col-md-6" id="sex">
            <option value>Choose...</option>
            <option>Nam</option>
            <option>Nữ</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="function" className="textwhite">Chức Vụ</label>
          <select className="custom-select d-block col-md-6" id="function">
            <option value>Choose...</option>
            <option>Sinh Viên</option>
            <option>Giáo Viên</option>
            <option>Nhân Viên Phòng Giáo Vụ</option>
          </select>
        </div>
        <hr className="mb-4" />
        <button className="btn btn-primary btn-lg btn-block">Đăng Kí</button>
      </form>
    </div>
  </div>
  );
  }
}

SignUpForm.prototype = Object.create(React.Component.prototype);