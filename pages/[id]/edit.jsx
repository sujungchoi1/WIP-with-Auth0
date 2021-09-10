import { useState, useEffect } from 'react';
import { Button, Form, Option } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import formStyles from '../../styles/Form.module.css'
import Project from '../../models/Project';
import dbConnect from '../../lib/dbConnect';

const EditProject = ({ project }) => {
    const router = useRouter();
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [form, setForm] = useState({
        patternName: project.patternName,
        image_URL: project.image_URL,
        projectCategory: project.projectCategory,
        dateStarted: project.dateStarted,
        estimatedEndDate: project.estimatedEndDate,
        hookSize: project.hookSize,
        patternLocation: project.patternLocation,
        yarnBrand: project.yarnBrand,
        yarnColor: project.yarnColor,
        notes: project.notes,
        completed: project.completed,
    });

    // const options = [
    //     { text: 'Crochet', value: 'crochet' },
    //     { text: 'Knit', value: 'knit' },
    //     { text: 'Embroidery', value: 'embroidery' },
    //     { text: 'Other', value: 'other' },
    // ]

    useEffect(() => {
        if (isSubmitting) {
            if (Object.keys(errors).length === 0) {
                updateProject();
            }
            else {
                setIsSubmitting(false);
            }
        }
    }, [errors])

    const updateProject = async () => {
        try {
            const res = await fetch(`/api/projects/${router.query.id}`, {
                method: 'PUT',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form),
            })
            router.push("/");
        } catch (error) {
            console.log(error);
        }
    }

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let errs = validate()
        setErrors(errs);
        setIsSubmitting(true);
    }

    const validate = () => {
        let err = {};
        if (!form.patternName) {
            err.patternName = 'Pattern name is required';
        }
        return err;
    }

    return (
        <div className={formStyles.container}>
            {/* {user && <h2>hi {user.name}</h2>} */}
            <h1>Update Note</h1>
            <div className={formStyles.form}>
                {
                        <Form onSubmit={handleSubmit}>
                            <Form.Input
                                fluid
                                label="Pattern Name"
                                type="text"
                                name="patternName"
                                onChange={handleChange}
                                value={form.patternName}
                                required
                            />
                            <Form.Input
                                label="Image URL"
                                type="url"
                                name="image_URL"
                                onChange={handleChange}
                                value={form.image_URL}
                            />

                            {/* <Form.Select
                                label="Project Category"
                                // options={options}
                                name="projectCategory"
                                onChange={handleChange}
                                value={form.projectCategory}
                            >
                                <Option value="default" >Please select</Option>
                                <Option value="Crochet" >Crochet</Option>
                                <Option value="Knit" >Knit</Option>
                                <Option value="Embroidery">Embroidery</Option>
                                <Option value="Other">Other</Option>
                            </Form.Select> */}
                            <Form.Input
                                label="Project Category"
                                type="text"
                                name="projectCategory"
                                onChange={handleChange}
                                value={form.projectCategory}
                            />
                            <p>date picker here</p>

                            <Form.Input
                                label="Hook Size"
                                type="text"
                                name="hookSize"
                                onChange={handleChange}
                            />
                            <Form.Input
                                label="Pattern Location"
                                type="text"
                                name="patternLocation"
                                onChange={handleChange}
                            />
                            <Form.Group widths='equal'>
                                <Form.Input
                                    label="Yarn Brand"
                                    type="text"
                                    name="yarnBrand"
                                    onChange={handleChange}
                                />
                                <Form.Input
                                    label="Yarn Color"
                                    type="text"
                                    name="yarnColor"
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.TextArea
                                label="Notes"
                                type="text"
                                name="notes"
                                onChange={handleChange}
                            />
                            {/* <input type="hidden" name="user">{user.email}</input> */}

                            <Button type='submit'>Submit</Button>
                        </Form>
                }
            </div>
        </div>
    )
}

export async function getServerSideProps({ params }) {
    await dbConnect();

    const project = await Project.findById(params.id).lean()
    project._id = project._id.toString()
  
    return { props: { project }}
}

export default EditProject;
