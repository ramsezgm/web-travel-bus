import * as React from 'react';
import { Box, Button, IconButton, TextField, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Layout from '../../components/layout';
import { getUsers } from '../../services/userService';

const Users = () => {
  const [rows, setRows] = React.useState([]);
  const [filteredRows, setFilteredRows] = React.useState([]);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [searchBy, setSearchBy] = React.useState('nombre'); // Default search by 'nombre'
  const [openAdd, setOpenAdd] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [currentRow, setCurrentRow] = React.useState(null);

  const [newUser, setNewUser] = React.useState({
    nombre: '',
    apellido: '',
    email: '',
    rol: '',
    password: '',
    confirmPassword: ''
  });

  React.useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await getUsers();
        const formattedUsers = users.map(user => ({
          id: user.usuarioId,
          nombre: `${user.nombre} ${user.apellido}`,
          email: user.email,
          rol: user.roles ? user.roles[0].rol.name : 'Usuario'
        }));
        setRows(formattedUsers);
        setFilteredRows(formattedUsers);
      } catch (error) {
        console.error('Failed to fetch users', error);
      }
    };

    fetchUsers();
  }, []);

  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);

  const handleOpenEdit = (row) => {
    setCurrentRow(row);
    setNewUser({
      nombre: row.nombre.split(' ')[0],
      apellido: row.nombre.split(' ')[1],
      email: row.email,
      rol: row.rol,
      password: '',
      confirmPassword: ''
    });
    setOpenEdit(true);
  };
  const handleCloseEdit = () => setOpenEdit(false);

  const handleOpenDelete = (row) => {
    setCurrentRow(row);
    setOpenDelete(true);
  };
  const handleCloseDelete = () => setOpenDelete(false);

  const handleAdd = async () => {
    if (newUser.password !== newUser.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    try {
      const addedUser = await addUser(newUser);
      const newRow = {
        id: addedUser.usuarioId,
        nombre: `${addedUser.nombre} ${addedUser.apellido}`,
        email: addedUser.email,
        rol: addedUser.roles ? addedUser.roles[0].rol.name : 'Usuario'
      };
      setRows([...rows, newRow]);
      setFilteredRows([...filteredRows, newRow]);
      handleCloseAdd();
    } catch (error) {
      console.error('Failed to add user', error);
    }
  };

  const handleEdit = async () => {
    try {
      await editUser(currentRow.id, newUser);
      const updatedRow = {
        id: currentRow.id,
        nombre: `${newUser.nombre} ${newUser.apellido}`,
        email: newUser.email,
        rol: newUser.rol
      };
      const updatedRows = rows.map(row => row.id === currentRow.id ? updatedRow : row);
      setRows(updatedRows);
      setFilteredRows(updatedRows);
      handleCloseEdit();
    } catch (error) {
      console.error('Failed to edit user', error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteUser(currentRow.id);
      const updatedRows = rows.filter(row => row.id !== currentRow.id);
      setRows(updatedRows);
      setFilteredRows(updatedRows);
      handleCloseDelete();
    } catch (error) {
      console.error('Failed to delete user', error);
    }
  };

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    const filteredData = rows.filter(row =>
      searchBy === 'nombre'
        ? row.nombre.toLowerCase().includes(e.target.value.toLowerCase())
        : row.email.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredRows(filteredData);
  };

  const handleSearchByChange = (e) => {
    setSearchBy(e.target.value);
  };

  return (
    <Layout>
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '95vh', width: '100%' }}>
        <Typography variant="h4" gutterBottom>
          Usuarios
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <TextField
              size="small"
              variant="outlined"
              placeholder="Buscar..."
              value={searchQuery}
              onChange={handleSearchChange}
              InputProps={{
                endAdornment: (
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                ),
                style: {
                  borderRadius: '8px',
                },
              }}
            />
            <FormControl variant="outlined" sx={{ ml: 2, minWidth: 120 }}>
              <InputLabel>Buscar por</InputLabel>
              <Select
                value={searchBy}
                onChange={handleSearchByChange}
                label="Buscar por"
              >
                <MenuItem value="nombre">Nombre</MenuItem>
                <MenuItem value="email">Correo</MenuItem>
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
                <TableCell align="center">Nombre y Apellido</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell align="center">{row.id}</TableCell>
                  <TableCell align="center">{row.nombre}</TableCell>
                  <TableCell align="center">{row.email}</TableCell>
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
        <Dialog open={openAdd} onClose={handleCloseAdd}>
          <DialogTitle>Añadir Usuario</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Por favor, complete la información para añadir un nuevo usuario.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              label="Nombre"
              type="text"
              fullWidth
              variant="outlined"
              name="nombre"
              value={newUser.nombre}
              onChange={handleChange}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              margin="dense"
              label="Apellido"
              type="text"
              fullWidth
              variant="outlined"
              name="apellido"
              value={newUser.apellido}
              onChange={handleChange}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              margin="dense"
              label="Email"
              type="email"
              fullWidth
              variant="outlined"
              name="email"
              value={newUser.email}
              onChange={handleChange}
              sx={{ marginBottom: 2 }}
            />
            <FormControl fullWidth variant="outlined" sx={{ marginBottom: 2 }}>
              <InputLabel>Rol</InputLabel>
              <Select
                name="rol"
                value={newUser.rol}
                onChange={handleChange}
                label="Rol"
              >
                <MenuItem value="ADMINISTRADOR">Administrador</MenuItem>
                <MenuItem value="CONDUCTOR">Conductor</MenuItem>
                <MenuItem value="USUARIO">Usuario</MenuItem>
              </Select>
            </FormControl>
            <TextField
              margin="dense"
              label="Contraseña"
              type="password"
              fullWidth
              variant="outlined"
              name="password"
              value={newUser.password}
              onChange={handleChange}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              margin="dense"
              label="Confirmar Contraseña"
              type="password"
              fullWidth
              variant="outlined"
              name="confirmPassword"
              value={newUser.confirmPassword}
              onChange={handleChange}
              sx={{ marginBottom: 2 }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAdd} color="primary">
              Cancelar
            </Button>
            <Button onClick={handleAdd} color="primary">
              Añadir
            </Button>
          </DialogActions>
        </Dialog>

        {/* Modal Editar */}
        <Dialog open={openEdit} onClose={handleCloseEdit}>
          <DialogTitle>Editar Usuario</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Por favor, actualice la información del usuario.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              label="Nombre"
              type="text"
              fullWidth
              variant="outlined"
              name="nombre"
              value={newUser.nombre}
              onChange={handleChange}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              margin="dense"
              label="Apellido"
              type="text"
              fullWidth
              variant="outlined"
              name="apellido"
              value={newUser.apellido}
              onChange={handleChange}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              margin="dense"
              label="Email"
              type="email"
              fullWidth
              variant="outlined"
              name="email"
              value={newUser.email}
              onChange={handleChange}
              sx={{ marginBottom: 2 }}
            />
            <FormControl fullWidth variant="outlined" sx={{ marginBottom: 2 }}>
              <InputLabel>Rol</InputLabel>
              <Select
                name="rol"
                value={newUser.rol}
                onChange={handleChange}
                label="Rol"
              >
                <MenuItem value="ADMINISTRADOR">Administrador</MenuItem>
                <MenuItem value="CONDUCTOR">Conductor</MenuItem>
                <MenuItem value="USUARIO">Usuario</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseEdit} color="primary">
              Cancelar
            </Button>
            <Button onClick={handleEdit} color="primary">
              Guardar
            </Button>
          </DialogActions>
        </Dialog>

        {/* Modal Eliminar */}
        <Dialog open={openDelete} onClose={handleCloseDelete}>
          <DialogTitle>Eliminar Usuario</DialogTitle>
          <DialogContent>
            <DialogContentText>
              ¿Está seguro de que desea eliminar el usuario {currentRow ? currentRow.id : ''}?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDelete} color="primary">
              Cancelar
            </Button>
            <Button onClick={handleDelete} color="error">
              Eliminar
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Layout>
  );
};

export default Users;
