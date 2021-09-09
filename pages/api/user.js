import { withApiAuthRequired ,getSession } from "@auth0/nextjs-auth0"

export default withApiAuthRequired(async (req, res) => {
    const user = getSession(req, res).user // the getSession function is used to get the session object that's created in the app. Which is where auth data is kepy
        res.json({user})
    })
