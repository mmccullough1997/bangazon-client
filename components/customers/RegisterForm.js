/* eslint-disable react/require-default-props */
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { registerUser } from '../../utils/auth'; // Update with path to registerUser
import { updateCustomer } from '../../utils/data/customerData';

const initialCustomerState = {
  firstName: '',
  lastName: '',
  bio: '',
  image: '',
};

function RegisterForm({ user, onUpdate }) {
  const [formData, setFormData] = useState(initialCustomerState);
  const router = useRouter();

  useEffect(() => {
    if (user.id) {
      setFormData(user);
    }
  }, [user, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user.id) {
      updateCustomer(formData, user.id);
      router.push('/');
    } else {
      registerUser(user, formData).then(() => onUpdate(user.uid));
    }
  };

  return (
    <>
      <h1>{user.id ? 'Edit Customer Profile' : 'Create Customer Profile'}</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">

          <Form.Control name="firstName" placeholder="Enter your first name" required value={formData.firstName} onChange={handleChange} />

          <Form.Control name="lastName" placeholder="Enter your last name" required value={formData.lastName} onChange={handleChange} />

          <Form.Control name="bio" as="textarea" placeholder="Tell us about yourself" required value={formData.bio} onChange={handleChange} />

          <Form.Control name="image" placeholder="Link to an image of yourself" required value={formData.image} onChange={handleChange} />

        </Form.Group>
        <Button variant="primary" type="submit">
          {user.id ? 'Update' : 'Submit'}
        </Button>
      </Form>
    </>
  );
}

RegisterForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
  onUpdate: PropTypes.func,
};

export default RegisterForm;
