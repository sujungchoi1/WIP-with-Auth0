import Link from 'next/link';
import { Button, Form, Loader, Select, Input, TextArea } from 'semantic-ui-react';
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react';
import { mutate } from 'swr'
import formStyles from '../styles/Form.module.css'
import { useUser } from '@auth0/nextjs-auth0';

const ProjectForm = ({ formId, projectForm, forNewProject = true }) => {
    const router = useRouter()
    const { user } = useUser()

    const [errors, setErrors] = useState({})
    const [message, setMessage] = useState('')

    const [form, setForm] = useState({
        patternName: projectForm.patternName,
        image_URL: projectForm.image_URL,
        projectCategory: projectForm.projectCategory,
        dateStarted: projectForm.dateStarted,
        estimatedEndDate: projectForm.estimatedEndDate,
        hookSize: projectForm.hookSize,
        patternLocation: projectForm.patternLocation,
        yarnBrand: projectForm.yarnBrand,
        yarnColor: projectForm.yarnColor,
        notes: projectForm.notes,
        completed: projectForm.completed,
    })

    const options = [
        { key: 'c', text: 'Crochet', value: 'crochet' },
        { key: 'k', text: 'Knit', value: 'knit' },
        { key: 'e', text: 'Embroidery', value: 'embroidery' },
        { key: 'o', text: 'Other', value: 'other' },
    ]


    // To update project
    const updateProject = async (form) => {
        const { id } = router.query

        try {
            const res = await fetch(`/api/projects/${id}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            })

            // Throw error with status code in case Fetch API req failed
            if (!res.ok) {
                throw new Error(res.status)
            }

            const { data } = await res.json()

            mutate(`/api/projects/${id}`, data, false) // Update the local data without a revalidation
            router.push('/')
        } catch (error) {
            setMessage('Failed to update project')
        }
    }


    // To create a new project
    const createProject = async (form) => {
        try {
            const res = await fetch('/api/projects', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            })

            if (!res.ok) {
                throw new Error(res.status)
            }

            router.push('/')
        } catch (error) {
            setMessage('Failed to add project')
        }
    }

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const errs = validate()
        if (Object.keys(errs).length === 0) {
            forNewProject ? createProject(form) : updateProject(form)
        } else {
            setErrors({ errs })
        }
    }

    /* Makes sure pet info is filled for pet name, owner name, species, and image url*/
    const validate = () => {
        let err = {}
        if (!form.patternName) err.patternName = 'Project name is required'
        console.log('error from validation')
        return err
    }

    return (
        <div className={formStyles.container}>
            <h1>Create a project!</h1>
            <div className={formStyles.form}>
                <Form id={formId} onSubmit={handleSubmit}>
                    <Form.Input
                        fluid
                        error={errors.title ? { content: 'Please enter a title', pointing: 'below' } : null}
                        label="Pattern Name"
                        type="text"
                        name="patterName"
                        // value={form.patterName}
                        onChange={handleChange}
                        required
                    />
                    <Form.Input
                        label="Image URL"
                        type="url"
                        name="image_URL"
                        value={form.image_URL}
                        onChange={handleChange}
                    />

                    <Form.Select
                        label="Project Category"
                        options={options}
                        // name="projectCategory"
                        // value={form.projectCategory}
                        onChange={handleChange}
                    />
                    <p>date picker here</p>

                    <Form.Input
                        label="Hook Size"
                        type="text"
                        name="hookSize"
                        value={form.hookSize}
                        onChange={handleChange}
                    />
                    <Form.Input
                        label="Pattern Location"
                        type="text"
                        name="patternLocation"
                        value={form.patternLocation}
                        onChange={handleChange}
                    />
                    <Form.Group widths='equal'>
                        <Form.Input
                            label="Yarn Brand"
                            type="text"
                            name="yarnBrand"
                            value={form.yarnBrand}
                            onChange={handleChange}
                        />
                        <Form.Input
                            label="Yarn Color"
                            type="text"
                            name="yarnColor"
                            value={form.yarnColor}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.TextArea
                        label="Notes"
                        type="text"
                        name="notes"
                        value={form.notes}
                        onChange={handleChange}
                    />

                    <Button type='submit'>Submit</Button>
                </Form>
                <p>{message}</p>
                <div>
                    {Object.keys(errors).map((err, index) => (
                        <li key={index}>{err}</li>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ProjectForm
