/**
 * Singleton Pattern
 * 
 * A pattern to use a module that will retain one instances of the object to be used across the application.
 * 
 * Usually, a state-based library like Vuex / Redux can be considered as a singleton since it stores a single state as a source of truth for the application.
 * 
 * For example, let's create a User factory, then create an instance of the UserData, and use it as a singleton for the application
 */

interface UserState {
  email: string
}

function UserFactory () {
  const state: UserState = {
    email: ''
  }

  return {
    getEmail () {
      return state.email
    },
    setEmail (email: UserState['email']) {
      state.email = email
    },
    isLogin () {
      return Boolean(state.email)
    }
  }
}

/**
 * userData will become the singleton that will be used widely in the application
 */
const userData = UserFactory()

console.log('The user should not be logged-in yet', userData.isLogin())

userData.setEmail('chenxeed@gmail.com')

console.log('The user should be logged-in now', userData.isLogin())
console.log('Should able to retrieve the email', userData.getEmail())