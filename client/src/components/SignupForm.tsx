import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { ChangeEvent, FormEvent } from 'react';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const SignupForm = ({}: { handleModalClose: () => void }) => {
  // set initial form state
  const [userFormData, setUserFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  // set state for form validation
  const [validated] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);

  const [addUser, { error }] = useMutation(ADD_USER);

  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const { data } = await addUser({
        variables: { ...userFormData },
      });

      Auth.login(data.addUser.token);

      setUserFormData({
        username: '',
        email: '',
        password: '',
      });
      
    } catch (err) {
      console.error(err);
      setShowAlert(true);

      // Set the error message based on the error type
      if (err instanceof Error && (err as any)?.graphQLErrors?.length > 0) {
        const errorMessage = (err as any).graphQLErrors[0]?.message;
  
        if (errorMessage.includes('Username already exists')) {
          setErrorMessage('This username is taken.');
        } else if (errorMessage.includes('Email already exists')) {
          setErrorMessage('This email is already in use.');
        } else if (errorMessage.includes('Invalid email format')) {
          setErrorMessage('Please enter a valid email address.');
        } else {
          setErrorMessage('Something went wrong with your signup.');
        }
      } else {
        setErrorMessage('Something went wrong with your signup.');
      }
    }
  };

  return (
    <>
      {/* This is needed for the validation functionality above */}
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        {/* show alert if server response is bad */}
        <Alert
          dismissible
          onClose={() => setShowAlert(false)}
          show={showAlert || !!error}
          variant="danger"
        >
          {errorMessage}
        </Alert>

        <Form.Group className='mb-3'>
          <Form.Label htmlFor="username">Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Your username"
            name="username"
            onChange={handleInputChange}
            value={userFormData.username}
            required
          />
          <Form.Control.Feedback type="invalid">
            Username is required!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label htmlFor="email">Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Your email address"
            name="email"
            onChange={handleInputChange}
            value={userFormData.email}
            required
          />
          <Form.Control.Feedback type="invalid">
            Email is required!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label htmlFor="password">Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Your password"
            name="password"
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
          <Form.Control.Feedback type="invalid">
            Password is required!
          </Form.Control.Feedback>
        </Form.Group>
        <Button
          disabled={
            !(
              userFormData.username &&
              userFormData.email &&
              userFormData.password
            )
          }
          type="submit"
        >
          Submit
        </Button>
      </Form>
    </>
  );
};

export default SignupForm;
