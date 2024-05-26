import React, { useCallback, useEffect, useState } from 'react';
import DashboardLayout from '../layouts/Dashboard';
import Box from "@mui/material/Box";
import { useParams, useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import { User } from '../types/User';
import { usersApi } from '../api/users-api';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import { Error } from '../types/Error';

const UserDetailView = (): JSX.Element => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [notification, setNotification] = useState<Error>({
    error: false,
    message: '',
  });
  const [userInfo, setUserInfo] = useState<User>({
    avatar: '',
    email: '',
    id: 0,
    name: '',
    role: ''
  });

  const toggleEditUser = async () => {
    setIsEditing(!isEditing);

    if (isEditing && userInfo.id) {
      try {
        const response = await usersApi.updateUser(userInfo.id, userInfo);

        if ('error' in response && response.error) {
          setNotification({
            error: response.error,
            message: response.message
          });
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  const handleDeleteUser = async () => {
    if (userInfo.id) {
      await usersApi.deleteUser(userInfo.id);
      navigate('/users');
    }
  };

  const fetchUser = useCallback(async () => {
    if (id) {
      const response = await usersApi.getUserById(id);
      setUserInfo(response);
    }
  }, [id]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <DashboardLayout>
      <Box
        display="flex"
        justifyContent="center"
        sx={{ backgroundColor: '#2e2e2e', minHeight: '100vh', padding: 4 }}
      >
        <Stack spacing={2}>
          {notification.error && (
            <Alert severity="error">{notification.message}</Alert>
          )}

          <Card
            variant="outlined"
            sx={{
              width: 500,
              borderColor: 'lightgray',
              textAlign: 'center',
              backgroundColor: '#f5f5f5',
              color: '#333',
            }}
          >
            <Avatar
              alt={userInfo.name}
              src={userInfo.avatar}
              sx={{
                width: 90,
                height: 90,
                display: 'flex',
                margin: 'auto',
                marginTop: 2,
              }}
            />
            <Typography variant="h6" gutterBottom>
              <strong>User ID:</strong> {userInfo.id}
            </Typography>

            <Typography variant="h6" gutterBottom>
              <strong>Username:</strong>{' '}
              {isEditing ? (
                <TextField
                  size="small"
                  variant="outlined"
                  value={userInfo.name}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setUserInfo({
                      ...userInfo,
                      name: event.target.value
                    });
                  }}
                />
              ) : (
                userInfo.name
              )}
            </Typography>
            <Typography variant="h6" gutterBottom>
              <strong>Email:</strong> {userInfo.email}
            </Typography>
            <Typography variant="h6" gutterBottom>
              <strong>Role:</strong> {userInfo.role}
            </Typography>
          </Card>
          <Stack
            direction="row"
            justifyContent="center"
            spacing={2}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={toggleEditUser}
            >
              {isEditing ? 'Save' : 'Edit'}
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleDeleteUser}
            >
              Delete
            </Button>
          </Stack>
        </Stack>
      </Box>
    </DashboardLayout>
  );
};

export default UserDetailView;
