import * as React from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import SecurityIcon from "@mui/icons-material/Security";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import {
  randomCreatedDate,
  randomUpdatedDate,
} from "@mui/x-data-grid-generator";
import Container from "@mui/material/Container";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Color from "../components/Color";
import { darken, lighten } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
//Icons
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

import CloseIcon from "@mui/icons-material/Close";
import RemoveIcon from "@mui/icons-material/Remove";
import CheckIcon from "@mui/icons-material/Check";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import CircularProgress from "@mui/material/CircularProgress";
// import LoadingButton from "@mui/lab/LoadingButton";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const getBackgroundColor = (color, mode) =>
  mode === "dark" ? darken(color, 0.6) : lighten(color, 0.8);

const getHoverBackgroundColor = (color, mode) =>
  mode === "dark" ? darken(color, 0.5) : lighten(color, 0.4);

const initialRows = [
  {
    id: 1,
    name: "Damien",
    age: 25,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
    isAdmin: true,
    country: "Spain",
    discount: "",
  },
  {
    id: 2,
    name: "Nicolas",
    age: 36,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
    isAdmin: false,
    country: "France",
    discount: "",
  },
  {
    id: 3,
    name: "Kate",
    age: 19,
    dateCreated: randomCreatedDate(),
    lastLogin: randomUpdatedDate(),
    isAdmin: false,
    country: "Brazil",
    discount: "junior",
  },
];
const initialRows2 = [
  {
    id: 32539408,
    name: "Test User",
    shareLink: "https://gradparty.lilbillbiscuit.com/098a7e2bf80d",
    created: new Date(),
    invitedby: "Billy Biscuit",
    status: "noresponse",
    coming: "noresponse",
    deletable: true,
  },
  {
    id: 32539456,
    name: "Test User",
    shareLink: "https://gradparty.lilbillbiscuit.com/098a7e2bf80d",
    created: new Date(),
    invitedby: "Billy Biscuit",
    status: "yes",
    coming: "yes",
    deletable: true,
  },
  {
    id: 32539284,
    name: "Test User",
    shareLink: "https://gradparty.lilbillbiscuit.com/098a7e2bf80d",
    created: new Date(),
    invitedby: "Billy Biscuit",
    status: "maybe",
    coming: "maybe",
    deletable: true,
  },
  {
    id: 32539234,
    name: "Test User",
    shareLink: "https://gradparty.lilbillbiscuit.com/098a7e2bf80d",
    created: new Date(),
    invitedby: "Billy Biscuit",
    status: "no",
    coming: "no",
    deletable: true,
  },
];

