import * as React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { popUpActions } from "../../../redux/store/popup";
import { dataAction } from "../../../redux/store/datapreview";
import { useEffect, useState } from "react";
import { sendEmail, saveDataInterview } from "../../../api/service";
import Swal from "sweetalert2";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";

const CalendarInterview = () => {
  const dispatch = useDispatch();
  const showPopUp = useSelector((state) => state.popup.showModal);
  const handleClose = () => {
    dispatch(popUpActions.hide());
  };
  const showPreview = () => {
    dispatch(popUpActions.showPreview());
    dispatch(popUpActions.hide());
    dispatch(
      dataAction.setDataPreview({
        name: enterInternName,
        email: enterInternEmail,
        mentor: enterName,
        emailMentor: enterEmail,
        link: enterLink,
        date: dayjs(enterDate).format("DD/MM/YYYY"),
        time: dayjs(enterTime).format("HH:mm"),
        tite: title,
      })
    );
  };

  const dataIntern = useSelector((state) => state.popup.data);
  const today = new Date();
  useEffect(() => {
    setEnterInternName(dataIntern?.fullName);
    setEnterInternEmail(dataIntern?.email);
    setId(dataIntern?.id);
  }, [dataIntern]);
  const [title, setTitle] = useState("");
  const [enterEmail, setEnterEmail] = useState("");
  const [enterName, setEnterName] = useState("");
  const [enterLink, setEnterLink] = useState("");
  const [enterInternName, setEnterInternName] = useState("");
  const [enterInternEmail, setEnterInternEmail] = useState("");
  const [id, setId] = useState("");
  const [enterTime, setEnterTime] = useState(dayjs(today));
  const [enterDate, setEnterDate] = useState(dayjs(today));

  const onSubmit = async (event) => {
    event.preventDefault();
    const saveData = {
      interviewTime: dayjs(enterTime).format("HH:mm"),
      interviewDate: dayjs(enterDate).format("YYYY/MM/DD"),
      interviewLink: enterLink,
      interviewer: enterName,
      emailInterviewer: enterEmail,
    };
    const emailData = {
      subject: title,
      interviewer: enterName,
      emailInterviewer: enterEmail,
      interviewTime: dayjs(enterTime).format("HH:mm"),
      interviewDate: dayjs(enterDate).format("YYYY/MM/DD"),
      interviewLink: enterLink,
      listCandidates: [
        {
          emailCandidate: enterInternEmail,
          fullName: enterInternName,
        },
      ],
    };
    try {
      const result = await saveDataInterview(id, saveData);
      const emailResult = await sendEmail(emailData);

      if (result.data) {
        Swal.fire({
          icon: "success",
          title: "T???o l???ch ph???ng v???n th??nh c??ng",
          showConfirmButton: false,
          timer: 1500,
        });
        dispatch(popUpActions.hide());
        setEnterEmail("");
        setEnterName("");
        setEnterLink("");
        setEnterTime("");
        setEnterDate("");
        setTitle("");
      }
    } catch (error) {
      if (error.response) {
        Swal.fire({
          icon: "error",
          text: error.response.data.error,
          confirmButtonText: "X??c nh???n",
        }).then(function(isConfirm) {
          if (isConfirm) {
            dispatch(popUpActions.show());
          }
        });
        dispatch(popUpActions.hide());
      } else if (error.request) {
        Swal.fire({
          icon: "error",
          text: error.request,
          confirmButtonText: "X??c nh???n",
        });
      } else {
        console.log("Error", error.message);
        Swal.fire({
          icon: "error",
          text: error.message,
          confirmButtonText: "X??c nh???n",
        });
      }
    }
   };
  const enterEmailChangeHandler = (event) => {
    setEnterEmail(event.target.value);
  };
  const enterNameChangeHandler = (event) => {
    setEnterName(event.target.value);
  };
  const enterLinkChangHanler = (event) => {
    setEnterLink(event.target.value);
  };
  const enterTimeHandler = (value) => {
    setEnterTime(value);
  };
  const enterDateHandler = (value) => {
    setEnterDate(value);
  };
  const enterTitleHandler = (event) => {
    setTitle(event.target.value);
  };

  return (
    <Dialog
      open={showPopUp}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="lg"
    >
      <DialogTitle id="alert-dialog-title" align="center">
        {"T???o l???ch ph???ng v???n"}
      </DialogTitle>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
        onSubmit={onSubmit}
      >
        <DialogContent>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div>
              <TextField
                disabled
                label="H??? t??n"
                size="small"
                defaultValue={enterInternName}
              />
              <TextField
                disabled
                label="Email ???ng vi??n"
                size="small"
                defaultValue={enterInternEmail}
              />
            </div>

            <div>
              <DesktopDatePicker
                minDate={today}
                label="Ng??y ph???ng v???n"
                inputFormat="DD/MM/YYYY"
                value={enterDate}
                onChange={enterDateHandler}
                renderInput={(params) => <TextField size="small" {...params} />}
              />
              <TimePicker
                label="Time"
                value={enterTime}
                onChange={enterTimeHandler}
                renderInput={(params) => <TextField size="small" {...params} />}
              />
            </div>
            <div>
              <TextField
                required
                type="mail"
                id="outlined-required"
                size="small"
                label="Ng?????i ph???ng v???n"
                onChange={enterNameChangeHandler}
                defaultValue={enterName}
              />

              <TextField
                required
                id="outlined-required"
                size="small"
                label="Email ng?????i PV"
                onChange={enterEmailChangeHandler}
                defaultValue={enterEmail}
              />
            </div>

            <div>
              <TextField
                required
                id="outlined-required"
                size="small"
                label="Link ph???ng v???n"
                onChange={enterLinkChangHanler}
                defaultValue={enterLink}
              />
              <TextField
                required
                id="outlined-required"
                size="small"
                label="Ti??u ?????"
                onChange={enterTitleHandler}
                defaultValue={title}
              />
            </div>
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={showPreview}>
            Xem tr?????c
          </Button>
          <Button variant="outlined" onClick={handleClose}>
            H???y
          </Button>
          <Button variant="contained" type="submit">
            Th??m
          </Button>
        </DialogActions>
      </Box>
    </Dialog>

  );
};
export default CalendarInterview;
