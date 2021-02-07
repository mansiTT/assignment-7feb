export const payload = {
  withoutDate: {
    firstName: 'mansi',
  },
  invalidBirthDate: {
    birthDate: '20/10/2001',
    firstName: 'mansi',
  },
  withoutFirstNameLastName: {
    birthDate: '2001-01-01',
  },
  withoutlicenseNumber: {
    birthDate: '2001-01-01',
    firstName: 'mansi',
    lastName: 'mansi',
  },
  withoutExpiryDate: {
    birthDate: '2001-01-01',
    firstName: 'mansi',
    lastName: 'mansi',
    licenceNumber: '94977000',
  },
  withoutStateOfIssue: {
    birthDate: '2001-01-01',
    firstName: 'mansi',
    lastName: 'mansi',
    licenceNumber: '94977000',
    expiryDate: '2020-02-01',
  },
  invalidStateOfIssue: {
    birthDate: '2001-01-01',
    firstName: 'mansi',
    lastName: 'mansi',
    licenceNumber: '94977000',
    stateOfIssue: 'ABC',
    expiryDate: '2020-02-01',
  },
};
