import * as React from 'react';
import { Box, Button, IconButton, TextField, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stepper, Step, StepLabel, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Layout from '../../components/layout';

const createData = (id, salida, destino, fechaHora, puerta) => {
  return { id, salida, destino, fechaHora, puerta };
};

const Routes = () => {
  const [rows, setRows] = React.useState([]);
  const [filteredRows, setFilteredRows] = React.useState([]);
  const [openAdd, setOpenAdd] = React.useState(false);
  const [activeStep, setActiveStep] = React.useState(0);
  const [filter, setFilter] = React.useState('');
  const [searchBy, setSearchBy] = React.useState('salida');
  const [newRoute, setNewRoute] = React.useState({
    salida: '',
    llegada: '',
    fecha_hora: '',
    puerta: '',
    precio_adulto: '',
    precio_nino: '',
    precio_tercera_edad: ''
  });

  const steps = ['Detalles Generales', 'Precios'];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => {
    setOpenAdd(false);
    setActiveStep(0);
    setNewRoute({
      salida: '',
      llegada: '',
      fecha_hora: '',
      puerta: '',
      precio_adulto: '',
      precio_nino: '',
      precio_tercera_edad: ''
    });
  };

  const handleChange = (e) => {
    setNewRoute({ ...newRoute, [e.target.name]: e.target.value });
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSearchByChange = (e) => {
    setSearchBy(e.target.value);
  };

  const handleFilter = () => {
    const filtered = rows.filter(row =>
      row[searchBy].toLowerCase().includes(filter.toLowerCase())
    );
    setFilteredRows(filtered);
  };

  const handleAdd = () => {
    // Aquí puedes añadir la lógica para añadir la nueva ruta a la base de datos o estado
    const newRow = createData(rows.length + 1, newRoute.salida, newRoute.llegada, newRoute.fecha_hora, newRoute.puerta);
    setRows([...rows, newRow]);
    setFilteredRows([...rows, newRow]);
    handleCloseAdd();
  };

  return (
    <Layout>
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '95vh', width: '100%' }}>
        <Typography variant="h4" gutterBottom>
          Rutas
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TextField
              size="small"
              variant="outlined"
              placeholder="Buscar..."
              InputProps={{
                endAdornment: (
                  <IconButton onClick={handleFilter}>
                    <SearchIcon />
                  </IconButton>
                ),
                style: {
                  borderRadius: '8px',
                },
              }}
              value={filter}
              onChange={handleFilterChange}
            />
            <FormControl variant="outlined" sx={{ ml: 2, minWidth: 120 }}>
              <InputLabel>Buscar por</InputLabel>
              <Select
                value={searchBy}
                onChange={handleSearchByChange}
                label="Buscar por"
              >
                <MenuItem value="salida">Salida</MenuItem>
                <MenuItem value="destino">Destino</MenuItem>
                <MenuItem value="puerta">Puerta</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            color="primary"
            sx={{ borderRadius: '8px', height: '40px' }}
            onClick={handleOpenAdd}
          >
            Añadir
          </Button>
        </Box>
        <TableContainer component={Paper} sx={{ flexGrow: 1, overflow: 'auto', width: '100%' }}>
          <Table stickyHeader sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell align="center">ID</TableCell>
                <TableCell align="center">Salida</TableCell>
                <TableCell align="center">Destino</TableCell>
                <TableCell align="center">Fecha y Hora</TableCell>
                <TableCell align="center">Puerta</TableCell>
                <TableCell align="center">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell align="center">{row.id}</TableCell>
                  <TableCell align="center">{row.salida}</TableCell>
                  <TableCell align="center">{row.destino}</TableCell>
                  <TableCell align="center">{row.fechaHora}</TableCell>
                  <TableCell align="center">{row.puerta}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      color="warning"
                      startIcon={<EditIcon />}
                      sx={{ mr: 1, borderRadius: '8px' }}
                      onClick={() => handleOpenEdit(row)}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      startIcon={<DeleteIcon />}
                      sx={{ borderRadius: '8px' }}
                      onClick={() => handleOpenDelete(row)}
                    >
                      Eliminar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Modal Añadir */}
        <Dialog open={openAdd} onClose={handleCloseAdd} maxWidth="md">
          <DialogTitle>Añadir Ruta</DialogTitle>
          <DialogContent>
            <Stepper activeStep={activeStep} sx={{ mb: 3 }}>
              {steps.map((label, index) => (
                <Step key={index}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {activeStep === 0 && (
              <>
                <TextField
                  autoFocus
                  margin="dense"
                  label="Salida"
                  type="text"
                  fullWidth
                  variant="outlined"
                  name="salida"
                  value={newRoute.salida}
                  onChange={handleChange}
                  sx={{ marginBottom: 2 }}
                />
                <TextField
                  margin="dense"
                  label="Llegada"
                  type="text"
                  fullWidth
                  variant="outlined"
                  name="llegada"
                  value={newRoute.llegada}
                  onChange={handleChange}
                  sx={{ marginBottom: 2 }}
                />
                <TextField
                  margin="dense"
                  label="Fecha y Hora"
                  type="datetime-local"
                  fullWidth
                  variant="outlined"
                  name="fecha_hora"
                  value={newRoute.fecha_hora}
                  onChange={handleChange}
                  sx={{ marginBottom: 2 }}
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  margin="dense"
                  label="Puerta"
                  type="text"
                  fullWidth
                  variant="outlined"
                  name="puerta"
                  value={newRoute.puerta}
                  onChange={handleChange}
                  sx={{ marginBottom: 2 }}
                />
              </>
            )}
            {activeStep === 1 && (
              <>
                <TextField
                  margin="dense"
                  label="Precio Adulto"
                  type="number"
                  fullWidth
                  variant="outlined"
                  name="precio_adulto"
                  value={newRoute.precio_adulto}
                  onChange={handleChange}
                  sx={{ marginBottom: 2 }}
                  InputProps={{ inputProps: { step: "0.01" } }}
                />
                <TextField
                  margin="dense"
                  label="Precio Niño"
                  type="number"
                  fullWidth
                  variant="outlined"
                  name="precio_nino"
                  value={newRoute.precio_nino}
                  onChange={handleChange}
                  sx={{ marginBottom: 2 }}
                  InputProps={{ inputProps: { step: "0.01" } }}
                />
                <TextField
                  margin="dense"
                  label="Precio Tercera Edad"
                  type="number"
                  fullWidth
                  variant="outlined"
                  name="precio_tercera_edad"
                  value={newRoute.precio_tercera_edad}
                  onChange={handleChange}
                  sx={{ marginBottom: 2 }}
                  InputProps={{ inputProps: { step: "0.01" } }}
                />
              </>
            )}
          </DialogContent>
          <DialogActions>
            {activeStep === 0 ? (
              <>
                <Button onClick={handleCloseAdd} color="primary">
                  Cancelar
                </Button>
                <Button onClick={handleNext} color="primary">
                  Siguiente
                </Button>
              </>
            ) : (
              <>
                <Button onClick={handleBack} color="primary">
                  Atrás
                </Button>
                <Button onClick={handleAdd} color="primary">
                  Añadir
                </Button>
              </>
            )}
          </DialogActions>
        </Dialog>
      </Box>
    </Layout>
  );
};

export default Routes;
