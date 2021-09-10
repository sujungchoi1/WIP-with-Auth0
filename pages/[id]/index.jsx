import dbConnect from '../../lib/dbConnect';
import { useState, useEffect } from 'react';
import { Button, Form, Loader, Confirm } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import formStyles from '../../styles/Form.module.css'
import Project from '../../models/Project';

const ProjectPage = ({ project }) => {
    const router = useRouter();
    const [confirm, setConfirm] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        if (isDeleting) {
            deleteProject();
        }
    }, [isDeleting])

    const open = () => setConfirm(true);

    const close = () => setConfirm(false);

    const deleteProject = async () => {
        const projectId = router.query.id;

        try {
            await fetch(`/api/projects/${projectId}`, {
                method: 'Delete'
            })
            router.push("/");
        } catch (error) {
            console.log(error)
        }
    }

    const handleDelete = async () => {
        setIsDeleting(true);
        close();
    }

    return (
        <div className={formStyles.container}>
             {isDeleting
                ? <Loader active />
                :
                <>
                    <h1>{project.patternName}</h1>
                    <p>{project.projectCategory}</p>
                    <Button color='red' onClick={open}>Delete</Button>
                </>
            }
            <Confirm
                open={confirm}
                onCancel={close}
                onConfirm={handleDelete}
            />
        </div>
    )
}

export async function getServerSideProps({ params }) {
    await dbConnect();

    const project = await Project.findById(params.id).lean()
    project._id = project._id.toString()
  
    return { props: { project }}
}

export default ProjectPage;
