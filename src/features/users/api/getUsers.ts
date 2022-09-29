import { User } from '../types'


const user1: User = {id: 0, createdAt: 2, firstName:'Przemek', lastName: 'Wozniak', email: "wozprzemek@gmail.com", password: "123"}
const user2: User = {id: 1, createdAt: 3, firstName:'ABC', lastName: 'ABC', email: "abc@gmail.com", password: "abc"}

export const userList : User[] = [user1, user2]