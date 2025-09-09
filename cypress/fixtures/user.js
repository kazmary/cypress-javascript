import { faker } from '@faker-js/faker/locale/en'

export const accountData = {
  name: faker.person.fullName(),
  email: faker.internet.email('jane', 'lane', 'example.com'),
  password: 'password123',
  title: 'Ms',
  birth_date: '15',
  birth_month: '06',
  birth_year: '1990',
  firstname: 'Jane',
  lastname: 'Lane',
  company: 'Lane Corp',
  address1: '123 Main St',
  address2: 'Apt 4B',
  country: 'United States',
  zipcode: '90210',
  state: faker.location.state(),
  city: 'Beverly Hills',
  mobile_number: faker.phone.number('national'),
}
