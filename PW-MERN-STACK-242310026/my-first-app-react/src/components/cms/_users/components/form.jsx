"use client";

import React, { useEffect, useState } from 'react'
import { TextInput, TextInputPassword, InputCheckbox } from '@/components/ui/forms'
import { Button } from "@/components/ui/button";
import { openModal, ModalResponse } from '@/components/ui/modals';
import { GET_USER_BY_ID, CREATE_USER, UPDATE_USER } from '@/components/apis/UserServices';
import { Alert } from '@/components/ui/alert';

export default function Form({ user_id, ReloadUser }) {
  const obj_user = {
    email: '',
    username: '',
    password: '',
    is_active: true,
  }
  const [formData, setFormData] = useState(obj_user)
  const [error, setError] = useState("");

  const ReloadUserByID = async () => {
    const result = await GET_USER_BY_ID(user_id);
    if (result.data && Object.values(result.data).length > 0) {
      setFormData({ ...result.data, password: '' });
    } else {
      openModal({ message: <ModalResponse message={result.message} title="No record found" /> })
      setFormData(obj_user)
    }
  }

  useEffect(() => {
    if (user_id) {
      ReloadUserByID();
    }
  }, [user_id])

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const payload = {
        email: formData.email,
        username: formData.username,
        is_active: formData.is_active,
      }
      if (formData.password) {
        payload.password = formData.password
      }

      if (user_id) {
        const result = await UPDATE_USER(user_id, payload)
        if (result.success) {
          openModal({ message: <ModalResponse message="User has been successfully updated!" title="Success" /> })
          ReloadUser();
          setFormData(obj_user)
        } else {
          setError(result.message || 'Failed to update user')
        }
      } else {
        if (!formData.password) {
          setError('Password is required for new user')
          return
        }
        const result = await CREATE_USER(payload)
        if (result.success) {
          openModal({ message: <ModalResponse message="User has been successfully created!" title="Success" /> })
          ReloadUser();
          setFormData(obj_user)
        } else {
          setError(result.message || 'Failed to create user')
        }
      }
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3 className='d-flex align-items-start flex-column'>
        <span>{user_id ? "Edit User" : "Add New User"}</span>
        <span className="text-secondary fs-6">Fill in the account details.</span>
      </h3>

      {error && <Alert message={error} variant="info" />}

      <div className="row">
        <div className="col-lg-6">
          <TextInput
            title="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <TextInput
            title="Username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="col-lg-6">
          <TextInputPassword
            title={user_id ? "New Password (kosongkan jika tidak diubah)" : "Password"}
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required={!user_id}
          />
          <InputCheckbox
            title="Status"
            value="Active"
            name="is_active"
            is_switch={true}
            checked={formData.is_active}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="mt-4 text-center">
        <Button type="button" variant="light" className="me-2 btn-lg" onClick={() => openModal({ open: false })}>
          Cancel
        </Button>
        <Button type="submit" variant="primary" className="btn-lg">
          Submit User
        </Button>
      </div>
    </form>
  )
}
