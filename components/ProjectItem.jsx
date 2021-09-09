import { Button, Card, Image } from 'semantic-ui-react'

const ProjectItem = () => (
  <Card.Group>
    <Card>
      <Card.Content>
        <Image
          floated='left'
          size='small'
          src='https://www.thesprucepets.com/thmb/STWn6N_6Xn7A06r0yH4dUUlglko=/2121x1193/smart/filters:no_upscale()/GettyImages-833785930-cb727bf0b0d2491ab94d9b67e1a31da2.jpg'
          alt='steve'
        />
        <Card.Header>Steve Sanders</Card.Header>
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
    <Card>
      <Card.Content>
        <Image
          floated='left'
          size='small'
          src='https://www.thesprucepets.com/thmb/STWn6N_6Xn7A06r0yH4dUUlglko=/2121x1193/smart/filters:no_upscale()/GettyImages-833785930-cb727bf0b0d2491ab94d9b67e1a31da2.jpg'
          alt='steve'
        />
        <Card.Header>Molly Thomas</Card.Header>
        <Card.Meta>New User</Card.Meta>
        <Card.Description>
          Molly wants to add you to the group <strong>musicians</strong>
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
    <Card>
      <Card.Content>
        <Image
          floated='left'
          size='small'
          src='https://www.thesprucepets.com/thmb/STWn6N_6Xn7A06r0yH4dUUlglko=/2121x1193/smart/filters:no_upscale()/GettyImages-833785930-cb727bf0b0d2491ab94d9b67e1a31da2.jpg'
          alt='steve'
        />
        <Card.Header>Jenny Lawrence</Card.Header>
        <Card.Meta>New User</Card.Meta>
        <Card.Description>
          Jenny requested permission to view your contact details
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
  </Card.Group>
)

export default ProjectItem