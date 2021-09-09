import { useState, useEffect } from 'react';
import { Button, Form, Loader } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import formStyles from '../styles/Form.module.css'
import { useUser, getSession } from '@auth0/nextjs-auth0';

const NewProject = () => {
    const { user } = useUser();
    // To get user info for creating projects
    // const mongoId = user._id.substring(6)
    
    const router = useRouter();
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState('')

    const [form, setForm] = useState({
        patternName: "",
        image_URL: "",
        projectCategory: "",
        dateStarted: "",
        estimatedEndDate: "",
        hookSize: "",
        patternLocation: "",
        yarnBrand: "",
        yarnColor: "",
        notes: "",
        completed: false,
        user: user ?? null
    });

    const options = [
        { key: 'c', text: 'Crochet', value: 'crochet' },
        { key: 'k', text: 'Knit', value: 'knit' },
        { key: 'e', text: 'Embroidery', value: 'embroidery' },
        { key: 'o', text: 'Other', value: 'other' },
    ]

    const createProject = async (form) => {
        try {
            const res = await fetch('/api/projects', {
                method: 'POST',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(...form),
            })
            if (!res.ok) {
                throw new Error(res.status)
              }
        
            // console.log(user)
            router.push("/");
        } catch (error) {
            setMessage('Failed to add project')
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
        const errs = validate()
        if (Object.keys(errs).length === 0) {
          createProject(form)
        } else {
          setErrors({ errs })
        }
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
            <h1>Create Note</h1>
            <div className={formStyles.form}>
                {
                        <Form onSubmit={handleSubmit}>
                            <Form.Input
                                fluid
                                label="Pattern Name"
                                type="text"
                                name="patternName"
                                onChange={handleChange}
                                required
                            />
                            <Form.Input
                                label="Image URL"
                                type="url"
                                name="image_URL"
                                onChange={handleChange}
                            />

                            <Form.Select
                                label="Project Category"
                                options={options}
                                onChange={handleChange}
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

// ** doens't work 
// export async function getServerSideProps(ctx) {
//     const { req, res } = ctx;
//     const session = getSession(req, res);
  
//     return {
//       props: { user: session?.user ?? null }
//     }
//   }

export default NewProject;
