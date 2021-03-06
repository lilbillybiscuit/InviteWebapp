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
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddTokenMenu from "../components/AddTokenMenu";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
//Icons
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CloseIcon from "@mui/icons-material/Close";
import RemoveIcon from "@mui/icons-material/Remove";
import CheckIcon from "@mui/icons-material/Check";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import CircularProgress from "@mui/material/CircularProgress";
import AddIcon from "@mui/icons-material/Add";
import globals from "../globals";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
// import LoadingButton from "@mui/lab/LoadingButton";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const getBackgroundColor = (color, mode) =>
  mode === "dark" ? darken(color, 0.6) : lighten(color, 0.8);

const getHoverBackgroundColor = (color, mode) =>
  mode === "dark" ? darken(color, 0.5) : lighten(color, 0.4);

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
  const [rows, setRows] = React.useState([]);
  const [copySnackbarOpen, setCopySnackbarOpen] = React.useState(false);
  const [deleteSnackbarOpen, setDeleteSnackbarOpen] = React.useState(false);
  const [deleteSuccessSnackbarOpen, setDeleteSuccessSnackbarOpen] =
    React.useState(false);
  const [loadFailureSnackbarOpen, setLoadFailureSnackbarOpen] =
    React.useState(false);
  const AddTokenRef = React.useRef(null);
  const handleCopySnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setCopySnackbarOpen(false);
  };

  const getRowsApi = () => {
    fetch(`${globals.api_domain}/api/guests/get/pending`, {
      method: "GET",
      credentials: "include",
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          var hi = data.guests.map((guest) => {
            return {
              ...guest,
              created: new Date(guest.created),
            };
          });

          setRows(hi);
        });
      } else {
        setLoadFailureSnackbarOpen(true);
      }
    });
  };

  React.useEffect(() => {
    getRowsApi();
  }, []);
  const handleDeleteSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setDeleteSnackbarOpen(false);
  };

  const handleDeleteSuccessSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setDeleteSuccessSnackbarOpen(false);
  };

  const deleteUser = React.useCallback(
    (id) => () => {
      setRows((prevRows) =>
        prevRows.map((row) => (row.id === id ? { ...row, loading: true } : row))
      );
      const thisRow = rows.find((row) => row.id === id);
      console.log(rows, id);
      fetch(`${globals.api_domain}/api/tokens/delete`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: thisRow.id,
        }),
      }).then((res) => {
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
      });
    },
    [rows]
  );

  const copyURL = React.useCallback(
    (id) => () => {
      console.log(rows);
      const rowToCopy = rows.find((row) => row.id === id);
      navigator.clipboard.writeText(rowToCopy.shareLink);
      setCopySnackbarOpen(true);
    },
    [rows]
  );

  const columns2 = React.useMemo(
    () => [
      {
        field: "rsvp",
        headerName: "Status",
        renderCell: (params) => renderStatus(params.value),
        width: 60,
      },
      {
        field: "name",
        type: "string",
        headerName: "Name",
        renderCell: (params) => <strong>{params.value}</strong>,
        width: 100,
      },
      {
        field: "shareLink",
        type: "string",
        headerName: "Share Link",
        width: 250,
      },
      {
        field: "created",
        type: "dateTime",
        headerName: "Created",
        width: 110,
      },
      // {
      //   field: "invitedby",
      //   type: "string",
      //   headerName: "Invited By",
      //   width: 100,
      // },
      {
        field: "actions",
        type: "actions",
        headerName: "Actions",
        width: 80,
        getActions: (params) => {
          return params.row.actions
            ? []
            : [
                <GridActionsCellItem
                  disabled={params.row.actions}
                  icon={<ContentCopyIcon />}
                  label={"Copy Link"}
                  onClick={copyURL(params.id)}
                />,
                <GridActionsCellItem
                  disabled={params.row.actions}
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
              ];
        },
      },
    ],
    [deleteUser, copyURL]
  );

  return (
    <FormControl sx={{ mt: 0, width: "100%" }}>
      <Box
        sx={{
          width: "100%",
          "& .super-app-theme--noresponse": {
            bgcolor: (theme) =>
              getBackgroundColor("#FFFFFF", theme.palette.mode),
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
        <Box
          sx={{
            mt: 3,
            display: "flex",
            mb: 2,
          }}
        >
          <Typography
            variant="h5"
            sx={{
              flexGrow: 1,
            }}
          >
            <strong>Plus Ones</strong>
          </Typography>
          <Button
            sx={{
              flexGrow: 0,
            }}
            variant="contained"
            startIcon={<PersonAddIcon />}
            onClick={(event) => {
              AddTokenRef.current?.setMenuOpen(event);
            }}
          >
            Invite someone
          </Button>

          <AddTokenMenu ref={AddTokenRef} refreshList={getRowsApi} />
        </Box>
        <FormLabel>
          +1's are welcome, but please add them so I can plan accordingly.
          Thanks!
        </FormLabel>
        <Box sx={{ mt: 2, mb: -3 }}>
          <Typography variant="subtitle2">Pending Invites</Typography>
        </Box>
        <Box sx={{ height: "300px" }}>
          <DataGrid
            sx={{ mt: 3 }}
            columns={columns2}
            rows={rows}
            getRowClassName={(params) => `super-app-theme--${params.row.rsvp}`}
          />
        </Box>

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
        <Snackbar
          open={loadFailureSnackbarOpen}
          autoHideDuration={3000}
          onClose={() => setLoadFailureSnackbarOpen(false)}
        >
          <Alert
            onClose={() => setLoadFailureSnackbarOpen(false)}
            severity="error"
            sx={{ width: "100%" }}
          >
            An error occured while loading the guest list
          </Alert>
        </Snackbar>
      </Box>
    </FormControl>
  );
}
