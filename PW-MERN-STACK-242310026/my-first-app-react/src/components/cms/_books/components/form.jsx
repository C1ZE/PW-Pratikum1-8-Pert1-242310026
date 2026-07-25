"use client";

import React, { useState } from 'react'
import { TextAreaInput, TextInput, InputImage, InputCheckbox } from '@/components/ui/forms'
import { Button } from "@/components/ui/button";
import { Alert } from '@/components/ui/alert';

export default function Form({ book_id, ReloadBook }) {
  const obj_book = {
    title: '',
    author: '',
    sinopsis: '',
    story: '',
    is_free: false,
    image: null
  }
  const [formData, setFormData] = useState(obj_book)
  const [imagePreview, setImagePreview] = useState(null)
  const [error, setError] = useState("Demo form only - not connected to API");

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png']
      if (!validTypes.includes(file.type)) {
        setError('Please select a valid image file (JPEG, or PNG)')
        return
      }

      if (file.size > 5 * 1024 * 1024) {
        setError('Image size must be less than 5MB')
        return
      }

      setFormData(prev => ({ ...prev, image: file }))
      setError("")

      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("Demo form only - no save action is connected")
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3 className='d-flex align-items-start flex-column'>
        <span className="">{book_id ? "Edit Book" : "Add New Book"}</span>
        <span className="text-secondary fs-6">Fill in the details for the book.</span>
      </h3>

      {error && <Alert message={error} variant="info" />}

      <div className="row">
        <div className="col-lg-6">
          <TextInput
            title="Book Title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />

          <TextAreaInput
            title="Sinopsis"
            name="sinopsis"
            value={formData.sinopsis}
            onChange={handleInputChange}
            rows={2}
            required
          />

          <TextAreaInput
            title="Story"
            name="story"
            value={formData.story}
            onChange={handleInputChange}
            rows={3}
            required
          />
        </div>
        <div className="col-lg-6">
          <div className="row">
            <div className="col-8">
              <TextInput
                title="Author Name"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="col-4">
              <InputCheckbox
                title="Type Book"
                value="Is Free"
                name="is_free"
                is_switch={true}
                required={true}
                checked={formData.is_free}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <InputImage
            title="Cover Image"
            onChange={handleImageChange}
            required
            imagePreview={imagePreview}
          />
        </div>
      </div>

      <div className="mt-4 text-center">
        <Button type="button" variant="light" className="me-2 btn-lg" onClick={() => {
          setFormData(obj_book)
          setImagePreview(null)
          setError("Demo form only - not connected to API")
          if (ReloadBook) ReloadBook()
        }}>
          Cancel
        </Button>
        <Button type="button" variant="primary" className="btn-lg" onClick={handleSubmit}>
          Submit Book
        </Button>
      </div>
    </form>
  )
}