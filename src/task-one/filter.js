const express = require('express')

const axios = require('axios')

const router = express.Router()

// test
router.get('/test', async (req, res) => {
  try {
    res.status(200).send(JSON.stringify({ message: 'test' }))
  } catch (err) {
    console.log(err)
  }
})

router.get('/one', async (req, res) => {
  // const currentDate = new Date().toLocaleDateString('en-GB', {
  //   day: 'numeric',
  //   month: 'short',
  //   year: 'numeric',
  // })

  const url =
    'https://bitbucket.org/!api/2.0/snippets/tawkto/aA8zqE/4f62624a75da6d1b8dd7f70e53af8d36a1603910/files/webstats.json'

  const startDate = req.query.startDate

  const endDate = req.query.endDate

  try {
    const res2 = await axios.get(url)

    // load data
    const allData = res2.data

    // all output result
    let filterData = []

    let sumChats = 0
    let sumMissed = 0

    // filter range function
    const processStatitics = (startDate, endDate) => {
      allData.forEach((data) => {
        let date = new Date(data.date).getUTCDate()

        if (date >= startDate && date <= endDate) {
          filterData.push(data)
          sumChats += data.chats
          sumMissed += data.missedChats
        }
      })
    }

    processStatitics(startDate, endDate)
    console.log(sumChats, sumMissed)

    res.status(200).send(JSON.stringify(filterData))
  } catch (err) {
    console.log(err)
  }
})

module.exports = router
