'use client'
import { SessionInterface } from '@/common.types'
import React, { useState } from 'react'
import Image from 'next/image'
import FormField from './FormField'
import { categoryFilters } from '@/constant'
import CustomMenu from './CustomMenu'
import Button from './Button'

type Props = {
	type: string,
	session: SessionInterface
}

const ProjectForm = ({type, session}: Props) => {
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		setIsSubmitting(true);
		try {
			if(type === 'create') {
				//create project
			}
		} catch {

		}
	}

	const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();

		const file = e.target.files?.[0]

		if(!file) return;
		if (!file.type.includes('image')) {
			return alert('File Type Error: please upload an image file')
		}
		const reader = new FileReader();
		reader.readAsDataURL(file);

		reader.onload = () => {
			const result = reader.result as string;

			handleStateChange('image', result);
		}
	}

	const handleStateChange = (fieldName: string, value: string) => {
		setForm((prevState) => 
		({...prevState, [fieldName]: value}))
	}

	const [isSubmitting, setIsSubmitting] = useState(false);

	const [form, setForm] = useState({
		title: '',
		description: '',
		image: '',
		liveSiteUrl:'',
		githubUrl:'',
		category:'',
	});

  return (
	<form onSubmit={handleSubmit} className='flexStart form'>
		<div className="flexStart form_image-container">
			<label htmlFor="poster" className='flexCenter form_image-label' >
				{!form.image && 'Choose a poster for your project'}
				<input type="file" id="image" accept='image/*' required={type === 'create' ? true : false} className='form_image-input' onChange={(e)=>handleChangeImage(e)} />
				{form.image && (
					<Image src={form.image} className="sm:p-10 object-contain z-20" alt="Project Poster" fill />
				)}
			</label>
		</div> 
		<FormField title='title' state={form.title} placeholder="Flexibble" setState={(value) => handleStateChange('title', value)} />
		<FormField title='description' state={form.description} placeholder="Showcase and discover remakable developer projects" setState={(value) => handleStateChange('description', value)} />
		<FormField type="url" title='Website Url' state={form.liveSiteUrl} placeholder="https://github.com/aladinugurr" setState={(value) => handleStateChange('liveSiteUrl', value)} />
		<FormField type="url" title='Github Url' state={form.githubUrl} placeholder="https://github.com/aladinugurr" setState={(value) => handleStateChange('githubUrl', value)} />
		
			<CustomMenu 
			title="Category"
			state={form.category}
			filters={categoryFilters}
			setState={(value)=>handleStateChange('category', value)}
			/>

		<div className="flexStart w-full">
			<Button 
			title={isSubmitting ? `${type === 'create' ? "creating" : "editing"}` : `${type === 'create' ? "create" : "edit"}`}
			type="submit"
			leftIcon={isSubmitting ? "" : "/plus.svg"} 
			isSubmitting={isSubmitting} />
		</div>
	</form>
  )
}

export default ProjectForm