import { UserEvents } from './userEvents.mjs'

const userEvent = new UserEvents()

function saveToDatabase() {
  console.log('Saving post to database')
}

function sendNotifications() {
  console.log('Sending Notifications')
}

function updateTimeline() {
  console.log('Updating timeline')
}
userEvent.addListener('postCreated', saveToDatabase)
userEvent.addListener('postCreated', sendNotifications)
userEvent.addListener('postCreated', updateTimeline)

userEvent.createPost('This is my first post')