const renderStatus = (props) => {
  if (props === "yes") {
    return <CheckIcon />;
  } else if (props === "maybe") {
    return <RemoveIcon />;
  } else if (props === "no") {
    return <CloseIcon />;
  } else return <QuestionMarkIcon />;
};
export default function ColumnTypesGrid() {
  const [rows, setRows] = React.useState(initialRows2);
  const [copySnackbarOpen, setCopySnackbarOpen] = React.useState(false);
  const [deleteSnackbarOpen, setDeleteSnackbarOpen] = React.useState(false);
  const [deleteSuccessSnackbarOpen, setDeleteSuccessSnackbarOpen] = React.useState(false);
  const handleCopySnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setCopySnackbarOpen(false);
  };

  const handleDeleteSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setDeleteSnackbarOpen(false);
  }

  const handleDeleteSuccessSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setDeleteSuccessSnackbarOpen(false);
  }

  const isLoading = (id) => {
    const row1 = rows.find((row) => row.id === id);
    if (!row1.loading) {
      return false;
    }
    return row1.loading;
  };

  const deleteUser = React.useCallback(
    (id) => () => {
      setRows((prevRows) =>
        prevRows.map((row) => (row.id === id ? { ...row, loading: true } : row))
      );

      fetch("http://localhost:8000/api/error")
        .then((res) => {
          if (res.status === 200) {
            setRows((prevRows) => prevRows.filter((row) => row.id !== id));
            setDeleteSuccessSnackbarOpen(true);
          } else {
            setRows((prevRows) =>
              prevRows.map((row) =>
                row.id === id ? { ...row, loading: false } : row
              )
            );
            setDeleteSnackbarOpen(true);
          }
        })
    },
    []
  );

  const toggleAdmin = React.useCallback(
    (id) => () => {
      setRows((prevRows) =>
        prevRows.map((row) =>
          row.id === id ? { ...row, isAdmin: !row.isAdmin } : row
        )
      );
    },
    []
  );

  const duplicateUser = React.useCallback(
    (id) => () => {
      setRows((prevRows) => {
        const rowToDuplicate = prevRows.find((row) => row.id === id);
        return [...prevRows, { ...rowToDuplicate, id: Date.now() }];
      });
    },
    []
  ); 

  const copyURL = React.useCallback(
    (id) => () => {
      const rowToCopy = rows.find((row) => row.id === id);
      navigator.clipboard.writeText(rowToCopy.shareLink);
      setCopySnackbarOpen(true);
    },
    []
  );

  const columns2 = React.useMemo(
    () => [
      {
        field: "coming",
        headerName: "",
        renderCell: (params) => renderStatus(params.value),
        width: 30,
      },
      {
        field: "name",
        type: "string",
        headerName: "Name",
        width: 100,
      },
      {
        field: "shareLink",
        type: "string",
        headerName: "Share Link",
        width: 300,
      },
      { field: "created", type: "date", headerName: "Created", width: 100 },
      {
        field: "invitedby",
        type: "string",
        headerName: "Invited By",
        width: 100,
      },
      {
        field: "actions",
        type: "actions",
        headerName: "Actions",
        width: 80,
        getActions: (params) => [
          <GridActionsCellItem
            icon={<ContentCopyIcon />}
            label={"Copy Link"}
            onClick={copyURL(params.id)}
          />,
          <GridActionsCellItem
            icon={
              params.row.loading ? (
                <CircularProgress size={20} />
              ) : (
                <DeleteIcon />
              )
            }
            label={"Delete"}
            onClick={deleteUser(params.id)}
          />,
        ],
      },
    ],
    [deleteUser, copyURL]
  );

  return (
    <Container
    disableGutters
      sx={{
        height: 400,
        width: "100%",

        "& .super-app-theme--noresponse": {
          bgcolor: (theme) => getBackgroundColor("#FFFFFF", theme.palette.mode),
          transition: (theme) =>
            theme.transitions.create("all", {
              duration: theme.transitions.duration.shortest,
            }),
          "&:hover": {
            bgcolor: (theme) =>
              getHoverBackgroundColor("#FFFFFF", theme.palette.mode),
          },
        },
        "& .super-app-theme--yes": {
          bgcolor: (theme) =>
            getBackgroundColor(Color.yesColor, theme.palette.mode),
          transition: (theme) =>
            theme.transitions.create("all", {
              duration: theme.transitions.duration.shortest,
            }),
          "&:hover": {
            bgcolor: (theme) =>
              getHoverBackgroundColor(Color.yesColor, theme.palette.mode),
          },
        },
        "& .super-app-theme--maybe": {
          bgcolor: (theme) =>
            getBackgroundColor(Color.maybeColor, theme.palette.mode),
          transition: (theme) =>
            theme.transitions.create("all", {
              duration: theme.transitions.duration.shortest,
            }),
          "&:hover": {
            bgcolor: (theme) =>
              getHoverBackgroundColor(Color.maybeColor, theme.palette.mode),
          },
        },
        "& .super-app-theme--no": {
          bgcolor: (theme) =>
            getBackgroundColor(Color.noColor, theme.palette.mode),
          transition: (theme) =>
            theme.transitions.create("all", {
              duration: theme.transitions.duration.shortest,
            }),
          "&:hover": {
            bgcolor: (theme) =>
              getHoverBackgroundColor(Color.noColor, theme.palette.mode),
          },
        },
      }}
    >
      <DataGrid
        columns={columns2}
        rows={rows}
        getRowClassName={(params) => `super-app-theme--${params.row.status}`}
      />
      <Snackbar
        open={copySnackbarOpen}
        autoHideDuration={3000}
        onClose={handleCopySnackbarClose}
      >
        <Alert
          onClose={handleCopySnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          Successfully copied!
        </Alert>
      </Snackbar>
      <Snackbar
        open={deleteSnackbarOpen}
        autoHideDuration={3000}
        onClose={handleDeleteSnackbarClose}
      >
        <Alert
          onClose={handleDeleteSnackbarClose}
          severity="error"
          sx={{ width: "100%" }}
        >
          An error occured while deleting the invite
        </Alert>
      </Snackbar>
      <Snackbar
        open={deleteSuccessSnackbarOpen}
        autoHideDuration={3000}
        onClose={handleDeleteSuccessSnackbarClose}
      >
        <Alert
          onClose={handleDeleteSuccessSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          Successfully deleted the invite
        </Alert>
      </Snackbar>
    </Container>
  );
}
