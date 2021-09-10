import dbConnect from '../../../lib/dbConnect'
import Project from '../../../models/Project'

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  const { method } = req
  // const user = getSession(req, res).user
  
  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const projects = await Project.find({}) /* find all the data in our database */
        res.status(200).json({ success: true, data: projects })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'POST':
      try {
        const project = await Project.create(req.body) 
        res.status(201).json({ success: true, data: project })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
