import Link from 'next/link'
import dbConnect from '../lib/dbConnect'
import Project from '../models/Project'
import { Button, Card, Image } from 'semantic-ui-react'
import { useUser } from '@auth0/nextjs-auth0';

const Index = ({ projects }) => {
  const { user } = useUser();
  console.log(user);

  return (

    <>
      {/* Create a card for each pet */}
      {projects.map((project) => (
        // <div key={crochet._id}>
        //   <div className="card">
        //     <img src={crochet.image_url} />
        //     <h5 className="crochet-name">{crochet.patternName}</h5>

        //       </div>
        <Card key={project._id}>
          <Card.Content>
            <Image
              floated='left'
              size='small'
              src={project.image_URL}
              alt='steve'
            />
            <Card.Header>{project.patternName}</Card.Header>
            <Card.Meta>Friends of Elliot</Card.Meta>
            <Card.Description>
              Steve wants to add you to the group <strong>best friends</strong>
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <div className='ui two buttons'>
              <Button basic color='green'>
                Approve
              </Button>
              <Button basic color='red'>
                Decline
              </Button>
            </div>
          </Card.Content>
        </Card>
      ))}
    </>
  )
}

/* Retrieves pet(s) data from mongodb database */
export async function getServerSideProps() {
  await dbConnect()

  /* find all the data in our database */
  const result = await Project.find({})
  const projects = result.map((doc) => {
    const project = doc.toObject()
    project._id = project._id.toString()
    return project
  })

  return { props: { projects: projects }}
}

export default Index
