module.exports = {
    map: function (user) {
        return {
            id: user.id,
            name: `${user.firstName} ${user.lastName}`,
            age: user.age,
            email: user.email,
            address: user.homeAddress.addressLine,
            city: user.homeAddress.city,
            zip: user.homeAddress.zip
        }
    }
}