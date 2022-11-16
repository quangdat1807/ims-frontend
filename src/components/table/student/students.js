import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TableCell,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ReusableTable from "../../componentsReuse/reusableTable";
import * as apiaxios from "../../../api/service";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import Swal from "sweetalert2";
import ReusableDialog from "../../componentsReuse/reusableDialog";
import { useForm } from "react-hook-form";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs from "dayjs";

const headCells = [
  {
    disablePadding: true,
    label: "Họ tên",
  },
  {
    disablePadding: false,
    label: "Email",
  },
  {
    disablePadding: false,
    label: "Trường",
  },
  {
    disablePadding: false,
    label: "Trạng thái",
  },
  {
    disablePadding: false,
    label: "Số điện thoại",
  },
  {
    disablePadding: false,
    label: "Tên DG",
  },
  {
    disablePadding: false,
    label: "Tên Mentor",
  },
  {
    disablePadding: false,
    label: "Tác vụ",
  },
];

function Students() {
  const [posts, setPosts] = useState([]);
  const { register, handleSubmit, reset } = useForm();
  const [openEdit, setOpenEdit] = useState(false);
  const [titleBatch, settitleBatch] = useState([]);
  const [testDate, setTestDate] = useState("");
  const [certificationDate, setCertificationDate] = useState("");
  const [dayOfBirth, setDayOfBirth] = useState("")
  const [mentor, setMentor] = useState([]);
  const [idDG, setIdDG] = useState([]);
  const [dg, setDg] = useState([]);
  const idBatch = localStorage.getItem("idBatch");
  const [values, setValues] = useState({
    idInternship: "",
    fullNameInternship: "",
    address: "",
    dayOfBirth: "",
    university: "",
    email: "",
    idMentor: "",
    telInternship: "",
    internshipProject: "",
    internshipAgreementPolicy: "",
    securityTest: "",
    idDG: "",
    toeicScore: "",
    testDate: "",
    securityAwareness: "",
    pmtoolsAgileMethodology: "",
    workEtiquetteProfessionalCommunication: "",
    presentationSkills: "",
    trainingAttendance: "",
    status: "",
    remark: "",
    pcType: "",
    internshipSchedule: "",
    covidVaccinationiInformation: "",
    certificationDate: "",
    internshipDomain: "",
    nameCoure: "",
    fullNameMentor: "",
    nameDG: "",
    internshipStatus: "",
  });

  const fetchMentor = () => {
    apiaxios
      .mentorAPI(`mentor/batch/${idBatch}?idDG=${idDG}`, null)
      .then((res) => {
        setMentor(res.data.data);
      });
  };

  const fecthData = () => {
    apiaxios.student(`internship/batch/${idBatch}`).then((res) => {
      setPosts(res.data.data);
    });
  };

  useEffect(() => {
    apiaxios
      .mentorDG(`dg?idInternshipCourse=${idBatch}`, "Get", null)
      .then((res) => {
        setDg(res.data.data);
      });
    fecthData();
    fetchMentor();
  }, [idBatch, posts]);

  useEffect(() => {
    setTestDate(values.testDate);
    setCertificationDate(values.certificationDate);
    setDayOfBirth(values.dayOfBirth)
  }, [values]);

  const [valuesId, setValuesId] = useState(null);
  const handleEditClick = (students) => {
    reset();
    setValuesId(students.idInternship);
    const formValues = {
      idInternship: students.idInternship,
      fullNameInternship: students.fullNameInternship,
      address: students.address === null ? "" : students.address,
      dayOfBirth: students.dayOfBirth === undefined ? "" : students.dayOfBirth,
      university: students.university === null ? "" : students.university,
      email: students.email === null ? "" : students.email,
      idMentor: students.idMentor,
      internshipProject:
        students.internshipProject === null ? "" : students.internshipProject,
      telInternship:
        students.telInternship === null ? "" : students.telInternship,
      securityTest: students.securityTest === null ? "" : students.securityTest,
      idDG: students.idDG,
      internshipAgreementPolicy:
        students.internshipAgreementPolicy === null
          ? ""
          : students.internshipAgreementPolicy,
      toeicScore: students.toeicScore === null ? "" : students.toeicScore,
      testDate: students.testDate === null ? "" : students.testDate,
      securityAwareness:
        students.securityAwareness === null ? "" : students.securityAwareness,
      pmtoolsAgileMethodology:
        students.pmtoolsAgileMethodology === null
          ? ""
          : students.pmtoolsAgileMethodology,
      workEtiquetteProfessionalCommunication:
        students.workEtiquetteProfessionalCommunication === null
          ? ""
          : students.workEtiquetteProfessionalCommunication,
      presentationSkills:
        students.presentationSkills === null ? "" : students.presentationSkills,
      trainingAttendance:
        students.trainingAttendance === null ? "" : students.trainingAttendance,
      status: students.status === null ? "" : students.status,
      remark: students.remark === null ? "" : students.remark,
      pcType: students.pcType === null ? "" : students.pcType,
      internshipSchedule: students.internshipSchedule,
      covidVaccinationiInformation:
        students.covidVaccinationiInformation === null
          ? ""
          : students.covidVaccinationiInformation,
      certificationDate:
        students.certificationDate === null ? "" : students.certificationDate,
      internshipDomain:
        students.internshipDomain === null ? "" : students.internshipDomain,
      nameCoure: students.nameCoure === null ? "" : students.nameCoure,
      fullNameMentor: students.fullNameMentor,
      nameDG: students.nameDG,
      internshipStatus:
        students.internshipStatus === null ? "" : students.internshipStatus,
    };
    setValues(formValues);
  };

  const onSubmitEdit = (data) => {
    data.idInternship = values.idInternship;
    data.dayOfBirth = values.dayOfBirth;
    data.testDate = dayjs(testDate).format("YYYY/MM/DD");
    data.certificationDate = dayjs(certificationDate).format("YYYY/MM/DD");
    data.dayOfBirth = dayjs(dayOfBirth).format("YYYY/MM/DD");
    data.address = values.address;
    data.nameDG = values.nameDG;
    data.nameCoure = values.nameCoure;
    data.fullNameMentor = values.fullNameMentor;
    console.log(data);
    apiaxios
      .editStudent(`internship/${valuesId}`, data)
      .then((res) => {
        const newBatch = [...posts];
        const index = posts.findIndex(
          (students) => students.idInternship === valuesId
        );
        newBatch[index] = data;
        setPosts(newBatch);
        settitleBatch(newBatch);
        reset();
        if (res.data) {
          Swal.fire({
            icon: "success",
            title: "Sửa thành công",
            showConfirmButton: false,
            timer: 1500,
            style: "display:block",
          });
        }
      })
      .catch((error) => {
        if (error.response) {
          Swal.fire({
            icon: "error",
            text: error.response.data.error,
            confirmButtonText: "Xác nhận",
          });
        } else if (error.request) {
          Swal.fire({
            icon: "error",
            text: error.request,
            confirmButtonText: "Xác nhận",
          });
        } else {
          console.log("Error", error.message);
          Swal.fire({
            icon: "error",
            text: error.message,
            confirmButtonText: "Xác nhận",
          });
        }
      });
    handleClose();
  };

  const onSubmitAdd = (dataAdd) => {
    console.log(dataAdd);
    dataAdd.testDate = dayjs(testDate).format("YYYY/MM/DD");
    dataAdd.certificationDate = dayjs(certificationDate).format("YYYY/MM/DD");
    dataAdd.dayOfBirth = dayjs(dayOfBirth).format("YYYY/MM/DD");
    apiaxios
      .studentCreate(`internship?idInternshipCourse=${idBatch}`, dataAdd)
      .then((res) => {
        const newBatch = [...posts, dataAdd];
        setPosts(newBatch);
        if (res.data) {
          Swal.fire({
            icon: "success",
            title: "Thêm thành công",
            showConfirmButton: false,
            timer: 1500,
            style: "display:block",
          });
        }
        reset();
      })
      .catch((error) => {
        if (error.response) {
          Swal.fire({
            icon: "error",
            text: error.response.data.error,
            confirmButtonText: "Xác nhận",
          });
        } else if (error.request) {
          Swal.fire({
            icon: "error",
            text: error.request,
            confirmButtonText: "Xác nhận",
          });
        } else {
          console.log("Error", error.message);
          Swal.fire({
            icon: "error",
            text: error.message,
            confirmButtonText: "Xác nhận",
          });
        }
      });
    handleClose();
  };

  const handleDeleteClick = (postsId) => {
    Swal.fire({
      title: "Bạn có muốn xóa thực tập sinh này ?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      reverseButtons: true,
      confirmButtonColor: "#3085d6",
      cancelButtonText: "Hủy",
      confirmButtonText: "Đồng ý",
    }).then((result) => {
      if (result.isConfirmed) {
        const newContacts = [...posts];
        const index = posts.findIndex(
          (products) => products.idInternship === postsId
        );
        apiaxios
          .deleteStudent(`internship/${postsId}`, "DELETE", newContacts)
          .then((res) => {});
        newContacts.splice(index, 1);
        setPosts(newContacts);
      }
    });
  };
  const [openAdd, setOpenAdd] = useState(false);
  const handleOpenAdd = () => {
    setOpenAdd(true);
  };
  const handleOpenEdit = () => {
    setOpenEdit(true);
  };

  const handleClose = () => {
    setOpenEdit(false);
    setOpenAdd(false);
  };

  const titleTable = "Danh sách thực tập sinh";
  const titleEdit = "Cập nhật thực tập sinh";
  const titleAdd = "Thêm thực tập sinh";
  const buttonAdd = "Thêm";
  const buttonEdit = "Cập nhật";
  const children = posts.map((row, index) => {
    return (
      <TableRow
        hover
        //   onClick={(event) => handleClick(event, row.name)}
        tabIndex={-1}
        key={index}
      >
        <TableCell>{row.fullNameInternship}</TableCell>
        <TableCell>{row.email}</TableCell>
        <TableCell>{row.university}</TableCell>
        <TableCell>{row.internshipStatus}</TableCell>
        <TableCell>{row.telInternship}</TableCell>
        <TableCell>{row.nameDG}</TableCell>
        <TableCell>{row.fullNameMentor}</TableCell>
        <TableCell>
          <EditIcon
            sx={{
              fontSize: 22,
              color: "#1976d2",
              borderRadius: "20%",
              cursor: "pointer",
              mr: 1,
              "&:hover": {
                color: "white",
                backgroundColor: "#1976d2",
              },
            }}
            variant="outlined"
            onClick={() => {
              handleEditClick(row);
              handleOpenEdit();
            }}
          />
          <DeleteForeverIcon
            sx={{
              fontSize: 22,
              color: "red",
              borderRadius: "20%",
              cursor: "pointer",
              "&:hover": {
                color: "white",
                backgroundColor: "red",
              },
            }}
            onClick={() => handleDeleteClick(row.idInternship)}
          />
        </TableCell>
      </TableRow>
    );
  });
  const mainEdit = (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Typography sx={{ ml: 1, fontWeight: 600 }}>
          Thông tin cá nhân:
        </Typography>
        <div>
          <TextField
            label="Họ tên"
            size="small"
            defaultValue={values.fullNameInternship}
            name="fullNameInternship"
            {...register("fullNameInternship")}
          />
          <TextField
            label="Số điện thoại"
            size="small"
            defaultValue={values.telInternship}
            name="telInternship"
            {...register("telInternship")}
          />
          <TextField
            label="Email"
            size="small"
            defaultValue={values.email}
            name="email"
            {...register("email")}
          />
        </div>
        <div>
          <TextField
            required
            id="outlined-required"
            size="small"
            label="Địa chỉ"
            defaultValue={values.address}
            name="address"
            {...register("address")}
          />
          <DesktopDatePicker
            label="Ngày sinh"
            //   maxDate={today}
            inputFormat="DD/MM/YYYY"
            value={dayOfBirth}
            name="certificationDate"
            onChange={(newValue) => {
              setDayOfBirth(dayjs(newValue).format("MM/DD/YYYY"));
            }}
            renderInput={(params) => <TextField size="small" {...params} />}
          />
        </div>
        <Typography sx={{ ml: 1, mt: 1, fontWeight: 600 }}>
          Thông tin thực tập:
        </Typography>
        <div>
          <TextField
            required
            id="outlined-required"
            size="small"
            label="Trường học"
            defaultValue={values.university}
            name="university"
            {...register("university")}
          />
          <TextField
            required
            id="outlined-required"
            size="small"
            label="Vị trí thực tập"
            defaultValue={values.internshipDomain}
            name="internshipDomain"
            {...register("internshipDomain")}
          />
          <TextField
            required
            id="outlined-required"
            size="small"
            label="Trạng thái"
            defaultValue={values.status}
            name="status"
            {...register("status")}
          />
        </div>

        <div>
          <TextField
            label="Dự án thực tập"
            size="small"
            defaultValue={values.internshipProject}
            name="internshipProject"
            {...register("internshipProject")}
          />
          <TextField
            required
            id="outlined-required"
            size="small"
            label="Thỏa thuận thực tập"
            defaultValue={values.internshipAgreementPolicy}
            name="internshipAgreementPolicy"
            {...register("internshipAgreementPolicy")}
          />
          <TextField
            required
            id="outlined-required"
            size="small"
            label="Điểm bảo mật"
            defaultValue={values.securityTest}
            name="securityTest"
            {...register("securityTest")}
          />
        </div>
        <div>
          <TextField
            required
            id="outlined-required"
            size="small"
            label="Điểm toeic"
            defaultValue={values.toeicScore}
            name="toeicScore"
            {...register("toeicScore")}
          />

          <DesktopDatePicker
            label="Ngày test Toeic"
            //   maxDate={today}
            inputFormat="DD/MM/YYYY"
            value={testDate}
            onChange={(newValue) => {
              setTestDate(dayjs(newValue).format("MM/DD/YYYY"));
            }}
            renderInput={(params) => <TextField size="small" {...params} />}
          />

          <TextField
            required
            id="outlined-required"
            size="small"
            label="Nhận thức bảo mật"
            defaultValue={values.securityAwareness}
            name="securityAwareness"
            {...register("securityAwareness")}
          />
        </div>
        <div>
          <TextField
            required
            id="outlined-required"
            size="small"
            label="Phương pháp Agile"
            defaultValue={values.pmtoolsAgileMethodology}
            name="pmtoolsAgileMethodology"
            {...register("pmtoolsAgileMethodology")}
          />
          <TextField
            required
            id="outlined-required"
            size="small"
            label="Nghi thức truyền thông"
            defaultValue={values.workEtiquetteProfessionalCommunication}
            name="workEtiquetteProfessionalCommunication"
            {...register("workEtiquetteProfessionalCommunication")}
          />
          <TextField
            required
            id="outlined-required"
            size="small"
            label="Kỹ năng thuyết trình"
            defaultValue={values.presentationSkills}
            name="presentationSkills"
            {...register("presentationSkills")}
          />
        </div>
        <div>
          <TextField
            required
            id="outlined-required"
            size="small"
            label="Tham gia khóa đào tạo"
            defaultValue={values.trainingAttendance}
            name="trainingAttendance"
            {...register("trainingAttendance")}
          />
          <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
            <InputLabel htmlFor="grouped-select">Loại thực tập</InputLabel>
            <Select
              defaultValue={values.internshipSchedule}
              id="grouped-select"
              label="Loại thực tập"
              name="internshipSchedule"
              {...register("internshipSchedule")}
            >
              <MenuItem value="Full time">Full time</MenuItem>;
              <MenuItem value="Part time">Part time</MenuItem>;
            </Select>
          </FormControl>

          <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
            <InputLabel htmlFor="grouped-select">Loại PC</InputLabel>
            <Select
              defaultValue={values.pcType}
              id="grouped-select"
              label="Loại PC"
              name="pcType"
              {...register("pcType")}
            >
              <MenuItem value="PC">PC</MenuItem>;
              <MenuItem value="Laptop">Laptop</MenuItem>;
            </Select>
          </FormControl>
        </div>
        <div>
          <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
            <InputLabel htmlFor="grouped-select">Mentor</InputLabel>
            <Select
              defaultValue={values.idMentor}
              id="grouped-select"
              label="Mentor"
              name="idMentor"
              {...register("idMentor")}
            >
              {mentor?.map((item, i) => {
                return (
                  <MenuItem key={i} value={item.idMentor}>
                    {item.fullNameMentor}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>

          <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
            <InputLabel htmlFor="grouped-select">Tên DG</InputLabel>
            <Select
              defaultValue={values.idDG}
              id="grouped-select"
              label="Tên DG"
              name="idDG"
              {...register("idDG")}
            >
              {dg?.map((item, i) => {
                return (
                  <MenuItem key={i} value={item.idDG}>
                    {item.nameDG}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
            <InputLabel htmlFor="grouped-select">
              Trạng thái thực tập
            </InputLabel>
            <Select
              defaultValue={values.internshipStatus}
              id="grouped-select"
              label="Trạng thái thực tập"
              name="internshipStatus"
              {...register("internshipStatus")}
            >
              <MenuItem value="Dừng thực tập">Dừng thực tập</MenuItem>;
              <MenuItem value="Đang thực tập">Đang thực tập</MenuItem>;
            </Select>
          </FormControl>
        </div>
        <div>
          <TextField
            required
            id="outlined-required"
            size="small"
            label="Bình luận"
            defaultValue={values.remark}
            name="remark"
            {...register("remark")}
          />
          <TextField
            required
            id="outlined-required"
            size="small"
            label="Thông tin Covid"
            defaultValue={values.covidVaccinationiInformation}
            name="covidVaccinationiInformation"
            {...register("covidVaccinationiInformation")}
          />

          <DesktopDatePicker
            label="Ngày chứng nhận"
            //   maxDate={today}
            inputFormat="DD/MM/YYYY"
            value={certificationDate}
            name="certificationDate"
            onChange={(newValue) => {
              setCertificationDate(dayjs(newValue).format("MM/DD/YYYY"));
            }}
            renderInput={(params) => <TextField size="small" {...params} />}
          />
        </div>
        
      </LocalizationProvider>
    </>
  );

  return (
    <>
      {/* Load data table */}
      <ReusableTable
        title={titleTable}
        handleSubmit={handleOpenAdd}
        handleClose={handleClose}
        headCells={headCells}
        children={children}
      />
      {/* Edit student */}
      <ReusableDialog
        isOpen={openEdit}
        handleClose={handleClose}
        title={titleEdit}
        onSubmit={handleSubmit(onSubmitEdit)}
        children={mainEdit}
        button={buttonEdit}
      />
      {/* Add student */}
      <ReusableDialog
        isOpen={openAdd}
        handleClose={handleClose}
        title={titleAdd}
        onSubmit={handleSubmit(onSubmitAdd)}
        children={mainEdit}
        button={buttonAdd}
      />
    </>
  );
}

export default Students;
