router.get('/API_URL', async(req, res) => {
    try {
       const appss = await Apps.find()
        res.send(appss)
    } catch (error) {
        res.status(500).send(error.message)
    }
})
